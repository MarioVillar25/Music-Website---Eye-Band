var express = require('express');
var router = express.Router();
const multer = require('../middlewares/multer');


const indexControllers = require('../controllers/indexControllers');


//Ruta para mostrar todas las bandas e index
//localhost:3000/
router.get('/', indexControllers.getAllBands);

//Ruta para About
//localhost:3000/about
router.get('/about', indexControllers.showAbout);


//Rutas para el Registro:

//Para mostrar el formulario de registro:
//localhost:3000/register
router.get('/register', indexControllers.showRegisterForm);

//Para registrarse como tal:
//localhost:3000/register
router.post('/register', multer("band"), indexControllers.register);

//Rutas para el Login:

//Para mostrar el formulario de login
//localhost:3000/login
router.get('/login', indexControllers.showLoginForm);

//Para logearse
//localhost:3000/login
router.post('/login', indexControllers.login);










module.exports = router;
