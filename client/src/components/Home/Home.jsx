import './Home.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getRecipes } from '../../redux/actions';


function Boton(props) { // Como ya hice la conexión, ahora recibo props de redux

    function getAllRecipes() {

        props.getRecipes()
        
    }
    
    return (
        <>
            <div id='main-box-home'>
                <div className="App">
                    <h1>Henry Food</h1>
                </div>
                <img id='img-home' src="https://salpimenta.com.ar/wp-content/uploads/2017/04/maison-des-chefs-cours-de-cuisine-paris.jpg" alt="Imagen de portada"/>
                <Link to = '/recipes'>
                    <button id='btn-home' onClick={getAllRecipes}>Go Home</button>
                </Link>
            </div>
        </>
    )
}



export default connect (null, { getRecipes }) (Boton);
