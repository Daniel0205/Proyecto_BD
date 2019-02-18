import React, { Component } from 'react';

import './User.css';

class User extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(){
    this.props.callback(this.props.msj);
  }

  render() {
    return (
      <div className="User">
        <img src={this.props.URL} alt='Logo Users' />
        <button onClick={this.handleClick} >{this.props.msj} </button>
      </div>
    ); 
  }
}
export default User;