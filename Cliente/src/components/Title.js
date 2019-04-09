import React, { Component } from 'react';
import './Title.css';


class Title extends Component {

  render() {
    return (
        <div className="Welcome-text">
          <h1 >Bienvenido!</h1>
          <h2>{this.props.mensaje}</h2>
        </div>
    ); 
  }
}
export default Title;