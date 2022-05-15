import React from "react";
import "./Pagination.css";


export default function Paginado ({ recipesPerPage, allRecipes, paginado, page}) {

    let pageNumber =[]
    
    for (let i = 0 ; i <= Math.ceil(allRecipes/recipesPerPage) - 1 ; i++) {
        pageNumber.push(i + 1);
    }
    

    // if (page === 1 )  {
    //     pageNumber = pageNumber.slice(page - 1 , page + 2 ) // 1 - 3
    // }
    
    // if (page > 1 && page < Math.ceil(allRecipes/recipesPerPage)) {
    //     pageNumber = pageNumber.slice(page - 2 , page + 1 )
    // }
    
    // if (page === Math.ceil(allRecipes/recipesPerPage ))  { 
    //     pageNumber = pageNumber.slice(page - 3 , page ) // ultima-3  ultima
    // }

    if (page === 1 )  {
        pageNumber = pageNumber.slice(page - 1 , page + 4 ) // 0 - 5
    }
    if (page === 2 )  {
        pageNumber = pageNumber.slice(page - 2 , page + 3 ) // 0 - 5
    }

    if (page > 2 && page < Math.ceil(allRecipes/recipesPerPage) -2 ) { // 
        pageNumber = pageNumber.slice(page - 2 , page + 3 )
    }

    if (page === Math.ceil(allRecipes/recipesPerPage) -2 ) { // ultima-3 ultima-2
        pageNumber = pageNumber.slice(page - 3 , page + 2 )
    }

    if (page === Math.ceil(allRecipes/recipesPerPage ) - 1)  { 
        pageNumber = pageNumber.slice(page - 4 , page + 1) // ultima-4 ultima-1
    }
    if (page === Math.ceil(allRecipes/recipesPerPage ))  { 
        pageNumber = pageNumber.slice(page - 5 , page ) // ultima-5  ultima
    }   

   

    return (
        <nav className="nav-paginado">
            <button className='btn-paginado' onClick={()=> paginado('start')}>First</button>
            <button className='btn-paginado' onClick={()=> paginado('prev')}>Prev</button>
            <ul className="paginado">
                {pageNumber && pageNumber.map((p) => (
                    <button className="number" key={p} onClick={()=> paginado(p)}>{p}
                        
                    </button>
                ))}
            </ul>
            <button className='btn-paginado' onClick={()=> paginado('next')}>Next</button>
            <button className='btn-paginado' onClick={()=> paginado('end')}>Last</button>
        </nav>
    )

}