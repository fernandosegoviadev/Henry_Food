import './Delete.css';
import React from "react";
import Footer from "../Footer/Footer";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import axios from 'axios';



export function Delete () {

    const dispatch = useDispatch()

    const [ recipes, setRecipes ] = useState([]); // Para la lista de recetas de la db

    const [ recipeDelete, setRecipeDelete ] = useState({ id: ""}); // Para el id

    const [ image, setImage ] = useState("");
       
   
    useEffect(()=>{  // Me cargo las recetas
        
      if (recipes.length === 0) {
          
          dispatch(()=>getListRecipe())
      }        
        
    }, [])
    
    
    function getListRecipe() { 
        return axios.get('/api/delete')  

        .then((recipes) =>  {
            return setRecipes(recipes.data)
        })
        .catch((error) => console.log(error))   
    }
    


    function selectRecipe (e) { // Recibo el id de la receta a borrar
        e.preventDefault()
        
        let img = [...recipes].filter(i => i.id === e.target.value)
        
        setImage(img[0].image)
        
        setRecipeDelete({id: e.target.value })
    }

    

    function deleteRecipe (e) {
        e.preventDefault()
        if ( recipeDelete.id !== "" ) { 
            
            if (window.confirm("Do you really want delete this recipe in your DB?")) {
                dispatch(()=> deleteR (recipeDelete) ) // {id: "uuid"}                
            } 
                    
        }
    }
    
    function deleteR (id) {
        axios({
            method: 'delete',
            url: '/api/delete',
            data: id
          })
        .then((response)=>{
            window.alert(response.data.message)
            window.location.reload()

        })
        .catch((error)=> console.log(error))
    }

    //----------------------------------------------------------------------------
    // Mi formulario para hacer enviar un delete
    //----------------------------------------------------------------------------

    return (
        <div className="main-box">
            <div className="box">
                <div className='delete-box'>
                    
                <br />
                <br />
                <h2>Delete your recipe</h2>
                <br />
                <select name="select-recipes" id="select-recipe" onChange = {(e)=> selectRecipe(e)}>
                    <option value="">Seleccione la receta...</option>

                    {typeof recipes !== 'string' ? recipes.map(r =>{
                       return (
                           <option key= {r.id} value= {r.id}>{r.name}</option>
                    ) 
                    }): <option value="" >No hay receta</option> }

                </select>


                <button onClick={(e) => deleteRecipe(e)}>Delete</button>
                <button id="refresh" onClick={()=>window.location.reload()}>Refresh</button>                  
                
                <br />
                <br />     
                <br />
                    {image ? <img id='img-delete' src={image} alt="Image not found"/> : null }
                
                    <h3>{typeof recipes === 'string' ? recipes : null }</h3>
                <br />
                    <ul className="list-items">
                        {typeof recipes !== 'string' ? recipes.map(r =>{
                            return (
                                <li key={r.id} className="ite">{r.name}</li>
                            ) }):
                            <div>{null}</div>
                        }
                    </ul>
                </div>
            </div>
            <Footer/>
        </div>

        
    )

}