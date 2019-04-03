var express = require('express');
var app = express();

app.get('/hola', function (req, res) {
  res.json([
      {id:1,username:"somebody"},
      {id:2,username:"other somebody"}
  ])
});

app.listen(3001, function () {
  console.log('Example app listening on port 3001!');
});