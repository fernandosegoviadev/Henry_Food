import './App.css';
import { Route } from 'react-router-dom'; // para poder rutear
import Home from './components/Home/Home'; // Me traigo boton 
import Recipes from './components/Recipes/Recipes'; // Me traigo recipes
import Detail from './components/RecipeDetail/RecipeDetail';
import Search from './components/Search/Search'; // mi formulario de búsqueda
import NavBar from './components/NavBar/NavBar'; // mi barra de navegación
import Form from './components/CreateRecipe/CreateRecipe'; // mi formulario de creación
import { Delete } from './components/Delete/Delete';
import { Put } from './components/Put/Put';



function App() {
  return (
    <>
      <Route exact path = '/'>
            <Home/>
      </Route>

      <Route exact path = '/recipes'>
        <NavBar/>
          <Search/>
            <Recipes/>
      </Route>

      <Route path = '/recipes/:id'>
        <NavBar/>
          <Detail/>
      </Route>

      <Route path = '/create'>
        <NavBar/>
          <Form/>
      </Route>

      <Route path = '/delete'>
        <NavBar/>
          <Delete/>
      </Route>

      <Route path = '/update'>
        <NavBar/>
          <Put/>
      </Route>
    </>
  );
}

export default App;
