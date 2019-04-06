var express = require("express");
var app = express();

var bodyParser = require("body-parser"); // middleware  to handle HTTP POST request
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // to support URL-encoded bodies


app.post("/login", function (req, res) {
  if (req.body.Username == "admin" && req.body.Password == "admin") {
    res.json([{nombre:"daniel", user:"Usuario",login: true }]);
  }
  else{
    res.json([{login: false }]);
  }
  console.log(req.body)
});

app.post("/favoritos", function (req, res) {

  res.json([{favoritos:
                [{longitud: 85412,
                latitud: 4561541,
                descripcion: "Univalle1"},
                {longitud: 8546,
                latitud: 78945,
                descripcion: "Univalle2"},
                {longitud: -45112,
                latitud: -4561541,
                descripcion: "Univalle3" }]}]);

  console.log(req.body)
});

app.post("/consultarViajes", function (req, res) {

  if(req.body.user==='Usuario'){
    res.json([{viajes:
      [{id:1,
      nombreChofer:"nsasgfsdf",
      descripcionOrigen: "Univalle1",
      descripcionDestino: "Univalle2",
      fecha:"2015/05/2015",
      pagado:true,
      califiacion:2,
      kmRecorridos:25,
      },{id:2,
      nombreChofer:"qwrwtertew",
      descripcionOrigen: "Univalle2",
      descripcionDestino: "Univalle3",
      fecha:"2015/05/2015",
      pagado:false,
      califiacion:3,
      kmRecorridos:155}]}]);
  }
  else{
    res.json([{viajes:
      [{id:1,
      nombreCliente:"--------",
      descripcionOrigen: "Univalle1",
      descripcionDestino: "Univalle2",
      fecha:"2015/05/2015",
      cobrado:true,
      califiacion:2,
      kmRecorridos:25,
      },{id:2,
      nombreCliente:"-----",
      descripcionOrigen: "Univalle2",
      descripcionDestino: "Univalle3",
      fecha:"2015/05/2015",
      cobrado:false,
      califiacion:3,
      kmRecorridos:155}]}]);


  }

  console.log(req.body)
});


app.post("/encontrarConductor", function (req, res) {

  res.json([{nombreConductor:"Juan",
            placa:"ABC 1234",
            celularConductor: 3156661104,
            estrellas:3,
            posicion:"No se sabe",
            encontrado: true }]);


  console.log(req.body)
});

app.post("/distancia", function (req, res) {

  res.json([{distancia:19}]);


  console.log(req.body)
});

app.post("/finalizarViaje", function (req, res) {

  res.json([{bool:true}]);

  console.log(req.body)
  console.log("Viaje guardado");
});


app.post("/reporte", function (req, res) {

  res.json([{bool:true}]);

  console.log(req.body)

  console.log("Estado actualizado");
});

app.post("/insertarUser", function (req, res) {

  res.json([{bool:true}]);

  console.log(req.body)

  console.log("Usuario insertado");
});


app.post("/actualizarDatos", function (req, res) {

  res.json([{bool:true}]);

  console.log(req.body)

  console.log("Datos actualizados");
});

app.post("/getDatos", function (req, res) {

  if(req.body.user==='Usuario'){
    res.json([{
      nombre:'Daniel Alejandro',
      apellido:'Diaz Ocampo',
      genero:'M',
      direccion:'enrique segoviano :v',
      tarjeta:451458745
    }]);
  }
  else{
    res.json([{
      nombre:'Daniel Alejandro',
      apellido:'Diaz Ocampo',
      genero:'M',
      placa:'ABCD 1234',
      modelo:2015,
      marca:'mazda',
      baul:'G',
      fecha:2015,
      soat:"nose"
    }]);
  }
  

  console.log(req.body)

  console.log("Datos Enviados");
});

app.listen(3001, function () {
  console.log("Example app listening on port 3001!");
});
