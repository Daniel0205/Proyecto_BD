import React, { Component } from 'react';

import Posicion from './Posicion';


//<input type="submit" name="submit" value='Solicitar Viaje'/>
class SolicitudViaje extends Component {
  constructor(props){
    super(props)

    this.solicitarViaje=this.solicitarViaje.bind(this);
  }

  solicitarViaje(pos){
    this.props.callback({
      longitudOrigen:123456789,
      latitudOrigen:2345678,
      descripcionOrigen:'Univalle',
      longitudDestino:12345678,
      latitudDestino:987654321,
      descripcionDestino:'Pance',
      pagina:'Viaje'
    });

  }

  render() {
    return(
        <div>
            <form action=''>
                <Posicion tipo='origen' callback={this.solicitarViaje}/>
                <Posicion tipo='destino'/>
                <button onClick={this.solicitarViaje}>Solicitar Viaje</button>
            </form>
        </div>
        
    );
  }
}
export default SolicitudViaje;