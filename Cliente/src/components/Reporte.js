import React, { Component } from 'react';

import Mapa from './Mapa';

class Reporte extends Component {
  constructor(props) {
    super(props);
    this.state = {
        disponible:"none"
    };  

    this.handleSelect = this.handleSelect.bind(this)
    this.retornarMapa = this.retornarMapa.bind(this) 
  }


  handleSelect(event){
      this.setState({
          disponible:event.target.value
      })
  }


  retornarMapa(){
      if(this.state.disponible==="Disponible"){
          return (
          <div className='mapa'>
            <h2>Porfavor informe de su ubicacion actual</h2>
            <Mapa/>
          </div>)
      }
      else{
          return 
      }
  }

  render() {
    return (
      <div className="User">
        <h2>Estado Actual:</h2>
        <select name="estado" defaultValue ="Select" onChange={this.handleSelect}>
          <option value="Select" disabled>Selecciona su estado actual:</option>
          <option value="Ocupado" >Ocupado </option>
          <option value="Disponible">Disponible </option>
        </select><br></br>
        {this.retornarMapa()}
        <button>Reportar</button>
      </div>
    ); 
  }
}
export default Reporte;