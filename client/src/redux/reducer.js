import { ASCENDENTE, ALPHABET_AZ } from "../constantes/sort";
import { GET_RECIPE_DETAIL, CLEAR_DETAIL, GET_RECIPES, SEARCH_RECIPES, FILTER_BD, 
         SORT_BY_NAME, SORT_BY_SCORE, GET_DIETS, FILTER_BY_DIET, FILTER_BY_NAME } from "./actions";

//-------------------------------------------------------------------------------
// Mi reducer (es una función)
//-------------------------------------------------------------------------------

const initialState = {
    recipes: [], // cuando es un get general y llegan las 100 recetas
    
    searchRecipes: [], // Cuando hago un get con búsqueda

    filteredRecipes: [], // lo que renderizo

    diets: [], // Se carga con lo la de DB que consulta a la API

    searchLocalRecipe: [], // cuando busco entre esas 100 recetas de la api y las de la bd
    // en la barra de búsqueda y se desplega una lista con id, name y link a detalle

    filterDb: [], // si tengo que filtar por db

    // addFavorites: [], // las recetas que agrego a favoritas

    recipeDetail: {} // el detalle de una receta que quiro ver
}


export default function reducer(state = initialState, action) { 
   
    switch(action.type) {
        case GET_RECIPES:            
            if (action.payload.message) { // Si me quedo sin llamados a la api
                return {
                    ...state,  

                    recipes: action.payload,
                    
                    filteredRecipes: []
                }
            }

            return {
                ...state, 
                
                recipes: action.payload,
                
                filteredRecipes: action.payload
            }

        case SEARCH_RECIPES: // Búsqueda avanzada!
            
            return {
                ...state,
                
                searchRecipes: action.payload,
                
                filteredRecipes: action.payload 
                
            }

        case FILTER_BY_NAME : // Cuando filtro por name

            let filterByName;

            if (action.payload === "") {
                filterByName = []
            }
            if (action.payload !== "") {
                filterByName = state.filteredRecipes.length ? [...state.filteredRecipes] : [...state.recipes];
                filterByName = filterByName.filter(n => n.name.toLowerCase().includes(action.payload.toLowerCase())) 
                
                if (filterByName.length > 11) {
                    filterByName = filterByName.slice(0, 11)
                }
                
            }
         
            return {
                ...state,
                searchLocalRecipe: filterByName 
            }
        
        case CLEAR_DETAIL :
           
            return {
                ...state,
                recipeDetail: action.payload
            }

        case GET_RECIPE_DETAIL:
           
            return {
                ...state,
                recipeDetail: action.payload

            }

        case GET_DIETS : // cuando cargo mis dietas al estado global
            return {
                ...state,
                diets: action.payload 
            }

        case FILTER_BY_DIET : // Filtro por dietas
            if (action.payload === "Todas") {
                return {
                    ...state,
                    filterDb: [], // Limpio el filtro
                    filteredRecipes: state.searchRecipes.length ? state.searchRecipes : state.recipes
                }
            }
            
            if (state.filterDb.length > 0) {
                let filterDataBase = [...state.filterDb]
          
                filterDataBase = filterDataBase.filter ( d => {
                return ( 
                    d.Diets.includes(action.payload)
                )})
            
                return {
                ...state,
                filteredRecipes: filterDataBase
                }
            }

            let orderedRecipeDiet = state.searchRecipes.length ? [...state.searchRecipes] : [...state.recipes];
          
            orderedRecipeDiet = orderedRecipeDiet.filter ( d => {
                return ( 
                    d.Diets.includes(action.payload)
                )})
            
            return {
                ...state,
                filteredRecipes: orderedRecipeDiet
            }

        case SORT_BY_NAME :  
                  
            let orderedRecipesName = state.filteredRecipes.length ? [...state.filteredRecipes] : [...state.recipes];
            orderedRecipesName = orderedRecipesName.sort((a,b) => {
                if (a.name < b.name ) {
                    return action.payload === ALPHABET_AZ ? -1 : 1
                }
                if (a.name > b.name ) {
                    return action.payload === ALPHABET_AZ ? 1 : -1
                }
                return 0;
            })
                       
            return {
                ...state,
                filteredRecipes: orderedRecipesName

            }

        case SORT_BY_SCORE :
            let orderedRecipesScore = state.filteredRecipes.length ? [...state.filteredRecipes] : [...state.recipes];
            
            orderedRecipesScore = orderedRecipesScore.sort((a,b) => {
                if (a.score < b.score ) {
                    return action.payload === ASCENDENTE ? -1 : 1
                }
                if (a.score > b.score ) {
                    return action.payload === ASCENDENTE ? 1 : -1
                }
                return 0;
            })                       
            return {
                ...state,
                filteredRecipes: orderedRecipesScore

            }
            
        case FILTER_BD :
            let filterBd = state.filteredRecipes.length ? [...state.filteredRecipes] : [...state.recipes];
            
            filterBd = filterBd.filter(d => d.id.length > 8)
            
            return {
                ...state,
                filterDb: filterBd,
                filteredRecipes: filterBd
            }            

                    

        default: {
            return state;
        }

    }

}