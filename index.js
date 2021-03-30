const { request } = require('express');
var express = require('express');
const { reset } = require('nodemon');
var app = express();
var port = 3000;
const d = new Date();
var TIME = d.getHours() + ":" + d.getSeconds();

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
})

app.get('/search?s=:search', function (request, res) {
    if(request.query.s==""){
        res.status(500).send("you have to provide a search");
    }else{
        res.status(200).send("ok"+request.query.s);
    }
    
})