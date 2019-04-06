import React, { Component } from 'react';

import './css/Content.css';

import taxistaLogo from '../../images/taxista-icon.svg';
import userLogo from '../../images/user-icon.svg';

import User from '../User.js';
import Title from '../Title.js';
import Login from '../Login';
import Registro from '../Registro';
import SolicitudViaje from '../SolicitudViaje';
import Viaje from '../Viaje';
import Menu from '../Menu';
import Reporte from '../Reporte';
import Calificacion from '../Calificacion';
import ListaViajes from '../ListaViajes';


class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pagina: 'Login',
    };
    this.getResponse = this.getResponse.bind(this);
    this.setPage = this.setPage.bind(this);
    this.getPosiciones = this.getPosiciones.bind(this);
    this.login = this.login.bind(this);
    this.finalizarViaje=this.finalizarViaje.bind(this)
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return({pagina: nextProps.pagina})
  }

  getResponse(log){
    this.props.callback({pagina:log})
  }
  
  setPage(log){
    this.props.callback({pagina:log})
  }

  getPosiciones(log){    
    if(log.pagina==="Menu-Usuario"){
      delete this.state.latitudOrigen
      delete this.state.longitudOrigen
      delete this.state.descripcionOrigen
      delete this.state.latitudDestino
      delete this.state.longitudDestino
      delete this.state.descripcionDestino
      this.setState(state => (log),()=>this.props.callback({pagina:log.pagina})); 
    }
    else{
      this.setState(state => (log),()=>this.props.callback({pagina:log.pagina})); 
    }
  }

  finalizarViaje(estado){
    delete this.state.calificacion
    delete this.state.celularConductor
    delete this.state.distancia
    delete this.state.latitudOrigen
    delete this.state.longitudOrigen
    delete this.state.descripcionOrigen
    delete this.state.latitudDestino
    delete this.state.longitudDestino
    delete this.state.descripcionDestino
    
    this.props.callback({pagina:estado.pagina})
    
  }
  
  login(log){
    this.setState(state => (log),()=>this.props.callback(log));
  }

  render() {
    console.log(this.state)

    switch(this.state.pagina){
      case 'Login':
        return (
          <Login callback={this.login}/>);
      case 'Registro':
        return(
          <div className="Content">
          <Title mensaje='Seleccione el tipo de usuario a registrar:'/>
          <div className='Logos'>
            <User URL= {userLogo} msj="Usuario" callback={this.setPage}/>
            <User URL= {taxistaLogo} msj="Conductor" callback={this.setPage}/>
          </div>
        </div>);

      case 'Datos-Conductor':
        return(
          <Registro cellphone={this.state.cellphone} user="Conductor" tipo='Actualizar' callback={this.setPage}/>
        );
      case 'Datos-Usuario':
        return(
          <Registro cellphone={this.state.cellphone}  user="Usuario" tipo='Actualizar' callback={this.setPage}/>
        );
      case 'Conductor':
        return(
          <Registro user={this.state.pagina} tipo='Registro' callback={this.setPage}/>
         );
      case 'Reporte':
          return(
            <Reporte callback={this.setPage}/>
          );
      case 'Usuario':
        return(
          <Registro user={this.state.pagina} tipo='Registro' callback={this.setPage}/>
        );
      
      case 'Menu-Usuario':
        return(
          <Menu user="Usuario"  callback={this.setPage}/>
        );

      case 'Viajes-Usuario':
        return(
          <ListaViajes cellphone={this.state.cellphone} user="Usuario" callback={this.setPage}/>
        );
      case 'Viajes-Conductor':
        return(
          <ListaViajes cellphone={this.state.cellphone} user="Conductor" callback={this.setPage}/>
        );
      case 'Menu-Conductor':
        return(
          <Menu user="Conductor"  callback={this.setPage}/>
        );
      case 'Solicitud-Viaje':
          return(
            <SolicitudViaje cellphone={this.state.cellphone} callback={this.getPosiciones}/>
          );
      case 'Viaje':
          return(
            <Viaje viaje={this.state} callback={this.getPosiciones}/>
          );
      case 'Calificacion':
          return(
            <Calificacion viaje={this.state} callback={this.finalizarViaje}/>
          );
      default:
      console.log("entro"); 
          break;
    }
  }  
}

export default Content;