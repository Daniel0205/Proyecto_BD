var express = require("express");
var app = express();
/*
var pgp = require('pg-promise')(/*options)
var db = pgp('postgres://postgres:1234@localhost:5432/NotThatEasyTaxi')
*/

const Pool = require('pg-pool');

var config = {
  user: 'postgres', //env var: PGUSER
  database: 'NotThatEasyTaxi', //env var: PGDATABASE
  password: '1234', //env var: PGPASSWORD
  host: '127.0.0.1', // Server hosting the postgres database
  port: 5432, //env var: PGPORT
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
};

const pool = new Pool(config);
pool.on('error', function (err, client) {
  // if an error is encountered by a client while it sits idle in the pool
  // the pool itself will emit an error event with both the error and
  // the client which emitted the original error
  // this is a rare occurrence but can happen if there is a network partition
  // between your application and the database, the database restarts, etc.
  // and so you might want to handle it and at least log it out
  console.error('idle client error', err.message, err.stack)
})


//export the query method for passing queries to the pool
function query(text, values, callback) {
  console.log('query:', text, values);
  return pool.query(text, values, callback);
};

// the pool also supports checking out a client for
// multiple operations, such as a transaction
function connect(callback) {
  return pool.connect(callback);
};

var bodyParser = require("body-parser"); // middleware  to handle HTTP POST request
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // to support URL-encoded bodies


app.post("/login", function (req, res) {
  if (req.body.Username == "admin" && req.body.Password == "admin") {
    res.json([{nombre:"daniel", user:"Usuario",login: true }]);
  }

	connect(function(err, client, done) {
    if(err) {
        return console.error('error fetching client from pool', err);
        }
    //use the client for executing the query
     console.log('SELECT nombres FROM cliente WHERE celular = '+req.body.Username+' and contrasena = crypt(\''
                +req.body.Password+'\',contrasena);');
     client.query('SELECT nombres FROM cliente WHERE celular = '+req.body.Username+' and contrasena = crypt(\''
     +req.body.Password+'\',contrasena);', 
    function(err, result) {
      //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
      done(err);


      if(err) {
          return console.error('error running query', err);
      }

      res.json([{nombre:result.rows[0].nombres, user:"Usuario",login:true}]);
      //output: 1
    });
  });
/*
  db.one('SELECT * from conductor')
  .then(function (data) {
    console.log('DATA:', data)
  })
  .catch(function (error) {
    console.log('ERROR:', error)
  })*/

  console.log(req.body)
});

app.post("/favoritos", function (req, res) {

  let str ='SELECT  ST_X(ST_AsText(id_pos)) as longitud, ST_Y(ST_AsText(id_pos)) as latitud ,direccion '
  +'FROM cliente NATURAL JOIN favoritos NATURAL JOIN posicion WHERE celular = ' + req.body.Username;

  connect(function(err, client, done) {
    if(err) {
        return console.error('error fetching client from pool', err);
        }
    //use the client for executing the query
     console.log(str);
     client.query(str,(err, result)=> {
      //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
      done(err);

      if(err) {
          res.json([{favoritos:[]}]);
          return console.error('error running query', err);
      }
      else{
        res.json([{favoritos:result.rows}]);
      }
    });
  });

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

  let str = 'SELECT * from conductor NATURAL JOIN posicion where celular=hallarConductor(\'POINT('+
  req.body.longitudOrigen+' '+req.body.latitudOrigen+')\') and posicion_actual=id_pos';

  connect(function(err, client, done) {
    if(err) {
        return console.error('error fetching client from pool', err);
        }
    //use the client for executing the query
     console.log(str)
     client.query(str,(err, result)=> {
      //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
      done(err);

      if(err) {
        res.json([{encontrado: false }]);
      
        return console.error('error running query', err);
      }
      else{
        res.json([{nombreConductor:result.rows[0].nombres,
          placa:result.rows[0].placa,
          celularConductor:result.rows[0].celular,
          estrellas:3,
          posicion:result.rows[0].direccion,
          encontrado: true }]);
      }
      
    });
  });
  console.log(req.body)
});

app.post("/distancia", function (req, res) {

  let str = 'SELECT distancia(\'POINT('+req.body.longitudOrigen+' '+req.body.latitudOrigen+
  ')\',\'POINT('+req.body.longitudDestino+' '+req.body.latitudDestino+')\')';

  connect(function(err, client, done) {
    if(err) {
        return console.error('error fetching client from pool', err);
        }
    //use the client for executing the query
     console.log(str)
     client.query(str,(err, result) =>{
      //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
      done(err);

      if(err) {
          return console.error('error running query', err);
      }
      else{
        res.json([{distancia:result.rows[0].distancia}]);
      }
    });
  });

  console.log(req.body)
});

app.post("/finalizarViaje", function (req, res) {

  let str = 'SELECT insertarPunto(\'POINT('+req.body.longitudOrigen+' '+req.body.latitudOrigen+')\',\''+req.body.descripcionOrigen+'\')';
  connect(function(err, client, done) {
    if(err) {
        return console.error('error fetching client from pool', err);
        }
    //use the client for executing the query
     console.log(str)
     client.query(str,(err, result) =>{
      //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
      console.log(result)
    });

    str = 'SELECT insertarPunto(\'POINT('+req.body.longitudDestino+' '+req.body.latitudDestino+')\',\''+req.body.descripcionDestino+'\')';
    console.log(str)
    client.query(str,(err, result) =>{
      //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
      console.log(result)
    });

    str = 'INSERT INTO viajes(celular_cliente,celular_conductor,id_pos_origen,id_pos_destino,fecha,pagado,calificacion)'+ 
          'VALUES ('+req.body.cellphone+','+req.body.celularConductor+',\'POINT('+req.body.longitudOrigen+' '+req.body.latitudOrigen+
          ')\',\'POINT('+req.body.longitudDestino+' '+req.body.latitudDestino+')\',current_Date,false,'+req.body.calificacion+') RETURNING *';

    console.log(str)
    client.query(str,(err, result) =>{

      console.log(err)
      console.log(result)
      //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
      done(err);

    });

    res.json([{bool:true}]);

  });

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
