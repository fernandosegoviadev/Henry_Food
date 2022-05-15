import './Recipes.css'
import React from 'react';
import CardRecipe from './../CardRecipe/CardRecipe';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRecipes } from '../../redux/actions';
import Pagination from './../Pagination/Pagination';
import Footer from '../Footer/Footer';


export default function Recipes() {

    const dispatch = useDispatch();

    const allRecipes = useSelector((state) => state.filteredRecipes);
    const searchRecipes = useSelector((state) => state.searchRecipes);
    const recipes = useSelector((state) => state.recipes);

    const [ currentPage, setCurrentPage ] = useState(1);
    const [ recipesPerPage, setRecipesPerPage ] = useState(6);
    const indexOfLastRecipe = currentPage * recipesPerPage;
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
    const currentRecipe = allRecipes.slice(indexOfFirstRecipe,indexOfLastRecipe);
  

    const paginado = (pageNumber) => {
        let page = currentPage;
        if (pageNumber === 'start') {
            setCurrentPage(1)
        }
        else if (pageNumber === 'end') {
            setCurrentPage(Math.ceil( allRecipes.length /recipesPerPage))
        }
        else if (pageNumber === 'next' && currentPage < Math.ceil( allRecipes.length /recipesPerPage)) {
            page = currentPage + 1 ;
            setCurrentPage(page)
        }
        else if (pageNumber === 'prev'  && currentPage > 1) {
            page = currentPage - 1 ;
            setCurrentPage(page)
        }
        else if (typeof pageNumber === 'number') {
            setCurrentPage(pageNumber)
        }       
    }
    
    useEffect(() => {   

        setCurrentPage(1)

    },[allRecipes.length]) // Escucho el cambio de la cantidad de elementos del
    // que siempre renderizo, y cuando esto cambia se ejecuta el useEffect
    

    useEffect(() => {

        dispatch(getRecipes());

    },[dispatch])

   

    if (recipes.message) { // Si se terminan los llamados
        return (
            <div className='main-box'>
                 <div>
                <Pagination
                recipesPerPage = {recipesPerPage}
                allRecipes = {allRecipes.length}
                page = {currentPage}
                paginado = {paginado}

                />
                </div>
                
                <div>
                   <h1>{recipes.message}</h1>            
                   
                </div>
                <Footer/>
            </div>
        )
    }



    return (
        <div className='main-box'>
            <div>
                <Pagination
                recipesPerPage = {recipesPerPage}
                allRecipes = {allRecipes.length}
                paginado = {paginado}
                page = {currentPage}
                />
            </div>

            <h2>{searchRecipes.length === 0 && allRecipes.length === 0 
            && recipes.length > 0 && "Recipe not found"}</h2>

            <h2>{searchRecipes.length > 0 && allRecipes.length === 0 
            && recipes.length > 0 && "Recipe not found"}</h2>
        
            <div id = 'cards'>
                {currentRecipe.length ? currentRecipe.map(r =>{
                    return (
                        <CardRecipe
                            key= {r.id}
                            id = {r.id}
                            name = {r.name}
                            score = {r.score}
                            image ={r.image}
                            diets = {r.Diets}
                            favorite = {r.favorite}
                        />                    
                    )
                }): 
                recipes.length === 0 &&
                <img id='loading' src="https://www.sanfranciscohm.com/static/img/loading.gif" alt="loading..." /> }
            
            </div>
            <Footer/>
        </div>
    )   
    
}
