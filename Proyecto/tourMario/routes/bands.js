var express = require('express');
var router = express.Router();
const multer = require('../middlewares/multer');
const bandsControllers = require('../controllers/bandsControllers');



//Rutas Perfil Banda

//localhost:3000/bands/oneBand/
router.get('/oneBand/:id', bandsControllers.showOneBand);


//Para editar una banda

//Para mostrar la edicion de una banda
//localhost:3000/bands/showEditband/:id
router.get('/showEditBand/:id', bandsControllers.showEditBand);

//Para  editar  una banda como tal
//localhost:3000/bands/editBand/:id
router.post('/editBand/:id', multer("band"), bandsControllers.editBand);


//Para Borrar una banda

//Para borrar una banda definitivamente
//localhost:3000/bands/delBand/:id
router.get('/delBand/:id', bandsControllers.delBand);


//Para borrar una banda de forma logica
//localhost:3000/bands/delLogicBand/:id
router.get('/delLogicBand/:id', bandsControllers.delLogicBand);




module.exports = router;
