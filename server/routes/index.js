var express = require('express');
var router = express.Router();

let indexController = require('../controllers/index');

/* GET Home listing. */
router.get('/', indexController.displayHomePage);

/* GET Home listing. */
router.get('/home', indexController.displayHomePage);

/* GET About listing. */
router.get('/about', indexController.displayAboutPage);

/* GET Products listing. */
router.get('/products', indexController.displayProductsPage);

/* GET Sevices listing. */
router.get('/services', indexController.displayServicesPage);

/* GET Contact Us listing. */
router.get('/contact', indexController.displayContactsPage);

/* GET Route for Login Page. */
router.get('/login', indexController.displayLoginPage);

/* GET Route for processing Login Page. */
router.post('/login', indexController.processLoginPage);

/* GET Route for Registering Page. */
router.get('/register', indexController.displayRegisterPage);

/* GET Route for processing Registering Page. */
router.post('/register', indexController.processRegisterPage);

/* GET Route to perform Logout. */
router.get('/logout', indexController.performLogout);

module.exports = router;
