import React, { Component } from 'react';

import Mapa from './Mapa';



class Posicion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tipo:this.props.tipo,
            seleccion:''
        };    
        this.handleChange = this.handleChange.bind(this);
      }
    
      handleChange(event) {
        this.setState({
            tipo:this.props.tipo,
            seleccion: event.target.value
        });
        
      }



  render() {
      switch(this.state.seleccion){
          case "mapa":
            return ( 
                <div className={this.state.tipo}>
                    <h1>Ingrese {this.props.tipo}</h1>
                    <input type="checkbox"  value="add-fav"/> Agregar a favoritos<br></br>
                    <input type="radio"  value="mapa" checked={true} onChange={this.handleChange}/> Seleccionar del mapa<br></br>
                    <Mapa/>
                    <input type="radio"  value="favoritos" checked={false} onChange={this.handleChange}/>Seleccionar de favoritos<br></br>

                </div>);
            case "favoritos":
                return (                    
                        <div className='origen'>
                            <h1>Ingrese {this.state.tipo}</h1>
                            
                            <input type="radio" value="mapa" checked={false} onChange={this.handleChange}/> Seleccionar del mapa<br></br>
                            <input type="radio" value="favoritos" checked={true} onChange={this.handleChange}/>Seleccionar de favoritos<br></br>
                            <select name="favoritos" defaultValue ="Select">
                                <option value="Select" disabled>Selecciona un origen:</option>
                                <option value="univalle">univalle</option>
                            </select><br></br>                            
                        </div>);
            default:
                return (
                <div className={this.props.tipo}>
                    <h1>Ingrese {this.props.tipo}</h1>
                    <input type="radio" value="mapa" checked={false} onChange={this.handleChange}/> Seleccionar del mapa<br></br>
                    <input type="radio" value="favoritos" checked={false}  onChange={this.handleChange}/>Seleccionar de favoritos<br></br>

                </div>);
      } 
  }
}
export default Posicion;