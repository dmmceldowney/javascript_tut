import axios from 'axios';

export default class Search {
    constructor(query){
        this.query = query;
    }

    async getResults() {
        const proxy_url = 'https://cors-anywhere.herokuapp.com/';
        const key = '12007c3366ec3a965414a0019ed1f209';
        try {
            const result = await axios(`${proxy_url}https://food2fork.com/api/search?key=${key}&q=${this.query}`);
            this.result = result.data.recipes;
            // console.log(this.results);
        } catch(error) {
            alert(error);
        }
    }

}