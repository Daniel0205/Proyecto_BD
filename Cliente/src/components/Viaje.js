import React, { Component } from 'react';
import './Viaje.css'


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
      this.agregarFavoritos(this.state.latitudDestino,this.statelongitudDestino,this.state.descripcionDestino)
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
        console.log("favorito anadido exitosamente")
      }
      else {console.log("favorito sin anadir")}
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
      [<p key="1"> Placa del Auto: {this.state.placa} </p>,
      <p key="2">celular: {this.state.celularConductor}</p>,
      <p key="3">Nombre: {this.state.nombreConductor} </p>,
      <p key="4">Numero de estrellas: {this.state.estrellas}</p>,
      <p key="5">Posicion actual: {this.state.posicion}</p>]);
    }
    else return(<p key="7">No se han encontrado choferes disponibles</p>)

  }
  /*

   

            <h2>Informacion del chofer</h2>
            {this.mostrarConductor()}

  */

  render() {
    return (
        <div className='princ'>

          <div className='cont'>
            <div className='lsd'>
              <h2>Informacion del Viaje</h2>
              <p>Punto de partida: {this.props.viaje.descripcionOrigen}</p>
              <p>Punto de destino: {this.props.viaje.descripcionDestino} </p>
              <p>Distancia: {this.state.distancia} Km</p>
              <p>Precio del viaje: ${this.state.distancia*1500}</p>
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