import uniqueid from 'uniqid';

export default class List {
    constructor(){
        this.items = [];
    }

    addItem(count, unit, ingredient) {
        const item = {
            id = uniqueid(),
            count,
            unit,
            ingredient
        }
        this.items.push(item);
        return item;
    }

    deleteItem(itemId) {
        const index = this.items.findIndex(el => el.id === itemId);
        this.items.splice(index, 1); // start at index, remove 1 item.
    }

    updateCount(id, newCount) {
        this.items.find(el => el.id ===id).count = newCount;   
    }

}