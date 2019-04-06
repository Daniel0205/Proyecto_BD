import React, { Component } from 'react';

import './Registro.css';

class Registro extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user:this.props.user,
      cellphone: this.props.cellphone,
      password: '',
    };


    this.datosPersonales = this.datosPersonales.bind(this);
    this.getDatos = this.getDatos.bind(this);
    this.actualizarDatos = this.actualizarDatos.bind(this)
    this.enviarDatos = this.enviarDatos.bind(this)

  }

  componentDidMount(){
    if(this.props.tipo==='Registro' && this.props.user==="Conductor"){

      this.setState({ 
      cellphone: '',
      password: '',
      nombre: '',
      apellido: '',
      genero: "Select" ,
      direccion: '',
      placa: '',
      modelo: '',
      marca: '',
      baul: "Select2",
      fecha: "Select1",
      soat: '' });
    }
    if(this.props.tipo==='Registro' && this.props.user==="Usuario"){

      this.setState({ 
      cellphone: '',
      password: '',
      nombre: '',
      apellido: '',
      genero: "Select",
      direccion: ''})
    }

    if(this.props.tipo==='Actualizar'){this.getDatos();}

  }

  getDatos(){
    fetch("/getDatos", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        cellphone:this.state.cellphone,
        user:this.state.user
      })
    })
    .then(res => res.json())
    .then(res => this.setState(res[0]));
  }




  enviarDatos(event){
    event.preventDefault();
    // eslint-disable-next-line
    let ruta = "" , msj = "",callback="";
    if(this.props.tipo==='Actualizar'){
      ruta="/actualizarDatos"
      msj = "Datos"
      callback= "Menu-"+this.state.user
      
    }
    else{
      ruta ="/insertarUser"
      msj = "Usuario"
      callback = "Login"
    }
    

    fetch(ruta, {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state)
    })
    .then(res => res.json())
    .then(res => {
      if(res[0].bool){
        console.log(msj + " actualizados exitosamente")
      }
      else {console.log(msj +" sin actualizar")}});
      this.props.callback(callback);
  }

  actualizarDatos(event){

    switch (event.target.name){
      case 'cellphone':
        this.setState({
          cellphone:event.target.value
        });
        break;
      case 'nombre':
        this.setState({
          nombre:event.target.value
        })
      break;
      case 'apellido':
        this.setState({
          apellido:event.target.value
        })
      break;
      case 'password':
        this.setState({
          password:event.target.value
        })
      break;
      case 'genero':
        this.setState({
          genero:event.target.value
        })
      break;
      case 'direccion':
        this.setState({
          direccion:event.target.value
        })
      break;
      case 'placa':
        this.setState({
          placa:event.target.value
        })
      break;
      case 'modelo':
        this.setState({
          modelo:event.target.value
        })
      break;
      case 'marca':
        this.setState({
          marca:event.target.value
        })
      break;
      case 'baul':
        this.setState({
          baul:event.target.value
        })
      break;
      case 'year':
        this.setState({
          fecha:event.target.value
        })
      break;
      case 'soat':
        this.setState({
          soat:event.target.value
        })
      break;
      default:
      break;
    }
  }

  datosPersonales() { 
    // eslint-disable-next-line
    let campo = <input type="text" name="cellphone" placeholder='Celular*'onChange={this.actualizarDatos} value={this.state.cellphone}/>;
    if(this.props.tipo==='Actualizar'){      
      campo = <input type="text" name="cellphone" placeholder='Celular*' onChange={this.actualizarDatos} disabled value={this.state.cellphone}/>;
    }

    const x = 'datos-Personales'+ this.state.user
    return(
      <div id={x}>
        <h1>Datos-Personales</h1>
        {campo}<br></br> 
        <input type="password" name="password" placeholder='Password*' onChange={this.actualizarDatos} value={this.state.password}/><br></br>
        <input type="text" name="nombre" placeholder='Nombre(s)*'  onChange={this.actualizarDatos} value={this.state.nombre}/><br></br>
        <input type="text" name="apellido" placeholder='Apellido(s)*' onChange={this.actualizarDatos} value={this.state.apellido}/><br></br>
        <select name="genero" value ={this.state.genero} onChange={this.actualizarDatos} >
          <option value="Select" disabled>Selecciona un genero:</option>
          <option value="M">Masculino</option>
          <option value="F">Femenino</option>
          <option value="N">No Definido</option>
        </select><br></br>
        <input type="text" name="direccion" placeholder='Direccion De Residencia' onChange={this.actualizarDatos}  value={this.state.direccion}/><br></br>
      </div>);
  }

  render() {

    let boton= "Registrar Usuario";
    if(this.props.tipo==='Actualizar'){      
      boton = "Actualizar Datos";
    }

    switch(this.state.user){
      case 'Usuario':
        return(
          <div className='Registro'>
          <form className="form-Conductor" onSubmit={this.enviarDatos} >
            {this.datosPersonales()}
            <button>{boton}</button>
          </form>
          
          </div>);
      case 'Conductor':


        let allYears = [];
        for(let x = 0; x <= 39; x++) {
          allYears.push(2019 - x)
        }        
        const yearList = allYears.map((x) => {return(<option value={x} key={x}>{x}</option>)});
        
        console.log(this.state.baul)
        console.log(this.state.baul==="Select2")
        
        return (
          <div className='Registro'>
              <form className="form-Conductor" onSubmit={this.enviarDatos} >
                {this.datosPersonales()}
                <div>
                  <h1>Datos del Automovil</h1>
                  <input type="text" name="placa" placeholder='Placa*' value={this.state.placa} onChange={this.actualizarDatos}/><br></br>
                  <input type="password" name="modelo" placeholder='Modelo*'value={this.state.modelo} onChange={this.actualizarDatos}/><br></br>
                  <input type="text" name="marca" placeholder='Marca*'value={this.state.marca} onChange={this.actualizarDatos}/><br></br>
                  <select name="baul"  onChange={this.actualizarDatos} value ={this.state.baul}>
                    <option value="Select2" disabled>Selecciona un tipo de baul:</option>
                    <option value="G">Grande</option>
                    <option value="P">Pequeno</option>
                    <option value="N">No tiene</option>
                  </select><br></br>
                  <select name="year" value ={this.state.fecha} onChange={this.actualizarDatos}>
                    <option value="Select1" disabled>Selecciona una fecha de fabricacion:</option>
                    {yearList}
                  </select><br></br>
                  <input type="text" name="soat" placeholder='Soat'value={this.state.soat} onChange={this.actualizarDatos}/><br></br>
                </div>
                <p>(*) Campos Obligatorios</p>
                <button>{boton}</button>
              </form>
              
            </div>
        );
        
      default:     
          break;   
    }  
  }  
}

export default Registro;