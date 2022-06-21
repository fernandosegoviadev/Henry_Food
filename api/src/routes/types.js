const { Router } = require('express');
const { Recipe, Diet, Op } = require('../db');
const axios = require('axios');

const { API_KEY } = process.env;

const router = Router();

// estoy en api/types


//------------------------------------------------------------------------------
// Carga de base de datos con los tipos de dieta de la API
//------------------------------------------------------------------------------

router.get('/', async (req, res, next) => {
    let numOfRecipes = 80 // me controla la cantidad de recetas
    try {
        
        let diets = await Diet.findAll()

        if (diets.length === 0) { // Si está vacia la bd            
            
            let dietsAPI = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?number=${numOfRecipes}&${API_KEY}&addRecipeInformation=true`)
            .then((resp) => {
                let filterDietsApi = resp.data.results.map( (indice) => {
                    return indice.diets // Me quedo solo con la parte de todo el json que me interesa
                    
                }).join().split(",") // Armo un array con todas las dietas pero algunas repetidas               
                             
                filterDietsApi = filterDietsApi.filter(d => d.length > 3 ); // Me aseguro que no haya un string vacio  
                
                filterDietsApi = [...new Set (filterDietsApi)].sort() // copio el array, elimino las coincidencias y ordeno
                
                
                let dietsForBulk = filterDietsApi.map( i => {return { name: i}}) // Le doy forma para luego mandarlo a bulkCreate
                // console.log(dietsForBulk);
                // [
                //     { name: 'dairy free' },
                //     { name: 'vegan' },...
                //   ]                   
                
                return Diet.bulkCreate(dietsForBulk)
                            .then(() => true )
                            .catch(() => false )                
                
                
            })
            
            .catch((err) => {
                res.status(404).send('Error, servidor fuera de servicio');                
                next(err)
            })
         
            if (dietsAPI === true) {
                diets = await Diet.findAll()
                return res.status(200).json(diets)

            } else {
                return res.send('Las dietas no fueron cargadas')
            }

            
        }

        else if (diets) { // Si la base de datos no está vacia, devuelvo las dietas

            res.status(200).json(diets)
        }   
        
    } catch (error) {
        
        console.log(error);
        next(error);
        
    }
})


//------------------------------------------------------------------------------
// Agregar dieta a la base de datos
//------------------------------------------------------------------------------

router.post('/add', async (req, res, next) => {
    
    const { name } = req.body;
    
    if (!name) return res.status(400).json({message: 'No se recibió el name'})
    
    
    try {
        
        if (name.length > 3 && name.length < 12 ) { // Control de longitud
            
            const [diet, created] = await Diet.findOrCreate({
                where: { name: name }
            });
            
            
            return created 
            ? res.status(201).send('Dieta creada correctamente') 
            : res.status(400).send('Dieta ya existente')
        }
        
        res.status(400).send('Error: la cantidad caracteres de ser mayor a 3 y menor a 12')
        
        
    } catch (error) {
        console.log(error);
        next(error)
    }
})

// router.post('/add', (req, res, next) => {
//     //  res.status(200).json({message: ' add me escucha'})
//     const {name} = req.body;
//     if(!name) return res.status(400).json({message: ' no llegí el name'})
//     Diet.create(req.body)
//     .then((response)=> {
//         if (response) return res.status(200).json({message: ' dieta creada'})
//     })
//     .catch((error) => {
//         if (error) return res.status(400).json({message: ' dieta no creada'})
//     }) 
// })

//------------------------------------------------------------------------------
// Agregar arreglo de diestas con el método bulkCreate
//------------------------------------------------------------------------------


router.post('/', async (req, res, next) => {

    const { name } = req.body;
    
    if (!name) return res.status(400).json({message: 'Debe enviar los nombres de las recetas'})

    try {
        const diet = await Diet.bulkCreate(req.body);
        
        return diet ? res.status(201).json({ msj: 'Dietas creadas (bulkCreate)'}) : res.status(400).send('Error: la dieta no fue creada')
        
    } catch (error) {
        console.log(error);
        res.status(404).send('Error 1')
    }
})


//------------------------------------------------------------------------------
// Rutas para extras
//------------------------------------------------------------------------------


router.put('/', (req, res) => {
    res.send("estoy en put api/types")
})


router.delete('/', (req, res) => {
    res.send("estoy en delete api/types")
})



module.exports = router;