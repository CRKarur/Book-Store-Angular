let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let passport= require('passport');

//enable jwt
let jwt = require('jsonwebtoken');
let DB = require('../config/db');

//create user model
let userModel = require('../models/user');
let User = userModel.User;//alias

/* GET Home listing. */
module.exports.displayHomePage = (req,res,next) =>{
    res.render('index',{title: 'Home', displayName: req.user?req.user.displayName :''});
}

/* GET About listing. */
module.exports.displayAboutPage = (req,res,next) =>{
    res.render('index', {title: 'About', displayName: req.user?req.user.displayName :''});
}

/* GET Products listing. */
module.exports.displayProductsPage = (req,res,next) =>{
    res.render('index', {title: 'Products', displayName: req.user?req.user.displayName :''});
}

/* GET Sevices listing. */
module.exports.displayServicesPage = (req,res,next) =>{
    res.render('index', {title: 'Services', displayName: req.user?req.user.displayName :''});
}

/* GET Contact Us listing. */
module.exports.displayContactsPage = (req,res,next) =>{
    res.render('index', {title: 'Contact Us', displayName: req.user?req.user.displayName :''});
}

/* GET Route for Login Page. */
module.exports.displayLoginPage = (req,res,next)=>{
    //check if user has aready logged in
    if(!req.user)
    {
        res.render('auth/login',
        {
            title: 'Login',
            messages: req.flash('LoginMessage'),
            displayName: req.user ? req.user.displayName : ''
        });
    }
    else
    {
        return res.redirect('/');
    }
}

/*Get route for processing Login Page*/
module.exports.processLoginPage = (req,res,next)=>{
    passport.authenticate('local',
    (err, user, info)=>{
        //server err?
        if(err)
        {
            return next(err);
        }
        //is there a user login error?
        if(!user)
        {
            req.flash('loginMessage','Authentication Error');
            return res.redirect('/login');
        }
        req.login(user,(err) =>{
            //server err
            if(err)
            {
                return next(err);
            }

            const payload = 
            {
                id: user._id,
                displayName: user.displayName,
                email: user.email
            }

            const authToken = jwt.sign(payload, DB.Secret, {
                expiresIn:604800// 1 week in seconds
            });
           
            //TODO - getting ready to convert to API
         
            /*  res.json({success: true, msg: 'User Logged in Successfully!', user: {
                id: user._id,
                displayName: user.displayName,
                username: user.username,
                email: user.email
            }, token: authToken});
*/
            return res.redirect('/book-list');
        });
    })(req,res,next);
}

/* GET Route for Registering Page. */
module.exports.displayRegisterPage = (req,res,next)=>{
    //check if the user is not already logged in
    if(!req.user)
    {
        res.render('auth/register',
        {
            title: 'Register',
            messages: req.flash('registerMessage'),
            displayName: req.user?req.user.displayName : ''
        });
    }
    else
    {
        return res.redirect('/');
    }
}



/* GET Route for processing Registering Page. */
module.exports.processRegisterPage = (req,res, next) =>{
    //instantiate a user object
    let newUser = new User({
        username: req.body.username,
        //password: req.body.password,
        email: req.body.email,
        displayName: req.body.displayname
    });
    User.register(newUser, req.body.password, (err) =>{
        if(err)
        {
            console.log("Error: Inserting New user");
            if(err.name == "UserExistsError")
            {
                req.flash(
                    'registerMessage',
                    'Registration Error: User already Exists!'
                );
                console.log('Error: User Already Exists!');
            }
            res.render('auth/register',
            {
                title: 'Register',
                messages: req.flash('registerMessage'),
                displayName: req.user ? req.user.displayName : ''
            });
        }
        else
        {
            //if no error exists, then registration is successful
            //redirect the user and authenticate them
        
            //TODO - Getting Ready to Convert to API   
         //   res.json({success: true, msg: 'User Registered Successfully!'});
            
            return passport.authenticate('local')(req,res,()=>{
                res.redirect('/book-list')
            });
        }
    });
}

/* GET Route to perform Logout. */
module.exports.performLogout = (req,res,next) => {
    req.logout();
    res.redirect('/');
}