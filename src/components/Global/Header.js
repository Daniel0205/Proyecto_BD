// Dependencies
import React, { Component } from 'react';

// Assets
import logo from '../../images/logo.svg';
import './css/Header.css'


class Header extends Component {

  render() {
    
    return (
      <div className="Header">
        <img src={logo} alt="logo" id="logo" />
        <h1>NotThatEasyTaxy</h1>
        
      </div> 
    );
    
  }
}

export default Header;