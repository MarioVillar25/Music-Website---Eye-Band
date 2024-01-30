var express = require('express');
var router = express.Router();
//const multer = require('../middlewares/multer');
const bandsControllers = require('../controllers/bandsControllers');



//Rutas Perfil Banda

//localhost:3000/bands/oneBand/
router.get('/oneBand/:id', bandsControllers.showOneBand);




module.exports = router;
