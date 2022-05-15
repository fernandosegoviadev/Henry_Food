
import React from "react";
import Footer from "../Footer/Footer";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import axios from 'axios';



export function Put () {

    const dispatch = useDispatch()

    const [ recipes, setRecipes ] = useState([]);   

    const [ recipeUpdate, setRecipeUpdate ] = useState({ recipeId: ""})
    
    const [ recipeDetail, setRecipeDetail ] = useState([]);

    const [ diets, setDiets ] = useState([]); 

    const [ diet, setDiet ] = useState({ dietId: ""})
    
    
    useEffect(()=>{ 
        
      if (recipes.length === 0) {
          
          dispatch(()=>getListRecipe())
      } 
      if (diets.length === 0) {
          
        dispatch(()=>getListDiet())
      }       
        
    }, [])
    
    
    function getListRecipe() { 
        return axios.get('http://localhost:3001/api/delete') 
        
        .then((recipes) =>  {
            return setRecipes(recipes.data)
        })
        .catch((error) => console.log(error))         
    }
  
    function getListDiet() { 
        return axios.get('http://localhost:3001/api/types') 
        
        .then((diets) =>  {
            return setDiets(diets.data)
        })
        .catch((error) => console.log(error))         
    }
     

    function selectRecipe (e) { // Me manda el id
        e.preventDefault()

        setRecipeUpdate({ recipeId: e.target.value })

        if (recipes.length > 0 && e.target.value !== "") {
 
            let diets = [...recipes];
 
            diets = diets.filter( d => d.id === e.target.value )

            setRecipeDetail(diets[0].Diets)            

        }
    }
    
    function selectDiet (e) {
        e.preventDefault()
        setDiet({ dietId: e.target.value })
    }

        
    function updateRecipe (e) {

        let value = e.target.value;

        e.preventDefault()
  
        if ( recipeUpdate.recipeId !== "" && diet.dietId !== "" && value === 'add' || value === 'remove') { 
            
            if (window.confirm("Do you really want update this recipe in your DB?")) {
                dispatch(()=> updateR (recipeUpdate, diet, value) ) 
                       
            } 
                  
        }
    }
    
    function updateR (recipeUpdate, diet, value) {
        // {recipeId: "uuid"}, { dietId: "n"}       
                
        axios({
            method: 'put',
            url: 'http://localhost:3001/api/update',
            data: { recipeId: recipeUpdate.recipeId, dietId: diet.dietId, value: value}
            // {recipeId: "uuid", dietId: "n"}   
        })        
        .then(()=>{ 
            if (value === 'add') {
                window.alert('Receta actualizada con éxito')
            } 
            if (value === 'remove') {
                window.alert('Receta removida con éxito')
            }
         
            })

        .catch((error)=> window.alert(error.response.data.message))          
        

    }


    return (
        <div className="main-box">
            <div className="box">

                <h2>Update your recipe</h2>

                <br />

                <h3>Select your recipe</h3>


                <select name="select-recipes" id="select-recipe" onChange = {(e)=> selectRecipe(e)}>
                    <option value="">Your recipe...</option>

                    {typeof recipes !== 'string' ? recipes.map(r =>{
                       return (
                           <option key= {r.id} value= {r.id}>{r.name}</option>
                    ) 
                    }): <option value="" >No hay receta</option> }

                </select>

                <h4 className="types">{ recipeDetail.length > 0 &&'Tipes of diets'}</h4>
                        <ul className="list-items">
                            {recipeDetail.length > 0 ? recipeDetail.map(d =>{
                                return (
                                    <li key={d.id} className="items">{d.name}</li>
                                ) }):
                                <div>{ recipeDetail.length > 0 && 'No hay dieta'}</div>
                            }
                        </ul>
                
                <br/>
                <br/>


                <h3>Select your diet</h3>

                <select name="select-recipes" id="select-recipe" onChange = {(e)=> selectDiet(e)}>
                    <option value="">Your diet...</option>

                    {typeof diets !== 'string' ? diets.map(d =>{
                       return (
                           <option key= {d.id} value= {d.id}>{d.name}</option>
                    ) 
                    }): <option value="" >No hay dieta</option> }

                </select>



                <button value='add' onClick={(e) => updateRecipe(e)}>Add</button>
                <button value='remove' onClick={(e) => updateRecipe(e)}>Remove</button>

                <button id="refresh" onClick={()=>window.location.reload()}>Refresh</button>                
                <h3>{typeof recipes === 'string' ? recipes : null }</h3>
                <h3>{typeof diets === 'string' ? diets : null }</h3>
            </div>
            <Footer/>
        </div>

        
    )

}