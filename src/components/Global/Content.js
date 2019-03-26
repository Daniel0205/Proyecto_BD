import React, { Component } from 'react';

import './css/Content.css';

import taxistaLogo from '../../images/taxista-icon.svg';
import userLogo from '../../images/user-icon.svg';

import User from '../User.js';
import Title from '../Title.js';
import Login from '../Login';
import Registro from '../Registro';
import Mapa from '../Mapa';


class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pagina: 'Login',
    };
    this.getResponse = this.getResponse.bind(this);
    this.getUsuario = this.getUsuario.bind(this);
  }

  getResponse(log){
    this.setState(state => ({
      pagina:log
    }));
  }
  
  getUsuario(log){
    this.setState(state => ({
      pagina:log,
    }));
  }

  render() {
    return(<Mapa/>);
/*
    switch(this.state.pagina){
      case 'Login':
        return (
          <Login callback={this.getResponse}/>);
      case 'Registro':
        return(
          <div className="Content">
          <Title mensaje='Seleccione el tipo de usuario a registrar:'/>
          <div className='Logos'>
            <User URL= {userLogo} msj="Usuario" callback={this.getUsuario}/>
            <User URL= {taxistaLogo} msj="Conductor" callback={this.getUsuario}/>
          </div>
        </div>);
      case 'Conductor':
        return(
          <Registro user={this.state.pagina}/>
         );
      case 'Usuario':
        return(
          <Registro user={this.state.pagina}/>
        );
      default:
      console.log("entro"); 
          break;
    }*/  
  }  
}

export default Content;