const { Router } = require('express');
const { Recipe, Diet, Op } = require('../db');
const axios = require('axios');

const { API_KEY } = process.env;

const router = Router();


router.put('/name', async (req, res, next) => {
    // res.status(200).send(' le estoy haciendo un put a /name')
    const { recipeId , name } = req.body;

    console.log(req.body, ' mi req.body')

    try {
        
        let recipe = await Recipe.findByPk(recipeId)
        
        if (recipe === null) {
    
            return res.status(200).json({message: 'Id inexistente'})
           
        } else {
    
            Recipe.update({ name: name }, {
                where: {
                id: recipeId
                }
            })
            .then((response) => {
                // console.log (response, ' response')
                if (response) res.status(200).json({message: 'Título actualizado con éxito'})
            })
            .catch((error) => {
                // console.log(error, ' mi error')
                if (error) res.status(400).json({message: 'Error la receta no fue actualizada'})
            })
            
        }   
    
    } catch (error) {
        console.log(error);
        res.status(400).json({message: 'Se produjo un error en el proceso'});
        next(error);
    }
})


//------------------------------------------------------------------------------
// Agregar dietas a recetas creadas
//------------------------------------------------------------------------------


router.put('/', async (req, res) => {
    
    const {recipeId, dietId, value} = req.body;
    
    if (!recipeId || !dietId || !value) return res.status(400).send('Error: campos incompletos')

    try { // value puede ser igual a 'add' or 'remove'
        
        let recipeUpdate = await Recipe.findByPk(recipeId)
        let diet = await Diet.findByPk(dietId)
    
        if (recipeUpdate !== null && diet !== null) { // Verifico que la receta y la dieta existan
            let relation;
            
            if (value === 'add') {
                relation = diet.addRecipe(recipeUpdate) // Relaciono lo que encontré con lo que se agrega
            }
            if (value === 'remove') {
                relation = diet.removeRecipe(recipeUpdate) // Relaciono lo que encontré con lo que se agrega
            }            
            
            // evaluar la relación (qué exista)
            return relation 
            ? res.status(201).send('Dieta agregada/removida con éxito') 
            : res.status(400).send('Error al agregar o quitar la dieta')
        }
    
        res.status(404).send('Datos no encontrados')

    } catch (error) {
        console.log(error);
        next(error);
        
    }
   
})

//------------------------------------------------------------------------------
// Quitar dietas a recetas creadas (la receta siempre tiene que tener al menos
// una dieta asociada)
//------------------------------------------------------------------------------



module.exports = router;