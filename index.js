var express = require('express');
var app = express();
var i = 0;
console.log()
var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})


app.get('/', function (req, res) {
   console.log("Got a GET request for the homepage");
    res.sendFile('index.html' , { root : __dirname});


})

app.post('/test', function (req, res) {
   console.log("Got a POST request for the homepage");
   i++;
   res.send('t_'+i);
})

app.get('/list_user', function (req, res) {
   console.log("Got a GET request for /list_user");
   res.send('Page Listing');
})
