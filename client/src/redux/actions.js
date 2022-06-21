import axios from 'axios';
export const GET_RECIPES = 'GET_RECIPES';
export const SEARCH_RECIPES = 'SEARCH_RECIPES';

export const GET_RECIPE_DETAIL = 'GET_RECIPE_DETAIL';
export const CLEAR_DETAIL = 'CLEAR_DETAIL';

export const SORT_BY_NAME = 'SORT_BY_NAME';
export const SORT_BY_SCORE = 'SORT_BY_SCORE';
export const FILTER_BY_DIET = 'FILTER_BY_DIET';

export const GET_DIETS = 'GET_DIETS';
export const FILTER_BY_NAME = 'FILTER_BY_NAME';

export const FILTER_BD = 'FILTER_BD';




//-----------------------------------------------------------------------------
//  Mis action creators
//------------------------------------------------------------------------------

export function getRecipes() {
    return function(dispach) {
        return axios.get('/api/recipes')

        // .then(res => res.json())  

        .then(recipes => dispach({type: GET_RECIPES, payload: recipes.data}))

        .catch(error => console.log(error));
    }
}



export function getSearchRecipes(name) {
    return function(dispach) {
        return axios.get(`/api/recipes?name=${name} `)

        //.then(res => res.json())       
        
        .then(recipes => dispach({type: SEARCH_RECIPES, payload: recipes.data}))

        .catch(error => console.log(error));
    }
}



export function searchLocalRecipe(name) {

    return {
        type: FILTER_BY_NAME, payload: name
    }

}

export function clearDetail() {
    let clear = {}
    
    return {
        type: CLEAR_DETAIL, payload: clear
    }
}

export function getDetail({id}) {    
    
    return function(dispach) {
        return axios.get(`/api/recipes/${id} `)

        //.then(res => res.json())

        .then( recipe => {
                return dispach({type: GET_RECIPE_DETAIL, payload: recipe.data})
            })

        .catch((error) => console.log(error)); 
        // Si hubo un problema con la petición Fetch                 
    }

}

export function filterBd () {
    return {
        type: FILTER_BD
    }
}

export function filterByDiet (name) {
    return {
        type: FILTER_BY_DIET, payload: name
    }
}


export function sortByName(order) {
    return {
        type: SORT_BY_NAME, payload: order
    }
}

export function sortByScore(order) {
    return {
        type: SORT_BY_SCORE, payload: order
    }
}


export function getDiets () {
    return function(dispach) {
        return axios.get('/api/types')

        //.then(res => res.json()) 

        .then(diets => dispach({type: GET_DIETS, payload: diets.data}))
        
        .catch(error => console.log(error));
    }

}




