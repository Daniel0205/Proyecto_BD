import React, { Component } from 'react';
import './ConsultaViaje.css'

class ConsultaViaje extends Component {


  render() {
    let nombre = null;
    console.log(this.props.datos)
    if (this.props.user==="Usuario"){
        nombre =  <p>Nombre Del chofer: {this.props.datos.nombrechofer}</p>
    }
    else{ nombre =  <p>Nombre Del cliente: {this.props.datos.nombrecliente}</p>}


    let pago = null,msj='';

    if (this.props.user==="Usuario"){
      if(this.props.datos.pagado)msj='Si';
      else msj='No'
      pago =  <p>Pagado: {msj}</p>
    }
    else{ 
      if(this.props.datos.cobrado)msj='Si';
      else msj='No'
      pago =  <p>Cobrado: {msj}</p>
    }

    return (
        <div className='ficha'>
            <h3>Viaje - {this.props.datos.id}</h3>
            {nombre}
            <p>Punto de partida: {this.props.datos.descripcionorigen}</p>
            <p>Punto de destino: {this.props.datos.descripciondestino} </p>
            <p>Distancia: {this.props.datos.kmrecorridos} Km</p>
            <p>Precio del viaje: ${this.props.datos.kmrecorridos*1500}</p>
            <p>Fecha: {this.props.datos.fecha}</p>
            {pago}
            <p>Calificacion: {this.props.datos.calificacion}</p>
            <br></br>
        </div>

    ); 
  }
}
export default ConsultaViaje;