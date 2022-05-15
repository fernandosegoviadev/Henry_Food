const { Router } = require('express');
const { Recipe, Diet, Op } = require('../db');
const axios = require('axios');

const { API_KEY } = process.env;

const router = Router();


//------------------------------------------------------------------------------
// Get a delete para tener la lita de las recetas antes de borrarlas
//------------------------------------------------------------------------------

router.get('/', async (req, res) =>{   
     
    try {
        let listRecipeBd = await Recipe.findAll({ include: Diet })
                
        if (listRecipeBd.length === 0) { 
            return res.send('Base de datos vacia')
        }
        // Transformo la info según lo que necesito
        listRecipeBd = listRecipeBd.map( r => {
            return {
                dataValues: r.dataValues
            }
        })
        
        listRecipeBd = listRecipeBd.map( r => {
            return {
                id: r.dataValues.id,
                name: r.dataValues.name,
                image: r.dataValues.image,
                Diets: r.dataValues.Diets ?  r.dataValues.Diets.map(d=> {
                    return {
                        id: d.id,
                        name: d.name
                    }
                }) : r.dataValues.Diets
            }
        })
        // console.log(listRecipeBd, ' findAll')
        
        // ¿Cómo quiero que me llegue la info? 
        // [{id: "id" , name: "name", diets: [d1, d2]}]

        
        res.status(200).json(listRecipeBd)
        
    } catch (error) {
        console.log(error);
        next(error);
        
    }
})

//------------------------------------------------------------------------------
// Borrar recetas de la base de datos
//------------------------------------------------------------------------------

router.delete('/', async (req, res) => {
    
    const { id } = req.body; // Tengo que borrar la receta por su id, no por su name
   

    if (!id) return res.status(404).json({message: 'Id no recibido'})

    try {
        
        let reuslBd = await Recipe.findByPk(id)
    
        if (reuslBd === null) {
            return res.status(200).json({message:'No se encontró la receta señalada'})
        }

        await Recipe.destroy({
            where: {
                id: id
            }
            
        });
           
    
        res.status(200).json({message:'Receta borrada exitosamente'});
        
    } catch (error) {
        console.log(error);
        res.status(404).json({message: error.message})
        next(error);
    }
    
})




module.exports = router;