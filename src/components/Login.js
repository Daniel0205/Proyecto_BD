import React, { Component } from 'react';

import './Login.css'


class Login extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(){
    this.props.callback('registro');    
  }


  render() {
    return (
      <div className='login'>

        <form className="form" method="get" name='login'>
            <h1>Login</h1>
            <p>Username:</p>
            <input type="text" name="cellphone" placeholder='Numero de telefono'/>
            <p>Password:</p>
            <input type="password" name="psw" placeholder='Password'/><br></br>
            <input type="submit" name="psw" value='Ingresar'/>
            
        </form> 
        <div className='registro'>
          <p>No tienes una cuenta?</p>
          <button onClick={this.handleClick} >Regristrarse</button>
        </div>
      </div>
    ); 
  }
}
export default Login;