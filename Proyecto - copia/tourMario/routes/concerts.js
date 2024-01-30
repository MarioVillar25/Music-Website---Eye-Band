var express = require('express');
var router = express.Router();
const multer = require('../middlewares/multer');
const concertControllers = require('../controllers/concertsControllers');

//Para crear concierto

//localhost:3000/concerts/createConcert/:id
router.get('/createConcert/:band_id', concertControllers.showCreateConcert);

//localhost:3000/concerts/createConcert/:id
router.post('/createConcert/:band_id', multer("concerts"), concertControllers.createConcert);

//Para mostrar perfil del concierto

//localhost:3000/concerts/createConcert/:id
router.get('/showOneConcert/:id', concertControllers.showOneConcert);

//Para editar un concierto

//Para mostrar la edicion de un concierto
//localhost:3000/concerts/showEditConcert/:id
router.get('/showEditConcert/:id', concertControllers.showEditConcert);

//Para  editar  un concierto como tal
//localhost:3000/concerts/editConcert/:id
router.post('/editConcert/:id', multer("concerts"), concertControllers.editConcert);

// Borrar permanentemente un concierto
//localhost:3000/concerts/delConcert/:id
router.get('/delConcert/:concert_id/:band_id', concertControllers.delConcert);

// Borrar logicamente un concierto
//localhost:3000/concerts/delLogicConcert/:id
router.get('/delLogicConcert/:concert_id/:band_id', concertControllers.delLogicConcert);











module.exports = router;
