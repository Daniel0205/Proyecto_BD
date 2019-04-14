import React, { Component } from 'react';
import './Viaje.css'
import toaster from 'toasted-notes';

import 'toasted-notes/src/styles.css'; // optional styles


class Viaje extends Component {
  constructor(props) {
    super(props);

    this.state=this.props.viaje


    this.aceptar = this.aceptar.bind(this);
    this.cancelar = this.cancelar.bind(this);
    this.encontrarConductor = this.encontrarConductor.bind(this);
    this.mostrarConductor = this.mostrarConductor.bind(this);
    this.calcularDistancia = this.calcularDistancia.bind(this);
    this.agregarFavoritos =this.agregarFavoritos.bind(this)

    this.encontrarConductor();
    this.calcularDistancia();
  }



  aceptar(){

    if(this.state.favoritosOrigen){
      this.agregarFavoritos(this.state.latitudOrigen,this.state.longitudOrigen,this.state.descripcionOrigen)
    }
    if(this.state.favoritosDestino){
      this.agregarFavoritos(this.state.latitudDestino,this.state.longitudDestino,this.state.descripcionDestino)
    }
    this.setState({
      distancia:this.state.distancia,
      pagina:'Calificacion'},()=>{
        delete this.state.posicion;
        delete this.state.placa;
        delete this.state.nombreConductor;
        delete this.state.encontrado;
        delete this.state.estrellas;
      this.props.callback(this.state)})
  }

  agregarFavoritos(lat,lng,descripcion){

    fetch("/AddFavoritos", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        latitud:lat,
        longitud:lng,
        descripcion:descripcion,
        cellphone:this.state.cellphone
      })
    })
    .then(res => res.json())
    .then(res => {
      if(res[0].bool){
        toaster.notify("  Punto anadido a favoritos   ");
      }
      else{
        toaster.notify("   El punto no se pudo anadir a favoritos   ");
      }
    }
    )
  }

  cancelar(){
    this.props.callback({
      pagina:'Menu-Usuario',
      cellphone:this.state.cellphone,
      });
  }

  encontrarConductor(){
    fetch("/encontrarConductor", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ 
        longitudOrigen:this.state.longitudOrigen,
        latitudOrigen:this.state.latitudOrigen,
      })
    })
      .then(res => res.json())
      .then(res => this.setState(res[0]))

  }

  calcularDistancia(){
    fetch("/distancia", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ 
        longitudOrigen:this.state.longitudOrigen,
        latitudOrigen:this.state.latitudOrigen,
        longitudDestino:this.state.longitudDestino,
        latitudDestino:this.state.latitudDestino,        
      })
    })
      .then(res => res.json())
      .then(res => this.setState({distancia:res[0].distancia}))
  }

  mostrarConductor(){
    if(this.state.encontrado){
     return(
      [<p key="1"><b>Placa del Auto:</b> {this.state.placa} </p>,
      <p key="2"><b>celular:</b> {this.state.celularConductor}</p>,
      <p key="3"><b>Nombre:</b> {this.state.nombreConductor} </p>,
      <p key="4"><b>Numero de estrellas:</b> {this.state.estrellas}</p>,
      <p key="5"><b>Posicion actual:</b> {this.state.posicion}</p>]);
    }
    else return(<p key="7">No se han encontrado choferes disponibles</p>)

  }

  render() {
    return (
        <div className='princ'>

          <div className='cont'>
            <div className='lsd'>
              <b><h2>Informacion del Viaje</h2></b>
              <p><b>Punto de partida:</b> {this.props.viaje.descripcionOrigen}</p>
              <p><b>Punto de destino:</b> {this.props.viaje.descripcionDestino} </p>
              <p><b>Distancia:</b> {this.state.distancia} Km</p>
              <p><b>Precio del viaje: $</b>{(this.state.distancia*1500).toFixed(2)}</p>
            </div>
            <div className='chofer'>
              <h2>Informacion del chofer</h2>
              {this.mostrarConductor()}
            </div>

          </div>

          <div className='botns'>
            <button id='b1' key="6" onClick={this.aceptar}>Aceptar viaje</button>
            <button id='b2' onClick={this.cancelar}>Cancelar</button>
          </div>


        </div>

    ); 
  }
}
export default Viaje;