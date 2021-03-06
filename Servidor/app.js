
////////////////////////////////////////////
///////////MODULOS  IMPORTADOS//////////////
////////////////////////////////////////////
var check = require('./validaciones.js')();
var express = require("express");
var app = express();

const Pool = require('pg-pool');

//////////////////////////////////////////////////////
/////CONFIGURACION DE LA PISCINA DE USUARIOS//////////
//////////////////////////////////////////////////////
var config = {
  user: 'postgres', //env var: PGUSER
  database: 'NotThatEasyTaxi', //env var: PGDATABASE
  password: '1234', //env var: PGPASSWORD
  host: 'db', // Server hosting the postgres database
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
///////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////
///////////////////LOGIN////////////////////
////////////////////////////////////////////

//Respuesta de la peticion del login
app.post("/login", function (req, res) {

  if(validacionLogin(req.body)){
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
        if(result.rows[0].login===" "){
          res.json([{login:false}]);
        }
        else{
          res.json([{ user:result.rows[0].login,login:true}]);
        }
        
      });
    });
  }
  else{
    res.json([{login:false}]);
  }
});
///////////////////////////////////////////////////////////////////////////////////////////////////////



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////QUERYS Y CONSULTAS A LA BASE DE DATOS/////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Respuesta de la peticion de todos los puntos favoritos de un determinado usuario
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

});


//Agrega un punto favorito y lo relaciona con un cliente en la base de datos 
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
});


//Consulta y envia los viajes realizados por un determinado conductor o por un cliente a el Front-end
app.post("/consultarViajes", function (req, res) {

 
  connect(function(err, client, done) {
    if(err) {
        return console.error('error fetching client from pool', err);
    }

    let str='';

    if(req.body.user==='Usuario'){
      str='select id_viaje as id, conductor.nombres as nombreChofer,to_char(fecha, \'DD-MM-YYYY\') as fecha,pagado,calificacion, '+
      'ROUND(cast(distancia(ST_AsText(id_pos_origen),ST_AsText(id_pos_destino))as numeric),2) as kmrecorridos, '+
      'origen.direccion as descripcionOrigen,destino.direccion as descripcionDestino '+
      'from viajes, posicion as origen, posicion as destino, conductor '+
      'where id_pos_origen=origen.id_pos AND id_pos_destino=destino.id_pos '+
      'AND celular_conductor=conductor.celular AND viajes.celular_cliente = '+ req.body.cellphone;      
    }
    else{
      str='select id_viaje as id, conductor.nombres as nombreChofer,to_char(fecha, \'DD-MM-YYYY\') as fecha,pagado,'+
      'calificacion, ROUND(cast(distancia(ST_AsText(id_pos_origen),ST_AsText(id_pos_destino))as numeric),2) as kmrecorridos, '+
      'origen.direccion as descripcionOrigen,destino.direccion as descripcionDestino from viajes, posicion as origen, '+
      'posicion as destino, conductor where id_pos_origen=origen.id_pos AND id_pos_destino=destino.id_pos '+
      'AND celular_conductor=conductor.celular AND viajes.celular_cliente = '+ req.body.cellphone;
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
});

//Envia la informacion del cliente mas cercano a un punto 
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
        let estrellas = result.rows[0].estrellas
        if(result.rows[0].estrellas===null) estrellas=0

        res.json([{nombreConductor:result.rows[0].nombres,
          placa:result.rows[0].placa,
          celularConductor:result.rows[0].celular,
          estrellas:parseInt(estrellas),
          posicion:result.rows[0].direccion,
          encontrado: true }]);
      }
      
    });
  });
});

//Consulta y envia la distacia entre dos puntos dados 
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
        res.json([{distancia:result.rows[0].distancia.toFixed(2)}]);
      }
    });
  });
});

//Cambia todos los viajes realizados hasta el momento de un conductor o un cliente a estado cobrado y pagado respectivamente
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
});

//Consulta los km que tiene para cobrar y pagar un usuario conductor o un usuario cliente en la base de datos
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
});

//Consulta los kilometros usados o transportados por un usuario o un cliente 
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
});

//Ingresa un nuevo usuario en la base de datos
app.post("/insertarUser", function (req, res) {

  if(validacionActualizar(req.body)){
  
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
  }else{
    res.json([{bool:false}]);
  }
});



//Almacena un nuevo viaje en la base de datos, junto con sus respectivos puntos de origen y destino
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
});

//Actualiza el estado actual de un usuario conductor 
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
});

//Envia la informacion de todos los autos que no estan en uso actualmente en la base de datos
app.post("/getAutos", function (req, res) {

  
  let str = 'select placa,modelo,marca,baul,ano as fecha,soat from taxi where placa not in '+
            '(select placa from taxi natural join conductor where disponibilidad=true '+
            'and not conductor.celular = '+req.body.cellphone+')';

  connect(function(err, client, done) {
    if(err) {
        return console.error('error fetching client from pool', err);
        }
    //use the client for executing the query

    client.query(str,(err, result) =>{
      console.log(str)
      //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
      done(err);

      if(err) {
        res.json([{autosDisponibles:[]}]);
        return console.error('error running query', err);
      }
      else{
        res.json([{autosDisponibles:result.rows}]);
      }
    });
  });
});

//Actualiza los datos de un determinado usuario en la base de datos
app.post("/actualizarDatos", function (req, res) {

  if(validacionActualizar(req.body)){
    let str='',psw='';

    if(req.body.password!==''){
      psw=', contrasena=crypt(\''+req.body.password+'\', gen_salt(\'md5\'))';
    } 
    if(req.body.user==='Usuario'){
      str ='UPDATE cliente SET nombres=\''+req.body.nombre+'\', apellidos=\''+req.body.apellido+'\', genero=\''+req.body.genero+'\','+
          'tarjeta_credito='+req.body.tarjeta+',direccion_residencia=\''+req.body.direccion+'\''+ psw+' where celular='+req.body.cellphone;
    }
    else{
      str='UPDATE conductor SET nombres=\''+req.body.nombre+'\', apellidos=\''+req.body.apellido+'\', genero=\''+req.body.genero+
      '\', placa=\''+req.body.placa+'\''+ psw+' where celular='+req.body.cellphone;
    }


    connect(function(err, client, done) {
      if(err) {
          return console.error('error fetching client from pool', err);
          }
      //use the client for executing the query

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
  }
  else{
    res.json([{bool:false}]);
  }
});


//Retorna los datos relacionados a un determinado usuario
app.post("/getDatos", function (req, res) {

  let str

  if(req.body.user==='Usuario'){
    str ='select nombres as nombre, apellidos as apellido, genero, tarjeta_credito as tarjeta, '+
         'direccion_residencia as direccion from cliente where celular= '+req.body.cellphone;
  }
  else{

    str='select nombres as nombre, apellidos as apellido, genero, placa, modelo,marca,'+
        'baul,ano as fecha,soat from conductor natural join taxi where celular = '+req.body.cellphone;
  }


  connect(function(err, client, done) {
    if(err) {
        return console.error('error fetching client from pool', err);
        }
    //use the client for executing the query

    client.query(str,(err, result) =>{
      console.log(str)
      //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
      done(err);

      if(err) {
        res.json([{autosDisponibles:[]}]);
        return console.error('error running query', err);
      }
      else{
        res.json([result.rows[0]]);
      }
    });
  });
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////


/////////////////////////////////////////////////////
////////////CONFIGURACION DEL PUERTO ////////////////
/////////////////////////////////////////////////////
app.listen(3001, function () {
  console.log("Servidor escuchando en el puerto 3001!");
});
////////////////////////////////////////////////////