import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import Likes from './models/Likes';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';
import { elements, renderLoader, clearLoader } from './views/base';
import Likes from './models/Likes';

/*  Global state of the app
    - Search object
    - current recipe object
    - shopping list object
    - liked recipes
*/
const state = {

};
/**
 * Search controller
 */
const controlSearch = async () => {
    // get query from view

    if (query) {
        // new search object & add it to state.
        state.search = new Search(query);

        // prepare UI for results
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchResults);
        try {

            // search for recipes
            await state.search.getResults();

            // render results on UI
            clearLoader();
            searchView.renderResults(state.search.result);
        } catch (error) {
            alert('Something went wrong with the search.');
            clearLoader();
        }

    }
};

elements.searchForm.addEventListener('submit', e =>{
    e.preventDefault();
    controlSearch();
});


elements.searchResultPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');
    if (btn) {
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.clearResults();
        searchView.renderResults(state.search.result, goToPage);
    }
});

/**
 * Recipe controller
 */
const controlRecipe = async () => {
    // get id from URL
    const id = window.location.hash.replace('#', '');

    if (id) {
        // prepare UI for changes
        recipeView.clearRecipe();
        renderLoader(elements.recipe);

        // highlight selected search item
        if (state.search) {
            searchView.highlightSelected(id);
        }
        
        // create new recipe object
        state.recipe = new Recipe(id);

        try {
            // get recipe data & parse ingredients
            await state.recipe.getRecipe();
            state.recipe.parseIngredients();

            // calculate servings & cooking time
            state.recipe.calcTime();
            state.recipe.calcServings();
            
            // render the recipe
            clearLoader();
            recipeView.renderRecipe(state.recipe);

        } catch (error) {
            alert('Error processing recipe!');
        }
        

    }

};

/**
 * LIST CONTROLLER
 */
const controlList = () => {
    // create a new list if there isn't one yet
    if (!state.list){
        state.list = new List();
    }

    // add each ingredient to the list and UI
    state.recipe.ingredients.forEach(element => {
        const item = state.list.addItem(element.count, element.unit, element.ingredient);
        listView.renderItem(item);
    });
}

// Handle delete and update list item events
elements.shopping.addEventListener('click', event => {
    const id = event.target.closest('.shopping__item').dataset.itemid;

    // handle delete button
    if (event.target.matches('.shopping__delete, .shopping__delete *')) {
        // delete from state
        state.list.deleteItem(id);
        // delete from UI
        listView.deleteItem(id);
    } else if (event.target.matches('.shopping__count-value')) {
        // read data from interface, update in state
        const value = parseFloat(event.target.value);
        state.list.updateCount(id, value);
    }
});

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));

/**
 * Likes Controller
 */
const controlLikes = () => {
    if (!state.likes) state.likes = new Likes();
    const currentId = state.recipe.id;
    
    // user has not yet liked current recipe
    if (!state.likes.isLiked(currentId)){
        // add like to state
        const newLike = state.likes.addLike(
            currentId, state.recipe.title, state.recipe.author, state.recipe.image
        );
        // toggle the like button
        
        // add like to the UI list

    // user has liked current recipe
    } else {
        // remove like from state
        state.likes.deleteLike(currentId);
        // toggle like button

        // remove like from UI list
    }

};



// handling recipe button clicks
elements.recipe.addEventListener('click', event => {
    if (event.target.matches('.btn-decrease, .btn-decrease *')){
        // decrease button is clicked
        if(state.recipe.servings > 1){
            state.recipe.updateServings('dec');
            recipeView.updateServingsIngredients(state.recipe);
        }
    } else if (event.target.matches('.btn-increase, .btn-increase *')){
        // increase button is clicked
        state.recipe.updateServings('inc');
        recipeView.updateServingsIngredients(state.recipe);
    } else if (event.target.matches('.recipe__btn--add, .recipe__btn--add *')) {
        // add ingredients to shopping list
        controlList();
    } else if (event.target.matches('.recipe__love, .recipe__love *')) {
        // like controller
        controlLikes();
    }
});

