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

  let str = 'SELECT login('+req.body.Username+',\''+req.body.Password+'\')';
	connect(function(err, client, done) {
    if(err) {
        return console.error('error fetching client from pool', err);
        }
    //use the client for executing the query
     console.log(str);
     client.query(str, (err, result)=> {
      //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
      done(err);

      if(err) {
          return console.error('error running query', err);
      }
      console.log(result)
      if(result.rows[0].login===" "){
        res.json([{login:false}]);
      }
      else{
        res.json([{ user:result.rows[0].login,login:true}]);
      }
      
      //output: 1
    });
  });

  console.log(req.body)
});

app.post("/favoritos", function (req, res) {

  let str ='SELECT DISTINCT ST_X(ST_AsText(id_pos)) as longitud, ST_Y(ST_AsText(id_pos)) as latitud ,direccion '
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



app.post("/AddFavoritos", function (req, res) {

  let str = 'SELECT insertarPunto(\'POINT('+req.body.longitud+' '+req.body.latitud +')\',\''+req.body.descripcion+'\')';

  connect(function(err, client, done) {
    if(err) {
        return console.error('error fetching client from pool', err);
        }
    //use the client for executing the query
     console.log(str)
     client.query(str,(err, result)=> {
        //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
        if(err) {
          res.json([{bool: false }]);
          return console.error('error running query', err);
        }
      })

      str='INSERT INTO favoritos VALUES ('+req.body.cellphone+',\'POINT('+req.body.longitud+' '+req.body.latitud+')\')';    
      console.log(str)
      client.query(str,(err, result)=> {
          //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
          done(err);
          if(err) {
            res.json([{bool: false }]);
            return console.error('error running query', err);
          }
          else{
            res.json([{bool: true }]);
          }
      }); 
  });
  console.log(req.body)
});



app.post("/consultarViajes", function (req, res) {

 
  connect(function(err, client, done) {
    if(err) {
        return console.error('error fetching client from pool', err);
    }

    let str='';

    if(req.body.user==='Usuario'){
      str='select id_viaje as id, conductor.nombres as nombreChofer,to_char(fecha, \'DD-MM-YYYY\') as fecha,pagado,calificacion, '+
      'distancia(ST_AsText(id_pos_origen),ST_AsText(id_pos_destino)) as kmrecorridos, '+
      'origen.direccion as descripcionOrigen,destino.direccion as descripcionDestino '+
      'from viajes, posicion as origen, posicion as destino, conductor '+
      'where id_pos_origen=origen.id_pos AND id_pos_destino=destino.id_pos '+
      'AND celular_conductor=conductor.celular AND viajes.celular_cliente = '+ req.body.cellphone;      
    }
    else{
      str='select distinct viajes.id_viaje as id, cliente.nombres as nombreCliente,to_char(fecha, \'DD-MM-YYYY\') as fecha,calificacion, cobrado,'+
      'distancia(ST_AsText(id_pos_origen),ST_AsText(id_pos_destino)) as kmRecorridos,'+
      'origen.direccion as descripcionOrigen,destino.direccion as descripcionDestino '+
      'from posicion as origen, posicion as destino, cliente,viajes natural join conductor_viajes '+
      'where id_pos_origen=origen.id_pos AND id_pos_destino=destino.id_pos '+
      'AND viajes.celular_cliente=cliente.celular AND viajes.celular_conductor = '+ req.body.cellphone;
    }
    //use the client for executing the query
     console.log(str)
     client.query(str,(err, result)=> {
      //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
      done(err);

      if(err) {
        res.json([]);
      
        return console.error('error running query', err);
      }
      else{

        res.json(result.rows);
      }
      
    });
  });
  

  console.log(req.body)
});


app.post("/encontrarConductor", function (req, res) {

  let str = 'SELECT * from (conductor natural join promestrellas), posicion WHERE conductor.posicion_Actual=posicion.id_pos AND '+
  'celular=hallarConductor(\'POINT('+req.body.longitudOrigen+' '+req.body.latitudOrigen+')\') and posicion_actual=id_pos';

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
          estrellas:parseInt(result.rows[0].estrellas),
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

app.post("/PagarCobrar", function (req, res) {

  
  let str ='';
  if(req.body.tipo=="Conductor"){
    str='UPDATE conductor_viajes SET cobrado=true WHERE cobrado=false AND celular_conductor='+req.body.Username ;
  }
  else {
    str='UPDATE viajes SET pagado=true WHERE pagado=false AND celular_cliente='+req.body.Username;
  }

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
        res.json([{bool:false}]);
        return console.error('error running query', err);
      }
      else{
        res.json([{bool:true}]);
      }
    });
  });

  console.log(req.body)
});


app.post("/KmPagarCobrar", function (req, res) {

  
  let str ='';
  if(req.body.tipo=="Conductor"){
    str='SELECT * FROM kmConductorCobrar WHERE conductor='+req.body.Username ;
  }
  else {
    str='SELECT * FROM kmClientePagar WHERE cliente='+req.body.Username;
  }

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
        res.json([{bool:false}]);
        return console.error('error running query', err);
      }
      else{
        if(result.rows[0].km===null){res.json([{bool:true, km:0}]);}
        else{res.json([{bool:true, km:result.rows[0].km}])}
      }
    });
  });

  console.log(req.body)
});

app.post("/KmUsados", function (req, res) {

  
  let str ='';
  if(req.body.tipo=="Conductor"){
    str='SELECT * FROM kmConductor WHERE conductor='+req.body.Username ;
  }
  else {
    str='SELECT * FROM kmCliente WHERE cliente='+req.body.Username;
  }

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
        res.json([{bool:false}]);
        return console.error('error running query', err);
      }
      else{
        if(result.rows[0].km===null){res.json([{bool:true, km:0}]);}
        else{res.json([{bool:true, km:result.rows[0].km}])}
      }
    });
  });

  console.log(req.body)
});


app.post("/insertarUser", function (req, res) {

  
  let str ='';

  connect(function(err, client, done) {
    if(err) {
        return console.error('error fetching client from pool', err);
        }

      if(req.body.user=="Conductor"){
        let coche='INSERT INTO taxi VALUES (\''+req.body.placa+'\',\''+req.body.modelo+'\',\''+req.body.marca+'\',\''
            +req.body.baul+'\','+req.body.fecha+','+req.body.soat+')';

        client.query(coche);        

        str='INSERT INTO conductor VALUES ('+req.body.cellphone+',crypt(\''+req.body.password
            +'\', gen_salt(\'md5\')),\''+req.body.nombre+'\',\''+req.body.apellido+'\',\''
            +req.body.genero+'\',\''+req.body.placa+'\',false,null)';
      }
      else {
        str='INSERT INTO cliente VALUES ('+req.body.cellphone+',crypt(\''+req.body.password
            +'\', gen_salt(\'md5\')),\''+req.body.nombre+'\',\''+req.body.apellido+'\',\''
            +req.body.genero+'\','+req.body.tarjeta+',\''+req.body.direccion+'\')';
      }
      
    //use the client for executing the query
     console.log(str)
     client.query(str,(err, result) =>{

      //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
      done(err);

      if(err) {
        res.json([{bool:false}]);
        return console.error('error running query', err);
      }
      else{
        res.json([{bool:true}]);
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
     client.query(str);

    str = 'SELECT insertarPunto(\'POINT('+req.body.longitudDestino+' '+req.body.latitudDestino+')\',\''+req.body.descripcionDestino+'\')';
    console.log(str)
    client.query(str);

    str = 'INSERT INTO viajes(celular_cliente,celular_conductor,id_pos_origen,id_pos_destino,fecha,pagado,calificacion)'+ 
          'VALUES ('+req.body.cellphone+','+req.body.celularConductor+',\'POINT('+req.body.longitudOrigen+' '+req.body.latitudOrigen+
          ')\',\'POINT('+req.body.longitudDestino+' '+req.body.latitudDestino+')\',current_Date,false,'+req.body.calificacion+') RETURNING *';

    console.log(str)
    client.query(str,(err, result) =>{
      //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
      done(err);
      res.json([{bool:true}]);

    });   

  });

  console.log(req.body)
  console.log("Viaje guardado");
});


app.post("/reporte", function (req, res) {

  
  let str = 'SELECT insertarPunto(\'POINT('+req.body.longitud+' '+req.body.latitud+')\',\''+req.body.descripcion+'\')';

  connect(function(err, client, done) {
    if(err) {
        return console.error('error fetching client from pool', err);
        }
    //use the client for executing the query
     
     if(req.body.disponible!=='Ocupado'){
      console.log(str)
       client.query(str);
     }

    if(req.body.disponible==='Ocupado'){str = 'UPDATE conductor SET disponibilidad=false  WHERE celular='+req.body.cellphone}
    else {str = 'UPDATE conductor SET disponibilidad=true, posicion_actual=\'POINT('+req.body.longitud+' '+req.body.latitud+')\' WHERE celular='+req.body.cellphone}

    client.query(str,(err, result) =>{
      console.log(str)
      //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
      done(err);

      if(err) {
        res.json([{bool:false}]);
        return console.error('error running query', err);
      }
      else{
        res.json([{bool:true}]);
      }
    });
  });

  console.log(req.body)

  console.log("Estado actualizado");
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
