"use strict"
var express= require("express");
var request = require("request");
var app=express();
var router = express.Router();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended : true}));

router.get("/",function(req,res){
    console.log("Here");
    res.send('<div><h1>Hello by Christopher Hitchcock</h1><a href="/form">Click here to try logging in again</a></div>');
})

router.get("/form",function(req,res){
var html ='<form action="/awsdata" method="post"><input name="email" type="text" placeholder="email"><input name="password" type="text" placeholder="password"><input type="submit" /><form>'; // Create your html form here
res.send(html);
})

router.post("/awsdata",function(req,res){
var email = req.body.email; // Complete the missing pieces
var password = req.body.password;// Complete the missing pieces
request("https://j922msppm9.execute-api.us-west-1.amazonaws.com/production?email="+email+"&password="+password,{json:true},(err,response,body)=>{
if(err){return console.log(err)};
if(body.Count>0){
    res.status(200).send('<div><h1>Thank you for loggin in!</h1><a href="/">Click here to go to home page</a></div>')
}else{
    res.status(500).send('<div><h1>Your username and password combo was invalid</h1><a href="/form">Click here to try logging in again</a></div>')
}
})
})
app.use("/",router);
app.listen("8080");