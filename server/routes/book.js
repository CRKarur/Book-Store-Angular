
let express = require('express');
let router = express.Router();

let jwt = require('jsonwebtoken');
 
let passport = require('passport');

//connect to the Book Model
let Book = require('../models/book');
let bookController = require('../controllers/book');
let mongoose = require('mongoose');



//helper function for gaurd purposes
function requireAuth(req,res,next)
{
    //check if user is logged in
    if(!req.isAuthenticated())
    {
        return res.redirect('/login');
    }
    next();
}


/*GET route for book list page - READ Operation*/
router.get('/', bookController.displayBookList);

/*GET route for displaying the ADD page - CREATE Operation*/
router.get('/add', requireAuth, bookController.displayAddPage);

/*GET route for processing the ADD page - CREATE Operation*/
router.post('/add', requireAuth, bookController.processAddPage);

/*GET route for displaying the EDIT page - UPDATE Operation*/
router.get('/edit/:id', requireAuth, bookController.displayEditPage);

/*GET route for processing the EDIT page - UPDATE Operation*/
router.post('/edit/:id', requireAuth, bookController.processEditPage);

/*GET route to perform DELETE  Operation*/
router.get('/delete/:id', requireAuth, bookController.performDelete);

module.exports = router;