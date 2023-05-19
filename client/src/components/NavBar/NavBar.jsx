import './NavBar.css';
import { NavLink } from 'react-router-dom';
import Logo from '../../images/logoHenry.png';
import React from 'react';
import { getRecipes } from '../../redux/actions';
import { connect } from 'react-redux';

function NavBar(props) {

    function getAllRecipes() {

        props.getRecipes() // no es de arriba, es el que me llega por propiedad
        
    }
    
    return (
        <div id = 'main-box'>
        <header className="navbar">
            <div>
                <img id="logoHenry" src={Logo} width="30" height="30" className="d-inline-block align-top" alt="Logo Henry" />
            </div>
            <div id='hf'>
                <h1 id="title">Henry food</h1>
            </div>
            <nav>
                <ul className="list">
                    <li className="list-item">
                        <NavLink to="/recipes" onClick={getAllRecipes} className="links" >Home</NavLink>
                        <NavLink to="/create" className="links">Create</NavLink>
                        <NavLink to ="/update" className="links">Update</NavLink> 
                        <NavLink to ="/delete" className="links">Remove</NavLink>                         
                    </li>
                </ul>
            </nav>
        </header>
        </div>
    )
}

export default connect (null, { getRecipes }) (NavBar);