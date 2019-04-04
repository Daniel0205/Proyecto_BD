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


class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pagina: 'Login',
    };
    this.getResponse = this.getResponse.bind(this);
    this.setPage = this.setPage.bind(this);
    this.getPosiciones = this.getPosiciones.bind(this);
    this.calcularDistancia = this.calcularDistancia.bind(this);
  }

  getResponse(log){
    this.setState(state => ({
      pagina:log
    }));
  }
  
  setPage(log){
    this.setState(state => ({
      pagina:log,
    }));
  }

  getPosiciones(log){
    
    this.setState(state => (log));
  }

  calcularDistancia(){
    return 15;
  }
  

  render() {


    switch(this.state.pagina){
      case 'Login':
        return (
          <Login callback={this.getResponse}/>);
      case 'Registro':
        return(
          <div className="Content">
          <Title mensaje='Seleccione el tipo de usuario a registrar:'/>
          <div className='Logos'>
            <User URL= {userLogo} msj="Usuario" callback={this.setPage}/>
            <User URL= {taxistaLogo} msj="Conductor" callback={this.setPage}/>
          </div>
        </div>);
      case 'Conductor':
        return(
          <Registro user={this.state.pagina}/>
         );
      case 'Reporte':
          return(
            <Reporte callback={this.setPage}/>
          );
      case 'Usuario':
        return(
          <Registro user={this.state.pagina}/>
        );
      
      case 'Menu-Usuario':
        return(
          <Menu user="Usuario"  callback={this.setPage}/>
        );

      case 'Menu-Conductor':
        return(
          <Menu user="Conductor"  callback={this.setPage}/>
        )

      case 'Solicitud-Viaje':
          return(
            <SolicitudViaje callback={this.getPosiciones}/>
          );
      case 'Viaje':
          return(
            <Viaje viaje={this.state} distancia={this.calcularDistancia()} callback={this.setPage}/>
          );
      case 'Calificacion':
          return(
            <Calificacion callback={this.setPage}/>
          );
      default:
      console.log("entro"); 
          break;
    }
  }  
}

export default Content;