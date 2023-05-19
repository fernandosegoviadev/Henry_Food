import "./App.css";
import { Route, Routes, BrowserRouter } from "react-router-dom"; // para poder rutear
import Home from "./components/Home/Home"; // Me traigo boton
import Recipes from "./components/Recipes/Recipes"; // Me traigo recipes
import Detail from "./components/RecipeDetail/RecipeDetail";
import Search from "./components/Search/Search"; // mi formulario de búsqueda
import NavBar from "./components/NavBar/NavBar"; // mi barra de navegación
import Form from "./components/CreateRecipe/CreateRecipe"; // mi formulario de creación
import { Delete } from "./components/Delete/Delete";
import { Put } from "./components/Put/Put";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/recipes"
          element={
            <>
              <NavBar />
              <Search />
              <Recipes />
            </>
          }
        />
        <Route
          path="/recipes/:id"
          element={
            <>
              <NavBar />
              <Detail />
            </>
          }
        />
        <Route
          path="/create"
          element={
            <>
              <NavBar />
              <Form />
            </>
          }
        />
        <Route
          path="/delete"
          element={
            <>
              <NavBar />
              <Delete />
            </>
          }
        />
        <Route
          path="/update"
          element={
            <>
              <NavBar />
              <Put />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
