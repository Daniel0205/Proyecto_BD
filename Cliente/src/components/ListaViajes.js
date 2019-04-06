import React, { Component } from 'react';

import ConsultaViaje from './ConsultaViaje';

class ListaViaje extends Component {
  constructor(props) {
    super(props);
    this.state={
        cellphone:this.props.cellphone,
        user:this.props.user,
        viajes:[]
    }
    
    this.volverMenu = this.volverMenu.bind(this)
  }

  volverMenu(){
    this.props.callback("Menu-"+this.state.user)
  }

  componentDidMount(){
    fetch("/consultarViajes", {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
            cellphone:this.props.cellphone,
            user:this.props.user,
        })
      })
      .then(res => res.json())
      .then(res => this.setState({viajes:res[0].viajes}));
  }



  render() {

    let viajes = this.state.viajes;
    const viajesArray = viajes.map((x) => {return(<ConsultaViaje key={x.id} datos={x}/>)});

    return (
        <div>
            <h1>Mis viajes</h1>
            {viajesArray}

            <button onClick={this.volverMenu}>Volver</button>
        </div>

    ); 
  }
}
export default ListaViaje;