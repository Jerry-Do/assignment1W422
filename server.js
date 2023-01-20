/*********************************************************************************
*  WEB422 – Assignment 1
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  
*  No part of this assignment has been copied manually or electronically from any other source
*  (including web sites) or distributed to other students.
* 
*  Name: Jerry Do Student ID: 116797218 Date: 20-01-2023
*  Cyclic Link: _______________________________________________________________
*
********************************************************************************/ 

const express = require("express");
const cors = require("cors");
const dotenv = require('dotenv').config(); 
const mongo = require('mongoose')
const app = express();
const MoviesDB = require("./modules/moviesDB.js");
const db = new MoviesDB();

const HTTP_PORT = process.env.PORT || 8080;

db.initialize(process.env.MONGODB_CONN_STRING).then(()=>{
    app.listen(HTTP_PORT, ()=>{
        console.log(`server listening on: ${HTTP_PORT}`);
    });
}).catch((err)=>{
    console.log(err);
});

app.get("/", (req, res) => {
    res.json({message: "API Listening"})
});  

app.use(cors());

app.use(express.json())



app.post('/api/movies', (req, res) =>
{
    db.addNewMovie(req.body).then((data) => {res.status(201).json()});
})

app.get('/api/movies', (req, res) =>
{
    db.getAllMovies(req.query.page, req.query.perPage, req.query.title).then((data) => {res.status(200).json(data);})
    
})

app.get('/api/movies/:_id', (req, res) => {
    db.getMovieById(req.params._id).then((data) => {res.status(200).json(data);})
});

app.put('/api/movies/:_id', (req, res) =>
{
    db.updateMovieById(req.params._id, req.body).then((data) => {res.status(200).json({message:"Successfully updated movie", data});})
    .catch(()=>{res.status(501).json({message:"Unsuccessfully updated movie"})})
})

app.delete('/api/movies/:_id', (req, res) =>
{
    db.deleteMovieById(req.params._id).then(() => {res.status(200).json({message:"Successfully deleted movie", data});})
    .catch(()=>{res.status(501).json({message:"Unsuccessfully deleted movie"})})
})