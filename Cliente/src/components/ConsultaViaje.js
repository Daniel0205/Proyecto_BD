import React, { Component } from "react";
import "./ConsultaViaje.css";

class ConsultaViaje extends Component {
  render() {
    let nombre = null;

    if (this.props.user === "Usuario") {
      nombre = (
        <p>
          <b>Nombre Del chofer:</b> {this.props.datos.nombrechofer}
        </p>
      );
    } else {
      nombre = (
        <p>
          <b>Nombre Del cliente:</b> {this.props.datos.nombrecliente}
        </p>
      );
    }

    let pago = null,
      msj = "";

    if (this.props.user === "Usuario") {
      if (this.props.datos.pagado) msj = "Si";
      else msj = "No";
      pago = (
        <p>
          <b>Pagado:</b> {msj}
        </p>
      );
    } else {
      if (this.props.datos.cobrado) msj = "Si";
      else msj = "No";
      pago = (
        <p>
          <b>Cobrado:</b> {msj}
        </p>
      );
    }

    return (
      <div className="ficha">
        <h3>Viaje - {this.props.datos.id}</h3>
        {nombre}
        <p>
          <b>Punto de partida:</b> {this.props.datos.descripcionorigen}
        </p>
        <p>
          <b>Punto de destino:</b> {this.props.datos.descripciondestino}{" "}
        </p>
        <p>
          <b>Distancia: </b>
          {this.props.datos.kmrecorridos} Km
        </p>
        <p>
          <b>Precio del viaje: $</b>
          {(this.props.datos.kmrecorridos * 1500).toFixed(2)}
        </p>
        <p>
          <b>Fecha:</b> {this.props.datos.fecha}
        </p>
        {pago}
        <p>
          <b>Calificacion:</b>
          {this.props.datos.calificacion}
        </p>
        <br />
      </div>
    );
  }
}
export default ConsultaViaje;
