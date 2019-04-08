// Dependencies
import React, { Component } from 'react';

// Assets
import logo from '../../images/logo.svg';
import './css/Header.css'


class Header extends Component {
  constructor(props){
    super(props)

    this.state={
      pagina:this.props.pagina
    }

    this.cerrarSesion = this.cerrarSesion.bind(this);
    this.mostrarBoton = this.mostrarBoton.bind(this);

  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return({pagina: nextProps.pagina})
  }

  cerrarSesion(){
    this.props.callback({pagina:'Login'});
  }

  mostrarBoton(){
    
    if(this.state.pagina==="Menu-Usuario"||this.state.pagina==="Menu-Conductor"){
      return(<button id="cs" onClick={this.cerrarSesion}>Cerrar Sesion</button>)
    }
  }

  render() {    
    return (
      <div className="Header">
        <img src={logo} alt="logo" id="logo" />
        <h1>NotThatEasyTaxy</h1>        
        {this.mostrarBoton()}
      </div> 
    );
    
  }
}

export default Header;