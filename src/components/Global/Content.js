import React, { Component } from 'react';

import './css/Content.css';

import taxistaLogo from '../../images/taxista-icon.svg';
import userLogo from '../../images/user-icon.svg';

import User from '../User.js';
import Title from '../Title.js';
import Login from '../Login';


class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pagina: 'login',
    };
    this.getResponse = this.getResponse.bind(this);
    this.getusuario = this.getusuario.bind(this);
  }

  getResponse(log){
    this.setState(state => ({
      pagina:log
    }));
  }
  getusuario(log){
    this.setState(state => ({
      pagina:this.state.pagina,
      tipoUser:log
    }));
    console.log(log);
  }


  render() {

    if(this.state.pagina==='login'){
      return (
        <Login callback={this.getResponse}/>);
    }
    else if(this.state.pagina==='registro'){
      return(
        <div className="Content">
        <Title mensaje='Seleccione el tipo de usuario a registrar:'/>
        <div className='Logos'>
          <User URL= {userLogo} msj="Usuario" callback={this.getusuario}/>
          <User URL= {taxistaLogo} msj="Conductor" callback={this.getusuario}/>
        </div>
      </div>); 
    }   
  }  
}

export default Content;