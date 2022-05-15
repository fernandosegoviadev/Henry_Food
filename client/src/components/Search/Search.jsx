import './Search.css';
import OrderBy from './../OrderBy/OrderBy';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSearchRecipes, searchLocalRecipe, filterBd } from '../../redux/actions';
import { Link } from 'react-router-dom';


export default function Sarch () {
    const [search, setSearch] = useState('');
    const [focus, setFocus] = useState(false);

    let usedispatch = useDispatch();
    const searchLocal = useSelector((state) => state.searchLocalRecipe);

    function onSubmitSearchPlus (e) {
        e.preventDefault();

        let regex = /([a-zA\s])\w+/g

        if ( search.length > 1 && search.length < 18 && regex.test(search)) {

            usedispatch(getSearchRecipes(search));
 
            setSearch(''); //Limpio el estado
        }

    }

    
    function onInputChange (e) {

        setSearch(e.target.value)
                
        usedispatch(searchLocalRecipe(search));

    }

    
    function focusSearch() {
        setTimeout(function(){
           
            if (focus === false) {
                setFocus(true)                
            }
            if (focus === true) {
                setFocus(false)
            }
           
        }, 500);
        
    }

    function onSubmitFilterBd(e) {
        e.preventDefault();
        usedispatch(filterBd());
    }
        
    
    return (
        <div>
            <div id = "div-search">            
                <form onSubmit={onSubmitSearchPlus} onFocus={()=>focusSearch()} onBlur={()=>focusSearch()} className = "search">
                    <input id='input-search' type="text" onChange={(e) => onInputChange(e)} value= {search} autoComplete='off'/>
                    <input id='btn-search' type="submit" value= "Search +" onClick={onSubmitSearchPlus}/>
                    <input id='btn-search' type="submit" value= "My recipes"  onClick={(e)=>onSubmitFilterBd(e)}/>
                </form>
    
                <div className = "search">
                    <OrderBy/>
                </div>
                   
            </div>

            <div id = "div-list" >
                <ul id = 'list-search'>
                { focus && searchLocal ? searchLocal.map ((r) => {
                    return (
                        <Link to = {`/recipes/${r.id}`} key={r.id} className="links">
                            <li className="items-list-seach">{r.name}</li>
                        </Link>    
                    )
                }) : <div id='id'></div>}
                </ul>
            </div>
        </div>
    )

}

