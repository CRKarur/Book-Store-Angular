let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let jwt = require('jsonwebtoken');


//connect to the Book Model
let Book = require('../models/book');

/*GET route for book list page - READ Operation*/
module.exports.displayBookList = (req,res, next) => {
    Book.find((err, bookList) => {
        if(err)
        {
            return console.error(err);
        }
        else
        {
          // console.log(BookList);
           res.render('book/list', 
           {
               title: 'Books', 
               BookList: bookList,
               displayName: req.user ? req.user.displayName : ''
            });
        }
    });
}

/*GET route for displaying the ADD page - CREATE Operation*/
module.exports.displayAddPage = (req,res,next) => {
    res.render('book/add', {title: 'Add Book',
    displayName: req.user ? req.user.displayName : ''});
}

/*GET route for processing the ADD page - CREATE Operation*/
module.exports.processAddPage = (req,res,next) => {
    let newBook = Book({
            "name": req.body.name,
            "author": req.body.author,
            "Published":req.body.Published,
            "description":req.body.description,
            "price":req.body.price
    });

    Book.create(newBook, (err, Book) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //refresh the book list
            res.redirect('/book-list');
        }
    })
}

/*GET route for displaying the EDIT page - UPDATE Operation*/
module.exports.displayEditPage = (req,res,next) => {
    let id = req.params.id;

    Book.findById(id, (err, bookToEdit) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //show the edit view
            res.render('book/edit', {title: 'Edit Book', book: bookToEdit, 
            displayName: req.user ? req.user.displayName : ''});
        }
    });
}

/*GET route for processing the EDIT page - UPDATE Operation*/
module.exports.processEditPage = (req,res,next) => {
    let id = req.params.id;

    let updatedBook = Book({
            "_id": id,
            "name": req.body.name,
            "author": req.body.author,
            "Published":req.body.Published,
            "description":req.body.description,
            "price":req.body.price
        });
    Book.updateOne({_id:id}, updatedBook, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
             //refresh the book list
             res.redirect('/book-list');
        }
    });
}

/*GET route to perform DELETE  Operation*/
module.exports.performDelete = (req,res,next) => {
    let id= req.params.id;

    Book.remove({_id:id}, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
             //refresh the book list
             res.redirect('/book-list');
        }
    });
}
