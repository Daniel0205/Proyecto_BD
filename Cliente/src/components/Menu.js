import React, { Component } from 'react';




class Menu extends Component {

    constructor(props){
        super(props)    

        this.calcularKmUsados=this.calcularKmUsados.bind(this)
        this.calcularKmPagar=this.calcularKmPagar.bind(this)
        this.calcularKmTransp=this.calcularKmTransp.bind(this)
        this.consultarKmCobrar=this.consultarKmCobrar.bind(this)
        this.cobrarViajes=this.cobrarViajes.bind(this)
        this.pagarViajes=this.pagarViajes.bind(this)


        if(this.props.user==="Conductor"){
            this.window={
                kmtransp:this.calcularKmTransp(),
                kmCobrar:this.consultarKmCobrar()               
            }
        }
        else{
            this.window={
                kmUsados:this.calcularKmUsados(),
                kmPagar:this.calcularKmPagar()              
            }
        }

    }

    calcularKmPagar(){
        return 100
    }

    calcularKmUsados(){
        return 200
    }

    calcularKmTransp(){
        return 300
    }

    consultarKmCobrar(){
        return 400
    }

    cobrarViajes(){
        this.window.kmCobrar=0
        
        this.forceUpdate()
    }

    pagarViajes(){
        this.window.kmPagar=0
        
        this.forceUpdate()
    }

  render() {

    switch (this.props.user){
        case "Conductor":
          
            return(
                <div>
                    <div className='opciones'>
                        <h2>Seleccione una opcion:</h2>
                        <button  >Modificar Datos</button>
                        <button  >Solicitar Viaje</button>
                        </div>
                        <div className='kilometros'>
                    <h2>Kilometros</h2>
                        <p>Kilometros transportados:</p>
                        <p>{this.window.kmtransp} Km</p>
                        <p>Kilometros a cobrar:</p>
                        <p>{this.window.kmCobrar} Km</p>
                        <button onClick={this.cobrarViajes} >Cobrar Viajes</button>
                    </div>
                </div>
            );            
    
        case "Usuario":
            return(
                <div>
                    <div className='opciones'>
                        <h2>Seleccione una opcion:</h2>
                        <button  >Modificar Datos</button>
                        <button  onClick={this.pagarViajes} >Solicitar Viaje</button>
                        </div>
                        <div className='kilometros'>
                    <h2>Kilometros</h2>
                        <p>Kilometros Usados:</p>
                        <p>{this.window.kmUsados} Km</p>
                        <p>Kilometros a Pagar:</p>
                        <p>{this.window.kmPagar} Km</p>
                        <button onClick={this.pagarViajes}   >Pagar Viajes</button>
                    </div>
                </div>
                
            );
        default:
        break;
    }
  }
}
export default Menu;