import axios from 'axios';
import {key, proxy} from '../config';

export default class Recipe {
    constructor(id){
        this.id = id;
    }

    async getRecipe(){
        try {
            const result = await axios(`${proxy_url}https://food2fork.com/api/get?key=${key}&rid=${this.id}`);
            this.title = result.data.recipe.title;
            this.author = result.data.recipe.publisher;
            this.image = result.data.recipe.image_url;
            this.url = result.data.recipe.source_url;
            this.ingredients = result.data.recipe.ingredients;
        } catch (error) {
            console.log(error);
            alert('Something went wrong.');
        }
    }

    calcTime() {
        // Assuming we need 15 minutes for every 3 ingredients.
        const numberOfIngredients = this.ingredients.length;
        const periods = Math.ceil(numberOfIngredients / 3);
        this.time = periods * 15;
    }

    calcServings() {
        this.servings = 4;
    }

    parseIngredients() {
        const unitsLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds'];
        const unitsShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound'];
        const units = [... unitsShort, 'kg', 'g'];


        const newIngredients = this.ingredients.map(el => {
            // Uniform units
            let ingredient = el.toLowerCase();
            unitsLong.forEach((unit, i) => {
                ingredient = ingredient.replace(unit, unitShort[i]);
            });

            // Remove parentheses
            ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');

            // Parse the ingredients into count, unity & ingredient itself.
            const ingredientArray = ingredient.split(' ');
            const unitIndex = ingredientArray.findIndex(element => units.includes(element));

            let ingredientObject;

            if (unitIndex > -1) {
                // there is a unit!
                const arrayCount = ingredientArray.slice(0, unitIndex); // Example: 4 1/2 cups, arrayCount = [4, 1/2]
                let count;
                if (arrayCount.length === 1){
                    count = eval(ingredientArray[0].replace('-', '+'));
                } else {
                    count = eval(ingredientArray.slice(0, unitIndex).join('+'));
                }
                ingredientObject = {
                    count,
                    unit: ingredientArray[unitIndex],
                    ingredient: ingredientArray.slice(unitIndex + 1).join(' ')
                }


            } else if (parseInt(ingredientArray[0], 10)){
                // there is NO unit, but 1st element is a number
                ingredientObject = {
                    count: parseInt(ingredientArry[0], 10),
                    unit: '',
                    ingredient: ingredientArray.slice(1).join(' ')
                }

            } else if (unitIndex === -1) {
                // there is no unit and no number in first position
                ingredientObject = {
                    count: 1,
                    unit: '',
                    ingredient,
                };
            } 

            return ingredientObject;
        });

        this.ingredients = newIngredients;
    }

    // type = 'inc' or 'dec'
    upateServings (type) {
        // update servings
        const newServings = (type === 'dec') ? this.servings - 1 : this.servings + 1;
        
        // update ingredients
        this.ingredients.forEach(ingredient => {
            ingredient.count *= (newServings / this.servings);
        });
        
        this.servings = newServings;
    }

}