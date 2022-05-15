import './RecipeDetail.css';
import { useEffect, useLayoutEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getDetail, clearDetail } from '../../redux/actions';
import Footer from '../Footer/Footer';
import Search from '../Search/Search';


function Detail ({ recipeDetail, getDetail, clearDetail }) { // esto viene de allá abajo
    
    const id = useParams() // Tengo mi id variable

    useEffect(()=>{

        clearDetail()
        
        getDetail(id)

    }, [id]) // Para que se renderize solo después del primer renderizado

    


    // Debería mostrar otra cosa en caso de que el id no haya sido encontrado

    if (recipeDetail.message) {
        return (
            <div className='main-box'>
                <div className='main-card'>
                    <h3>{recipeDetail.message}</h3>
                </div>
                <Footer/>
            </div>
        )
    }


  

    
    return (
        <div className='main-box'>
            <Search/>
            <div className='main-card'>
            {recipeDetail ? 
                <div key={recipeDetail.id}>             
                                        
                    <h1 className='title'>{recipeDetail.name}</h1>
                    <h2 className='score'>Score: {recipeDetail.score}</h2>
                    <h2 className='score'>HealthScore: {recipeDetail.healthScore}</h2>
                    
                    {recipeDetail.image ? <img src={recipeDetail.image} alt="Imagen de la receta" />
                    : <img id='loading' src="https://www.sanfranciscohm.com/static/img/loading.gif" alt="loading..." />}
                    
                    <h3 className='diets'>Type of diet: 
                        <ul>
                           {recipeDetail.Diets ? recipeDetail.Diets.map(d =>{
                               return (
                                   <li key= {d} className='items'>{d}</li>
                               ) }): <div>No hay dieta</div> }                           
                        </ul>                              
                    </h3>

                    <h3 className='title'>{recipeDetail.dishTypes && "Type of dish:"} {recipeDetail.dishTypes}</h3>
                    <h3 className='title'>Summary:</h3>

                    <h4 className='summary'>{recipeDetail.resume 
                    ? recipeDetail.resume.replace(/<[^>]+>/g, "")
                    : null }</h4>

                                      
                    <h2>{recipeDetail.procedure && "Steps:"}</h2>
                    <h4 className='summary'>{recipeDetail.procedure
                    ? recipeDetail.procedure.replace(/<[^>]+>/g, "") : null }</h4>

                
                </div>
            :
                <h2>No hay receta</h2>
                
            }
            </div>
            <Footer/>
        </div>
    )
}

function mapStateToProps (state) {
    return {
        recipeDetail: state.recipeDetail
    }

}
function mapDispatchToProps (dispatch) {

    return {
        getDetail: (id) => dispatch(getDetail(id)),
        clearDetail: ()=> dispatch(clearDetail())
    }
}

export default connect ( mapStateToProps , mapDispatchToProps ) (Detail);