const { request } = require('express');
var express = require('express');
const { reset } = require('nodemon');
var app = express();
var port =3000;

app.listen(port, function () {
    console.log(`Example app listening on port ${port}.`);
});
app.get("/", function(request,res){
res.send("ok");
});