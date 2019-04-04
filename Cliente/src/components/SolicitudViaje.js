import React, { Component } from 'react';

import Posicion from './Posicion';


//<input type="submit" name="submit" value='Solicitar Viaje'/>
class SolicitudViaje extends Component {
  constructor(props){
    super(props)
    this.state={     
      descripcionOrigen:'',
      descripcionDestino:'',
      selected:false}

    this.solicitarViaje=this.solicitarViaje.bind(this);
    this.getPosicion=this.getPosicion.bind(this);
    this.mostrarBoton=this.mostrarBoton.bind(this);
    this.cancelar=this.cancelar.bind(this);
  }


  cancelar(){
    this.props.callback({
      pagina:'Menu-Usuario'});
  }

  solicitarViaje(){
    this.props.callback({
      longitudOrigen:this.state.longitudOrigen,
      latitudOrigen:this.state.latitudOrigen,
      descripcionOrigen:this.state.descripcionOrigen,
      longitudDestino:this.state.longitudDestino,
      latitudDestino:this.state.latitudDestino,
      descripcionDestino:this.state.descripcionDestino,
      pagina:'Viaje'
    });
  }

  getPosicion(e){
    this.setState(e,()=> { 
      if(this.state.descripcionDestino!=='' && this.state.descripcionOrigen!==''){
        this.setState({
          selected:true
        })
      }
    })    
  }

  mostrarBoton(){
    if(this.state.selected){
      return(<button onClick={this.solicitarViaje}>Solicitar Viaje</button>);
    }
  }

  render() {
    return(
        <div>
            <form>
                <Posicion tipo='origen' cellphone={this.props.cellphone} callback={this.getPosicion}/>
                <Posicion tipo='destino'cellphone={this.props.cellphone} callback={this.getPosicion}/>
                {this.mostrarBoton()}
                <button onClick={this.cancelar}>Cancelar</button>
            </form>
        </div>
        
    );
  }
}
export default SolicitudViaje;