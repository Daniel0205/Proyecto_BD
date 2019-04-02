import React, { Component } from 'react';

import Posicion from './Posicion';



class Viaje extends Component {


  render() {
    return(
        <div>
            <form action=''>
                <Posicion tipo='origen'/>
                <Posicion tipo='destino'/>
                <input type="submit" name="submit" value='Solicitar Viaje'/>
            </form>
        </div>
        
    );
  }
}
export default Viaje;