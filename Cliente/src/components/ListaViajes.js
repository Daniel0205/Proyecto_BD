import React, { Component } from 'react';
import './ListaViajes.css'
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
      .then(res => this.setState({viajes:res}));
  }



  render() {

    let viajes = this.state.viajes;
    let viajesArray = viajes.map((x) => {return(<ConsultaViaje key={x.id} user={this.props.user} datos={x}/>)});

    if(viajes.length===0)viajesArray=<h2>No se encontraron viajes realizados</h2>
    /**/
    return (
        <div className='mainv'>
            <h1 id="vi" >Mis viajes</h1>
            <div id="trips">
              {viajesArray}
            </div>
            <button onClick={this.volverMenu}>Volver</button>
        </div>

    ); 
  }
}
export default ListaViaje;