'use strict'

var fs = require('fs')
var http = require('http')
var path = require('path')
var url = require('url')

var express = require('express');
var ejs = require('ejs')
const router = express.Router()
var app = express();

var request = require('request');
var bodyParser = require('body-parser');
const { urlencoded } = require('body-parser')


app.use(bodyParser.json());
app.use(bodyParser.urlencoded( { extended:true } ));

app.set('view engine', 'ejs')
app.engine('ejs', require('ejs').__express)

// object to add error messages into
var errors = {
    email: '',
    password: '',
    name: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    age: '',
    gender: '',
    bio: '',
}

// route for index
router.get('/', function(req, res){
    res.render('index', {pagename: 'Home'});
})

// route for blog
router.get('/blog', function(req, res){
    res.render('blog', {pagename: 'Blog'});
})

// route for shop
router.get('/shop', function(req, res){
    res.render('shop', {pagename: 'Shop'});
})

// route for login
router.post('/login', function(req, res){

    // regexes for email needs to have @ symbole and .something
    var emailRegex = (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
    // needs to be at least 4 characters contain 1 upper 1 lower 1 special char 1 #
    var passRegex = (/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{4,})/)

    // check if email is not filled in
    if (req.body.email == '') {
        errors.email('Email is require!')
    }
    // check if password is not filled in
    if (req.body.password == '') {
        errors.email('Password is require!')
    }
    // check if email passes vaildation
    if (!emailRegex.test(req.body.email)) {
        errors.password('Email is not valid!')
    }
    // check if password passes validation
    if (!passRegex.test(req.body.password)) {
        errors.password('Password is not valid!, it must contain 1 lowercase, uppercase, numeric, special character, and at least 4 characters long')
    }

    // render the index page with error object
    res.render('index', { pagename: 'Home', errors: errors });

})

router.post('/registration', function(req, res){

    // regex for each
    var nameRegex = (/^[a-zA-Z ](?=.{2,})+$/),
    addyRegex = (/^[a-zA-Z\s\d\/]*\d[a-zA-Z\s\d\/]\s(?=.{2,})[a-zA-Z\d]*$/),
    cityRegex = (/^[a-zA-Z\']+(?:[\s-][a-zA-Z\']+)*$/),
    stateRegex = (/^[a-z]{2}(?:,[a-z]{2})*$/),
    zipRegex = (/^\d{5}(?:[-\s]\d{4})?$/),
    bioRegex = (/^[a-zA-Z\d\'\,\.\s].{55,}$/)

    // check to see if they are undefined or empty or fail regex if so run the error code - then check if empty and run that otherwise they failed regex
    if (req.body.fname == undefined || req.body.fname == '' || !nameRegex.test(req.body.fname)) {
        if (req.body.fname == undefined || req.body.fname == '') {
            errors.fname = 'First name cannot be left blank'
        } else {
            errors.fname = 'First name must be at least two characters'
        }
    }
    // check to see if they are undefined or empty or fail regex if so run the error code - then check if empty and run that otherwise they failed regex
    if (req.body.lname == undefined || req.body.lname == '' || !nameRegex.test(req.body.lname)) {
        if (req.body.lname == undefined || req.body.lname == '') {
            errors.lname = 'Last name cannot be left blank'
        } else {
            errors.lname = 'Last name must be at least two characters'
        }
    }
    // check to see if they are undefined or empty or fail regex if so run the error code - then check if empty and run that otherwise they failed regex
    if (req.body.address == undefined || req.body.address == '' || !addyRegex.test(req.body.address)) {
        if (req.body.address == undefined || req.body.address == '') {
            errors.address = 'Address cannot be left blank'
        } else {
            errors.address = 'Address must be house # followed by street'
        }
    }
    // check to see if they are undefined or empty or fail regex if so run the error code - then check if empty and run that otherwise they failed regex
    if (req.body.city == undefined || req.body.city == '' || !cityRegex.test(req.body.city)) {
        if (req.body.city == undefined || req.body.city == '') {
            errors.city = 'City cannot be left blank'
        } else {
            errors.city = 'City must be not use unacceptable characters'
        }
    }
    // check to see if they are undefined or empty or fail regex if so run the error code - then check if empty and run that otherwise they failed regex
    if (req.body.state == undefined || req.body.state == '' || !stateRegex.test(req.body.state)) {
        if (req.body.state == undefined || req.body.state == '') {
            errors.state = 'State cannot be left blank'
        } else {
            errors.state = 'State should be two character abbreviation'
        }
    }
    // check to see if they are undefined or empty or fail regex if so run the error code - then check if empty and run that otherwise they failed regex
    if (req.body.zip == undefined || req.body.zip == '' || !zipRegex.test(req.body.zip)) {
        if (req.body.zip == undefined || req.body.zip == '') {
            errors.zip = 'Zip Code cannot be left blank'
        } else {
            errors.zip = 'Zip Code must be exactly 5 digits'
        }
    }
    // check to see if these are empty
    if (req.body.age == 'Select Age') {
        errors.age = 'Please select an age'
    }
    // check to see if these are empty
    if (req.body.gender == undefined) {
        errors.gender = 'Please select a gender'
    }
    // check to see if these are empty
    if (req.body.consent == undefined) {
        errors.consent = 'You must agree to terms to register'
    }
    // check to see if they are undefined or empty or fail regex if so run the error code - then check if empty and run that otherwise they failed regex
    if (req.body.bio == undefined || req.body.bio == '' || !bioRegex.test(req.body.bio)) {
        if (req.body.bio == undefined || req.body.bio == '') {
            errors.bio = 'Biography cannot be left blank'
        } else {
            errors.bio = 'Biography must be at least 55 characters.'
        }
    }

    // render page with errors
    res.render('index', { pagename: 'Home', errors: errors });

})


app.use(express.static('public'))
app.use('/', router);
var server = app.listen('8080');
