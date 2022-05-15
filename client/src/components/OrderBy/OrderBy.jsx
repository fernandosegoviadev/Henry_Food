import './OrderBy.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { ASCENDENTE, DESCENDENTE, ALPHABET_AZ, ALPHABET_ZA } from '../../constantes/sort';
import { sortByName, sortByScore, getDiets, filterByDiet } from '../../redux/actions'



export default function OrderBy () {

    const dispatch = useDispatch()
   
    const diets = useSelector((state) => state.diets)

    useEffect(()=>{ // Cuando se cargue la página
     
        dispatch(getDiets())

    }, [])

    
    function onSelectChange(e) {  // Para dispachar la acción
        
        if(e.target.value !== 'SortByDiet') {

            dispatch(filterByDiet(e.target.value)) // pasamos la dieta 
        }
          
        
    }
    
    function onSelectChangeOne(e) {             
 
        dispatch(sortByName(e.target.value))
        
    }

    function onSelectChangeTwo(e) {
     
        dispatch(sortByScore(e.target.value))   
        
    }
    


    return (
        <div>
            <select className='select' name="select" onChange={onSelectChange}>
            <option value="SortByDiet" >Sort by diet …</option>
                <option value="Todas">All</option>
                {diets ? diets.map(d =>{
                   return (
                       <option key= {d.id} value= {d.name}>{d.name.charAt(0).toUpperCase() + d.name.slice(1)}</option>
                ) 
                }): <option>No diet</option> } 
            
            </select>
            
            <select className='select' name="select" onChange={onSelectChangeOne}>
            <option >Alphabetical order …</option>
            <option value={ALPHABET_AZ}>Asc. A-Z</option>
            <option value={ALPHABET_ZA}>Des. Z-A</option>
            </select>
            
            <select className='select' name="select" onChange={onSelectChangeTwo}>
            <option >Spoonacular Score …</option>
            <option value={ASCENDENTE}>Asc. 1-100</option>
            <option value={DESCENDENTE}>Des. 100-1</option>
            </select>
        </div>
    )


}
