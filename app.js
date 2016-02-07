var express = require('express'); //The Express Node module simplifies setting up Node into just a few commands - it's really simple
var app = express();
var http = require('http').Server(app); //This is a necessary and standard statement to start the app

app.use(express.static('www')); //This tells the Express App where the web files are

app.get('/', function(req, res){ //This sets index.html to the homepage
    res.sendFile(__dirname + '/www/index.html');
});

http.listen(8000, function(){
    console.log('listening on *:8000');
});





