var express = require("express");
var app = express();

var bodyParser = require("body-parser"); // middleware  to handle HTTP POST request
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // to support URL-encoded bodies


app.post("/hola", function (req, res) {
  if (req.body.Username == "admin" && req.body.Password == "admin") {
    res.json([{ usuario: "admin", login: true }]);
  }
  console.log(req.body)
});


app.listen(3001, function () {
  console.log("Example app listening on port 3001!");
});
