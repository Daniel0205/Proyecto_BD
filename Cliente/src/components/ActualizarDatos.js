import React, { Component } from 'react';

import './Registro.css';

class ActualizarDatos extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      user:this.props.user,
      cellphone:this.props.cellphone,
      password:''
    };

    this.datosPersonales = this.datosPersonales.bind(this);
    this.getDatos = this.getDatos.bind(this);
    this.actualizarDatos = this.actualizarDatos.bind(this)
    this.enviarDatos = this.enviarDatos.bind(this)

    this.getDatos();
  }

  actualizarDatos(event){

    switch (event.target.name){
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
    fetch("/actualizarDatos", {
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
        console.log("Datos actualizados exitosamente")
      }
      else {console.log("Datos sin actualizar")}});
  }

  datosPersonales() { 

    const x = 'datos-Personales'+ this.state.user
    return(
      <div id={x}>
        <h1>Datos-Personales</h1>
        <input type="text" name="cellphone" placeholder='Celular*'disabled value={this.state.cellphone}/><br></br>
        <input type="password" name="password" placeholder='Password*' value={this.state.password}/><br></br>
        <input type="text" name="nombre" placeholder='Nombre(s)*' value={this.state.nombre}/><br></br>
        <input type="text" name="apellido" placeholder='Apellido(s)*'value={this.state.apellido}/><br></br>
        <select name="genero" defaultValue ={this.state.genero}>
          <option value="Select" disabled>Selecciona un genero:</option>
          <option value="M">Masculino</option>
          <option value="F">Femenino</option>
          <option value="N">No Definido</option>
        </select><br></br>
        <input type="text" name="direccion" placeholder='Direccion De Residencia' value={this.state.direccion}/><br></br>
      </div>);
  }

  render() {

    switch(this.state.user){
      case 'Usuario':
        return(
          <div className='Registro'>
          <form className="form-Conductor" onSubmit={this.enviarDatos} name='login' onChange={this.actualizarDatos}>
            {this.datosPersonales()}
            <button>Actualizar Datos</button>
          </form>
          
          </div>);
      case 'Conductor':
        let allYears = [];
        for(let x = 0; x <= 39; x++) {
          allYears.push(2019 - x)
        }
        
        const yearList = allYears.map((x) => {return(<option value={x} key={x}>{x}</option>)});
        
        return (
          <div className='Registro'>
              <form className="form-Conductor" onSubmit={this.enviarDatos} name='login' onChange={this.actualizarDatos}>
                {this.datosPersonales()}
                <div>
                  <h1>Datos del Automovil</h1>
                  <input type="text" name="placa" placeholder='Placa*' value={this.state.placa}/><br></br>
                  <input type="password" name="modelo" placeholder='Modelo*'value={this.state.modelo}/><br></br>
                  <input type="text" name="marca" placeholder='Marca*'value={this.state.marca}/><br></br>
                  <select name="baul" defaultValue ={this.state.baul}>
                    <option value="Select2" disabled>Selecciona un tipo de baul:</option>
                    <option value="G">Grande</option>
                    <option value="P">Pequeno</option>
                    <option value="N">No tiene</option>
                  </select><br></br>
                  <select name="year" defaultValue ={this.state.fecha}>
                    <option value="Select1" disabled>Selecciona una fecha de fabricacion:</option>
                    {yearList}
                  </select><br></br>
                  <input type="text" name="soat" placeholder='Soat'value={this.state.soat}/><br></br>
                </div>
                <p>(*) Campos Obligatorios</p>
                <button>Actualizar Datos</button>
              </form>
              
            </div>
        );
        
      default:     
          break;   
    }  
  }  
}

export default ActualizarDatos;