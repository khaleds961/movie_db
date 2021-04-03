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
];


app.listen(port, function () {
    console.log(`Example app listening on port http://localhost:${port}.`);
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


//Step 6
app.get('/movies/read/by-date', function (request, res) {
    const mo = movies.sort((a, b) => a.year - b.year);
    res.status(200).send(mo);
});

app.get('/movies/read/by-rating', function (request, res) {
    const mo = movies.sort((a, b) => b.rating- a.rating );
    res.status(200).send(mo);
});

app.get('/movies/read/by-title', function (request, res) {
    const mo = movies.sort((a, b) => a.title.localeCompare(b.title));
    res.status(200).send(mo);
});


//Step 7
app.get('/movies/read/id/:id', function (request, res) {
    if(request.params.id<=0 || request.params.id>movies.length){
        {res.status(404).send("the movie" +request.params.id+ " does not exist");}
    }else{
        res.status(200).send(movies[request.params.id-1]);
    }
    
});

//Step 8 ADD
app.post('/movies', function (request, res) {
    var t = request.query.title;
    var y = request.query.year;
    var r = request.query.rating;
    if(t=="" || y=="" || y.length != 4 || isNaN(y) ){
        res.status(403).send("you cannot create a movie without providing a title and a year");
    }else{
     if(r == "" || r == undefined){
    r=4;
}
    }

    movies.push({title:t,year:y,rating:r});
    res.send(movies);
});

//Step 9 DELETE
app.delete('/movies/:id', function (request, res) {
    if(request.params.id<1 || request.params.id>movies.length){
        {res.status(404).send("the movie" +request.params.id+ " does not exist");}
    }else{
        movies.splice(request.params.id-1,1);
        res.send(movies);
    }
    
});

//Step 10 UPDATE
app.put('/movies/:id', function (request, res) {
    var id = request.params.id;
    if(id < 1|| id > movies.length){
        res.status(404).send("This Movie" +id+ "Dosen't Exist.");
    }
    else{
        var movie= movies[id-1];
    }
    var arrv = Object.values(movie);
    var t = request.query.title;
    var y = request.query.year;
    var r = request.query.rating;
    if((t=="" || t==undefined ) && (y == "" || y== undefined) && (r=="" || r==undefined) ){
        res.status(404).send("Nothing to Update.");
    }else{
        (t==""|| t==undefined)?movie['title']=arrv[0]:movie['title']=t;
        (y==""|| y==undefined)?movie['year']=arrv[1]:movie['year']=parseInt(y);
        (r==""|| r==undefined)?movie['rating']=arrv[2]:movie['rating']=parseInt(r);
        res.send(movies);
    }
    
});


