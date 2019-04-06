import React, { Component } from 'react';

import Mapa from './Mapa';

class Reporte extends Component {
  constructor(props) {
    super(props);
    this.state = {
        disponible:"none",
        longitud:'',
        latitud:''
    };  

    this.handleSelect = this.handleSelect.bind(this)
    this.retornarMapa = this.retornarMapa.bind(this)
    this.handleClick  = this.handleClick.bind(this) 
    this.cancelar  = this.cancelar.bind(this) 
    this.mostrarBoton= this.mostrarBoton.bind(this)
  }


  handleSelect(event){
      this.setState({
          disponible:event.target.value
      })
  }


  handleClick(){
    fetch("/reporte", {
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
        console.log("Reporte realizado exitosamente")
      }
      else {console.log("Reporte sin terminar")}
      
      this.props.callback('Menu-Conductor');});
  }

  cancelar(){
    this.props.callback('Menu-Conductor');
  }


  retornarMapa(){
      if(this.state.disponible==="Disponible"){
          return (
          <div className='mapa'>
            <h2>Porfavor informe de su ubicacion actual</h2>
            <Mapa/>
          </div>)
      }
  }

  mostrarBoton(){
    if(this.state.disponible!=='none'){
      return(<button onClick={this.handleClick}>Reportar</button>);
    }
  }

  render() {
    return (
      <div className="User-Mapa">
        <h2>Estado Actual:</h2>
        <select name="estado" defaultValue ="Select" onChange={this.handleSelect}>
          <option value="Select" disabled>Selecciona su estado actual:</option>
          <option value="Ocupado" >Ocupado </option>
          <option value="Disponible">Disponible </option>
        </select><br></br>
        {this.retornarMapa()}   
        {this.mostrarBoton()}     
        <button onClick={this.cancelar}>Cancelar</button>
      </div>
    ); 
  }
}
export default Reporte;