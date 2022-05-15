import React from "react";
import { Link } from 'react-router-dom';
import './CardRecipe.css'


export default function CardRecipe(props) {
    // console.log(props.favorite)
    

    
    return (
        <div className="card">
            <div className="body">

                <Link to = {`/recipes/${props.id}`} className="links-cards">
                    <h3 className="name">{props.name}</h3>
                </Link>
  
                    <h3 className="score">Score: {props.score}</h3>
                 
                               
                <br />                   

                    <h4 className="types">Tipes of diets</h4>
                        <ul className="list-items">
                            {props.diets ? props.diets.map(d =>{
                                return (
                                    <li key={d} className="items">{d}</li>
                                ) }):
                                <div>No hay dieta</div>
                            }
                        </ul>
                        
                    <img className="image" src={props.image} alt="Imagen de receta" />

            </div>
        </div>
    )
}
