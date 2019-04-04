import React, { Component } from 'react';


class Viaje extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.aceptar = this.aceptar.bind(this)
    this.cancelar = this.cancelar.bind(this)
  }

  handleClick(){
    this.props.callback(this.props.msj);
  }

  aceptar(){
    this.props.callback('Calificacion');
  }

  cancelar(){
    this.props.callback('Menu-Usuario');
  }

  render() {
    return (
        <div>
            <h2>Informacion del chofer</h2>
            <p>Placa del Auto: </p>
            <p>Nombre: </p>
            <p>Numero de estrellas:</p>
            <p>Posicion actual:</p>
            <h2>Informacion del Viaje</h2>
            <p>Punto de partida: {this.props.viaje.descripcionOrigen}</p>
            <p>Punto de destino: {this.props.viaje.descripcionDestino} </p>
            <p>Distancia: {this.props.distancia} Km</p>
            <p>Precio del viaje: ${this.props.distancia*1500}</p>

            <button onClick={this.aceptar}>Aceptar viaje</button>
            <button onClick={this.cancelar}>Cancelar</button>
        </div>

    ); 
  }
}
export default Viaje;