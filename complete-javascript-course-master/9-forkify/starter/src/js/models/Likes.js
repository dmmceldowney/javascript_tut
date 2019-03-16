export default class Likes {
    constructor(){
        this.likes = [];
    }

    addLike(id, title, author, image){
        const like = {
            id, title, author, img
        };
        this.likes.push(like);
        return like;
    }

    deleteItem(itemId) {
        const index = this.likes.findIndex(el => el.id === itemId);
        this.likes.splice(index, 1); // start at index, remove 1 item.
    }

    isLiked(itemId){
        return this.likes.findIndex(el => el.id === itemId) !== -1;
    }

    getNumberOfLikes(){
        return this.likes.length;
    }
}