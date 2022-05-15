const { Router } = require('express');
//------------------------------------------------------------------------------
// Importar todos los routers;
//------------------------------------------------------------------------------
const routeRecipes = require('./recipes');
const routeTypes = require('./types');
const routeDelete = require('./delete');
const routeUpdate = require('./update');



const router = Router();


//------------------------------------------------------------------------------
// Configurar los routers
//------------------------------------------------------------------------------

router.use('/recipes', routeRecipes);
router.use('/types', routeTypes);
router.use('/delete', routeDelete);
router.use('/update', routeUpdate);






//------------------------------------------------------------------------------
// Ruta de testeo
//------------------------------------------------------------------------------

router.get('/', (req, res) => {
    console.log('recibo el get del test')
    res.status(200).send("estoy en get de api (mi home)")
})








module.exports = router;
