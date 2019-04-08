import React, { Component } from 'react';
import './Menu.css'
import esc from '../images/escritura.svg' ;
import rep from '../images/reportar.svg' ;
import via from '../images/taxi.svg' ;
import con from '../images/conductor.svg' ;


class Menu extends Component {

    constructor(props){
        super(props)    

        this.calcularKmUsados=this.calcularKmUsados.bind(this)
        this.calcularKmPagar=this.calcularKmPagar.bind(this)
        this.calcularKmTransp=this.calcularKmTransp.bind(this)
        this.consultarKmCobrar=this.consultarKmCobrar.bind(this)
        this.cobrarViajes=this.cobrarViajes.bind(this)
        this.pagarViajes=this.pagarViajes.bind(this)
        this.solicitarViaje=this.solicitarViaje.bind(this)
        this.reportarEstado =this.reportarEstado.bind(this)
        this.modificarDatos =this.modificarDatos.bind(this)
        this.verViajes =this.verViajes.bind(this)


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

    solicitarViaje(){
        this.props.callback('Solicitud-Viaje');
    }

    modificarDatos(){
        this.props.callback('Datos-'+this.props.user);
    }

    reportarEstado(){
        this.props.callback('Reporte');
    }

    verViajes(){
        this.props.callback('Viajes-'+this.props.user);
    }

  render() {

    switch (this.props.user){
        case "Conductor":
          
            return(
                <div className='prin1'>
                    <h2 id="wel">¡Bienvenido Conductor!</h2>
                    <div className='opciones'>
                        <h2 id="sec">Seleccione una opcion:</h2>
                        <img className='imagenes' src={esc} alt="logoesc"/>
                        <img className='imagenes' src={rep} alt="logorep"/>
                        <img className='imagenes' src={via} alt="logovia"/>

                        <div>
                        <button className="butc" onClick={this.modificarDatos} >Modificar Datos</button>
                        <button className="butc" onClick={this.reportarEstado} >Reportar Estado</button>
                        <button id="bt1" className="butc" onClick={this.verViajes}>Ver Viajes</button>
                        </div>
                        
                     
                    </div>
                    <div className='kilometros'>
                        <h2 id="kp">Kilometros</h2>
                        <p className="ks">Kilometros transportados:</p>
                        <p className="ks">{this.window.kmtransp} Km</p>
                        <p className="ks">Kilometros a cobrar:</p>
                        <p className="ks">{this.window.kmCobrar} Km</p>
                        <button onClick={this.cobrarViajes} >Cobrar Viajes</button>
                    </div>
                </div>
            );            
    
        case "Usuario":
            return(
                <div className='prin1'>
                    <h2 id="wel">¡Bienvenido usuario!</h2>
                    <div className='opciones'>
                        <h2 id="sec">Seleccione una opcion:</h2>
                        <img className='imagenes' src={esc} alt="logoesc"/>
                        <img className='imagenes' src={con} alt="logorep"/>
                        <img className='imagenes' src={via} alt="logovia"/>

                        <div>
                        <button className="butc" onClick={this.modificarDatos} >Modificar Datos</button>
                        <button className="butc" onClick={this.solicitarViaje} >Solicitar Viaje</button>
                        <button id="bt2" className='butc' onClick={this.verViajes}>Ver Viajes</button>
                        </div>
                       
                    </div>
                    <div className='kilometros'>
                        <h2 id="kp">Kilometros</h2>
                        <p className="ks">Kilometros Usados:</p>
                        <p className="ks">{this.window.kmUsados} Km</p>
                        <p className="ks">Kilometros a Pagar:</p>
                        <p className="ks">{this.window.kmPagar} Km</p>
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