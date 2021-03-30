const { request } = require('express');
var express = require('express');
const { reset } = require('nodemon');
var app = express();
var port = 3000;
const d = new Date();
var TIME = d.getHours() + ":" + d.getSeconds();
const movies = [
    { title: 'Jaws', year: 1975, rating: 8 },
    { title: 'Avatar', year: 2009, rating: 7.8 },
    { title: 'Brazil', year: 1985, rating: 8 },
    { title: 'الإرهاب والكباب‎', year: 1992, rating: 6.2 }
]

app.listen(port, function () {
    console.log(`Example app listening on port ${port}.`);
});
app.get("/", function (request, res) {
    res.send("ok");
});

app.get("/test", function (request, res) {
    res.status(200).send("ok");
});

app.get("/time", function (request, res) {
    let t = TIME;
    res.status(200).send(t);
});

app.get('/hello/:id', function (request, res) {
    res.status(200).send("Hello"+request.query.id);
});

app.get('/search?s=:search', function (request, res) {
    if(request.query.s==""){
        res.status(500).send("you have to provide a search");
    }else{
        res.status(200).send("ok"+request.query.s);
    }
    
});

app.get('/movies/create', function (request, res) {
    res.status(200).send("Create");
});
app.get('/movies/read', function (request, res) {
    var m=movies;
    res.status(200).send(m);
});
app.get('/movies/update', function (request, res) {
    res.status(200).send("Update");
});
app.get('/movies/delete', function (request, res) {
    res.status(200).send("Delete");
});