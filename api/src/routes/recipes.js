const { Router } = require('express');
const { Recipe, Diet, Op } = require('../db');
const axios = require('axios');

const { API_KEY } = process.env;

const router = Router();

//------------------------------------------------------------------------------
//           Estoy en estoy en api/recipes
//------------------------------------------------------------------------------


//------------------------------------------------------------------------------
//              Mis queridas funciones
//------------------------------------------------------------------------------


//------------------------------------------------------------------------------
// Función para hacer el request a la api - le llega name
//------------------------------------------------------------------------------
async function findByNameApi (name) {

    let numOfRecipes; // Controla la cantidad de resultados



    let newName;


    if (name) {
        numOfRecipes = 30
        newName = 'query=' + name.replace( /%20/g , " ") + "&";
        // query=pasta&          
    } else {
        numOfRecipes = 60
        newName = '';
    } 
    
    // Consulto a la API
   
    recipeByApi = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?${newName}number=${numOfRecipes}&${API_KEY}&addRecipeInformation=true`)             
  
    .then((resp) => {

        // SI NO LLEGAN RESULTADOS
        if (resp.data.results.length === 0 ) return resp.data.results; // arreglo vacio
        
        // SI LLEGAN HAY QUE HACER UN MAP!
        let filterRecipesApi = resp.data.results?.map( (indice) => {
            
             return {
                   id: indice.id,
                   image: indice.image,
                   name: indice.title,
                   dishTypes: indice.dishTypes,
                   Diets: indice.diets,
                   resume: indice.summary,
                   score: indice.spoonacularScore,
                   healthScore: indice.healthScore,                   
                   procedure: indice.analyzedInstructions[0]?.steps.map(s => {
                       return {
                           step: s.step,
                           number: s.number
                       }
                   })
                }
            // Me quedo solo con la parte que me interesa de todo el json
            
        })
        
        return filterRecipesApi;
    })
       
    return recipeByApi;
}

//------------------------------------------------------------------------------
// Función para hacer el request a la bd - le llega name
//------------------------------------------------------------------------------

async function findByNameBd (name) {
    
    let recipeByBd;
    let resulBd;
    
    if (name) {

        let newName = name.replace( /%20/g , " ");

        resulBd = await Recipe.findAll({
            include: Diet,                
            where: {
              name: {
                [Op.iLike]: `%${newName}%`
              
              }
            },
            order: [
                [ 'name', "ASC" ]
            ],
        })

    } else {

        resulBd = await Recipe.findAll({ include: Diet })       
        
    }   
    
    if (resulBd.length > 0 ) {

        recipeByBd = resulBd.map( (indice) => {
            return indice.dataValues;
        })
      
        recipeByBd = recipeByBd.map( (i) => {
            return {
                ...i,                
                Diets: i.Diets?.map(s => {
                    return s.name
                })
            }
        });    
        
    }
    
    return recipeByBd;

}

//------------------------------------------------------------------------------
// Función para verificar si es uuid
//------------------------------------------------------------------------------

function isUUID ( id ) {
    let s = "" + id;

    s = s.match('^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$');
    if (s === null) {
      return false;
    }
    return true;
}

//------------------------------------------------------------------------------
//                  Mis queridas rutas
//------------------------------------------------------------------------------


//------------------------------------------------------------------------------
// Consulta general o por nombre de las recetas
//------------------------------------------------------------------------------

router.get('/', async (req, res, next) => {
    // GET /recipes?name="..."
    const { name } = req.query;
    
    try {

        let recipeByApi;
        let recipeByBd;
        let allRecipes;

        if ( name ) { // Si me llega (name)

           
            recipeByApi = await findByNameApi(name)
            
            
            recipeByBd = await findByNameBd(name)            
                                
        } else { // Si no me llega name

            recipeByApi = await findByNameApi()

            recipeByBd = await findByNameBd()           
            
        }
                
        if (recipeByApi && recipeByBd) {
            allRecipes = recipeByBd.concat(recipeByApi) // Concateno los resultados
            
        }
        
        else if (recipeByApi && !recipeByBd) {
            allRecipes = recipeByApi
        } 

        else if (recipeByBd && !recipeByApi) {
         
            allRecipes = recipeByBd
        }
        
        else if (!recipeByApi && !recipeByBd) {
            allRecipes = [];
        }    
               
            
        return allRecipes[0] === undefined ?
           res.status(200).json(allRecipes) :
           res.status(200).json(allRecipes)
        
       
    } catch (error) {
        
        console.log(error.message);

        res.status(404).json({message: error.message})

        next(error);
        
    }
})

//------------------------------------------------------------------------------
// Creación de recetas
//------------------------------------------------------------------------------

router.post('/', async (req, res, next) => {

    const { name, resume, typeDiet } = req.body;
    // typeDiet = [ 'lacto ovo vegetarian', 'pescatarian', 'gluten free' ] desde el front! 
    
    
    if (!name || !resume || !typeDiet) {
        return res.status(404).json({message:'Receta no creada, faltan datos obligatotios'})
    }

    try {
        
        let oldRecipe = await Recipe.findOne({ where : { name: name }})

        if (oldRecipe) return res.status(200).json({ message:'Error: receta existente'})  
        
        let diet = await Diet.findOne({ where : { name: typeDiet[0] }}) // Si existe la dieta en la db

        if (diet === null) return res.status(400).json({ message:'Error: tipo de dieta no encotrada'}) 

        const recipe = await Recipe.create(req.body); 
        
        if (typeDiet.length > 1 && recipe) {
            for ( var i = 1 ; i < typeDiet.length; i++ ) {
                let diets = await Diet.findOne({ where : { name: typeDiet[i] }})
                diets.addRecipe(recipe)
            }
        }

        let relation = diet.addRecipe(recipe) // Relaciono lo que encontré con lo que creé

        return relation 
        ? res.status(201).json({ message:'Receta creada correctamente'}) 
        : res.status(400).json({ message:'Error: la receta no fue creada'})
        
    } catch (error) {
        
        console.log(error)

        res.status(404).json({ message: 'Error en alguno de los datos provistos'});
        
        next(error);
    }
})

//------------------------------------------------------------------------------
// Consulta por id
//------------------------------------------------------------------------------

router.get('/:id', async (req, res, next) => { 
    // GET /recipes/{idReceta}
    const { id } = req.params;

    try {    
   
        if ( !isUUID(id) ) { // Si no es un uuid -> voy a la api
  
            let recipeAPI = axios.get(`https://api.spoonacular.com/recipes/${id}/information/?${API_KEY}`)
             .then((resp) => {
                
                 let detailsRecipe = {
                      image: resp.data.image,
                      name: resp.data.title,
                      dishTypes: resp.data.dishTypes,
                      Diets: resp.data.diets,
                      resume: resp.data.summary,
                      score: resp.data.spoonacularScore,
                      healthScore: resp.data.healthScore,
                      procedure: resp.data.instructions
                    }                 
                
                return res.json(detailsRecipe) 
            
            })            
            .catch((err) => {
                res.status(404).json({ message: 'Receta no encontrada en la API'});
                next(err)
            })             
        
        }

        if ( isUUID(id) ) { // Si es uuid, consulto la db

            let recipeByPk = await Recipe.findOne({where: {id: id}, include: Diet})
            
            if (recipeByPk !== null) {
                
                recipeByPk = recipeByPk.dataValues;
                
                recipeByPk = {...recipeByPk, Diets: recipeByPk.Diets?.map(s => 
                            { return {...s, dataValues: s.dataValues.name 
                        }
                    })
                }
                recipeByPk = {...recipeByPk, Diets: recipeByPk.Diets?.map(d => {
                    return d.dataValues;
                })}
                                
                
            }

    
            return recipeByPk 
                ? res.json(recipeByPk) 
                : res.status(404).json({message: 'Receta no encontrada en la DB'})
    
        }
        
    } catch (error) {

        console.log(error)

        res.status(404).json({message: error.message})

        next(error);        
    }

})


module.exports = router;