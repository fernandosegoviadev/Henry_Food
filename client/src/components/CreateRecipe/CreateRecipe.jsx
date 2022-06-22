import './CreateRecipe.css'
import React from 'react';
import { useState, ect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getDiets } from '../../redux/actions';
import axios from "axios";
import Footer from '../Footer/Footer';


export default function  Form() {

  //-----------------------------------------------------------------------------
  // Definos mis estados locales para los campos del formulario
  //------------------------------------------------------------------------------

  const [ recipe, setRecipe ] = useState(''); // para mi campo de receta
  const [ errorRecipe, setErrorRecipe ] = useState(''); 
 
  const [ summary, setSumary ] = useState(''); // para mi campo de sumary
  const [ errorSummary, setErrorSummary ] = useState('');

  const [ steps, setSteps ] = useState(''); // para mi campo de sumary
  const [ errorSteps, setErrorSteps ] = useState('');

  const [ types, setTypes ] = useState([]); // para mis tipos de dietas

  const [ imageUrl, setImageUrl ] = useState(''); // para mi campo de url de imagen
  const [ errorImageUrl, setErrorImageUrl ] = useState('');

  const [ score, setScore ] = useState(''); // para mi campo de url de imagen
  const [ errorScore, setErrorScore ] = useState('');

  const [ healthScore, setHealthScore ] = useState('');
  const [ errorHealthScore, setErrorHealthScore ] = useState('');

  const [ validate, setValidate ] = useState(false);
 
  

  const dispatch = useDispatch()

  ect(()=>{ // Cuando se cargue la página
        
    dispatch(getDiets()) // Debo cargar las dietas
    
  }, [])
  
  //--------------------------------------------------------------------------
  //  Junto la info y dispacho una acción
  //--------------------------------------------------------------------------
  //--------------------------------------------------------------------------
  // Envío un objeto con los datos de mi formulario
  //--------------------------------------------------------------------------
  // { name: "gato1", resume: "Resumen d222", etc: "..." }

  function onSubmit(e) {
    e.preventDefault()

    let newRecipe = {
      name: recipe,
      resume: summary,
      procedure: steps,
      typeDiet: types,
      image: imageUrl,
      score: score,
      healthScore: healthScore
    }
    console.log(newRecipe);
    if (recipe && summary && steps && imageUrl && types.length > 0 && score && healthScore) {

      // Termino de recontra verificar antes de hacer el post!
      if (errorRecipe === "" && errorSummary === "" && errorSteps === "" &&
          errorImageUrl === "" && types.length > 0 && errorScore == "" && errorHealthScore === "" ) {

            axios.post('/api/recipes', newRecipe)
            .then((res)=>{  
              
              window.alert(res.data.message)
              
              
            })
            .catch((error) => console.log(error))
      }

    } else {
      window.alert('Campos incompletos')

    }

    // Limpio los estados
    setRecipe('');
    setSumary('');
    setSteps('');
    setTypes([]);
    setImageUrl('');
    setScore('');
    setHealthScore('');
  }  


  //--------------------------------------------------------------------------
  // Defino mis funciones validadoras
  //--------------------------------------------------------------------------
  
  
  //--------------------------------------------------------------------------
  // Función validadora del campo recetas
  //--------------------------------------------------------------------------
  function validateRecipe (recipe) {

    validateSubmit(); 
   
    let regExp = /(?:[A-Za-z]+ ){1}[A-Za-z]+/g

    if (!recipe.length) { 
      setErrorRecipe('Campo requerido')
    
    } else if (!regExp.test(recipe)) {
      setErrorRecipe('Deben tener al menos dos palabras')

    } else if (recipe.length < 4 || recipe.length > 20) {
      setErrorRecipe('Debe tener entre 4  y 20 caracteres') 
    
    } else { setErrorRecipe(''); }   
    
    setRecipe(recipe);
    
  }

  
  //--------------------------------------------------------------------------
  // Función validadora del campo summary
  //--------------------------------------------------------------------------

  function validateSummary (sumary) {

    validateSubmit();
    
    let regExp = /(?:[A-Za-z]+ ){2}[A-Za-z]+/g
    
    if (!sumary.length) { 
      setErrorSummary('Campo requerido') 
    
    } else if (!regExp.test(sumary)) {
      setErrorSummary('El texto debe tener al menos tres palabras')

    } else if (sumary.length < 20 || sumary.length > 150) {
      setErrorSummary('El texto debe tener entre 20  y 150 caracteres')

    } else { setErrorSummary(''); }      
    
    setSumary(sumary);
      
  }


  //--------------------------------------------------------------------------
  // Función validadora del campo steps
  //--------------------------------------------------------------------------

  function validateSteps (steps) {
    validateSubmit(); 
   
    let regExp = /(?:[A-Za-z]+ ){2}[A-Za-z]+/g

    if (!steps.length) { 
      setErrorSteps('Campo requerido')
    
    } else if (!regExp.test(steps)) {
      setErrorSteps('El texto debe tener al menos tres palabras')

    } else if (steps.length < 20 || steps.length > 150) {
      setErrorSteps('Debe tener entre 20  y 150 caracteres') 
    
    } else { setErrorSteps(''); }
    
    setSteps(steps);
    
  }


  //--------------------------------------------------------------------------
  // Función validadora del campo imageUrl
  //--------------------------------------------------------------------------

  function validateImageUrl (imageUrl) {
    validateSubmit();

    let regExp = /^http[^\?]*.(jpg|jpeg|gif|png|tiff|bmp)(\?(.*))?$/gmi;

    if (!imageUrl.length) { setErrorImageUrl('Campo requerido')}

    else if (!regExp.test(imageUrl)) {
      setErrorImageUrl('Debe introducir la url de la imagen de la receta') } 
    
    else { setErrorImageUrl(''); }
    
    setImageUrl(imageUrl);

  }


  //--------------------------------------------------------------------------
  // Función validadora del selec diets
  //--------------------------------------------------------------------------

  const diets = useSelector((state) => state.diets)

  function onSelectChange(diets){
    
    if ( diets !== "Seleccione dieta …" ) {
      // Pdría verificar que la dieta esté incluida en diets (línea 221)

      if (!types.includes(diets)) {

        setTypes(types.concat([diets]));

        validateSubmit(); 
      }

    }

  }

  function clearSelection (e) { // Limpio el estado de types
    e.preventDefault();
    setTypes([])
    validateSubmit(); 
  }
  

  //--------------------------------------------------------------------------
  // Función validadora de Score 
  //--------------------------------------------------------------------------

  function validateScore (e) {
      
    let value = e.target.value;

    let regExp = /[0-9]/g; 
    
    if (!value.length) { 
      setErrorScore('Campo requerido')
    
    } else if (!regExp.test(value)) {
      setErrorScore('Debe ser un número') 

    } else if (!( parseInt(value) <= 100 && parseInt(value) > 0 )) {
      setErrorScore('Debe ser un número comprendido entre 1 y 100') 

    } else { 
      setErrorScore(''); 
    }    
    
    setScore(value);

  }


  //--------------------------------------------------------------------------
  // Función validadora de Health Score
  //--------------------------------------------------------------------------

  function validateHealthScore (e) {
        
    let value = e.target.value;

    let regExp = /[0-9]/g; 
    
    if (!value.length) { 
      setErrorHealthScore('Campo requerido')
    
    } else if (!regExp.test(value)) {
      setErrorHealthScore('Debe ser un número') 

    } else if (!( parseInt(value) <= 100 && parseInt(value) > 0 )) {
      setErrorHealthScore('Debe ser un número comprendido entre 1 y 100') 

    } else { 
      setErrorHealthScore(''); 
    }    
    
    setHealthScore(value);

  }
  
  //--------------------------------------------------------------------------
  // Función validadora de Submit
  //--------------------------------------------------------------------------

  function validateSubmit () {    
      
    if( recipe && errorRecipe === "" &&
       summary && errorSummary === "" &&
       imageUrl && errorImageUrl === "" &&
       score && errorScore === "" &&
       healthScore && errorHealthScore === "" &&
       types.length > 0 ) {
       setValidate(true);
          
    
    } else {
        setValidate(false);
         
    }    
   
  }
  

  //--------------------------------------------------------------------------
  // Finalmente mi formulario
  //--------------------------------------------------------------------------

  return ( 
    <div className='box'>
      <form className='form'>
        <br />        
          <h4 className='title'>Recipe:</h4>
                
        <input
        id = "recipe" 
        className = {errorRecipe && 'danger'}
        value = {recipe}
        placeholder = 'Recipe'
        onClick = {(e) => validateSubmit(e)} 
        onFocus= {(e) => validateRecipe(e.target.value)} 
        onChange = {(e) => validateRecipe(e.target.value)}
        />
        {errorRecipe && (
            <p className="danger">{errorRecipe}</p>
          )}

        <br />
          <h4 className='title'>Summary:</h4>
        
        <textarea className = {errorSummary && 'danger'}
        id='sumary'
        value = {summary}
        name="summary" rows="4" cols="40" 
        placeholder="Steps..."
        onClick = {(e) => validateSubmit(e)} 
        onFocus= {(e) => validateSummary(e.target.value)} 
        onChange = {(e) => validateSummary(e.target.value)}
        ></textarea>
        {errorSummary && (
            <p className="danger">{errorSummary}</p>
          )}        

        <br />        
          <h4 className='title'>Steps:</h4>
        
        <textarea className = {errorSteps && 'danger'}
        id='step'
        value = {steps}
        name="steps" rows="4" cols="40" 
        placeholder="Steps..."
        onClick = {(e) => validateSubmit(e)} 
        onFocus= {(e) => validateSteps(e.target.value)} 
        onChange = {(e) => validateSteps(e.target.value)}
        ></textarea>
        {errorSteps && (
            <p className="danger">{errorSteps}</p>
          )} 

        <br />        
          <h4 className='title'>Image:</h4>

        <input
        id='image' 
        type = "url"
        className = {errorImageUrl && 'danger'}
        value = {imageUrl}
        placeholder = 'www.direccion/image.img'
        onClick = {(e) => validateSubmit(e)} 
        onFocus= {(e) => validateImageUrl(e.target.value)} 
        onChange = {(e) => validateImageUrl(e.target.value)}
        />
        {errorImageUrl && (
            <p className="danger">{errorImageUrl}</p>
          )}
        <br />
        <br />
        {imageUrl && ( <img id='img-create' src={imageUrl} alt="Image not found"/>)}

        <br />
          <h4 className='title'>Diets:</h4>

        <select id='diets' name="select" onChange = {(e) => onSelectChange(e.target.value)}>
            <option >Seleccione dieta …</option>                
                {diets ? diets.map(d =>{
                   return (
                       <option key= {d.id} value= {d.name}>{d.name}</option>
                ) 
                }): <option>No hay dieta</option> }
        </select>
        <button onClick = {(e)=> clearSelection(e)}>Limpiar seleccón</button>

          <br  className='list-items'/>
            <ul>
              {types?.map( i => {
                return (
                  <li key = {i}  className='items'> {i} </li>                  
                )
              })}
            </ul>  
            
          {types.length ? null : <h5>Debe agregar al menos una dieta</h5>}

          <br />          
        <h4 className='title'>Score: {score} </h4>

        <input className='inputScore' type="range" name="score" 
        min="1" max="100" step="2" value={score}
        onClick = {(e) => validateSubmit(e)}  
        onChange = {(e) => validateScore(e)}
        />
        {errorScore && (
            <p className="danger">{errorScore}</p>
          )}

        <br />
          <h4 className='title'>Health Score: {healthScore} </h4>
        
        <input className='inputScore' type="range" name="healthScore"
        min="1" max="100" step="2"value={healthScore}
        onClick = {(e) => validateSubmit(e)} 
        onChange = {(e) => validateHealthScore(e)}
        />
        {errorHealthScore && (
            <p className="danger">{errorHealthScore}</p>
          )}

        <br />
        <button id="btn" disabled={validate ? false : true } 
        value={validate} onClick = {(e) => onSubmit(e)}>Enviar</button>


      </form>
      <Footer/>
    </div>

  )
}

