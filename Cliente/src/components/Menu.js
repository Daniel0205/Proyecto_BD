import React, { Component } from 'react';
import './Menu.css'
import esc from '../images/escritura.svg' ;
import rep from '../images/reportar.svg' ;
import via from '../images/taxi.svg' ;
import con from '../images/conductor.svg' ;
import toaster from 'toasted-notes';

import 'toasted-notes/src/styles.css'; // optional styles


class Menu extends Component {

    constructor(props){
        super(props)    
        if(this.props.user==="Conductor"){
            this.state={
                kmtransp:0,
                kmCobrar:0
            }
        }
        else{
            this.state={
                kmUsados:0,
                kmPagar:0
            }
        }

        this.calcularKmUsados=this.calcularKmUsados.bind(this)
        this.calcularKmPagar=this.calcularKmPagar.bind(this)
        this.cobrarPagarViajes=this.cobrarPagarViajes.bind(this)
        this.solicitarViaje=this.solicitarViaje.bind(this)
        this.reportarEstado =this.reportarEstado.bind(this)
        this.modificarDatos =this.modificarDatos.bind(this)
        this.verViajes =this.verViajes.bind(this)
        
        this.calcularKmUsados();
        this.calcularKmPagar();
    }

    calcularKmPagar(){
        fetch("/KmPagarCobrar", {
            method: "POST",
            headers: {
              Accept: "application/json, text/plain, */*",
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ 
                Username: this.props.cellphone,
                tipo:this.props.user
            })
          })
          .then(res => res.json())
          .then(res => {

              if(res[0].bool){
                if(this.props.user==="Conductor"){
                    this.setState({
                        kmCobrar:res[0].km
                    })
                }
                else{
                    this.setState({
                        kmPagar:res[0].km
                    }); 

                }
              }
         
            });
    }

    calcularKmUsados(){
        fetch("/KmUsados", {
            method: "POST",
            headers: {
              Accept: "application/json, text/plain, */*",
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ 
                Username: this.props.cellphone,
                tipo:this.props.user
            })
          })
          .then(res => res.json())
          .then(res => {
              if(res[0].bool){
                if(this.props.user==="Conductor"){
                    this.setState({
                        kmtransp:res[0].km
                    })
                }
                else{
                    this.setState({
                        kmUsados:res[0].km
                    }); 
                }
              }
            });
    }

    cobrarPagarViajes(){

        fetch("/PagarCobrar", {
            method: "POST",
            headers: {
              Accept: "application/json, text/plain, */*",
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ 
                Username: this.props.cellphone,
                tipo:this.props.user
            })
          })
          .then(res => res.json())
          .then(res => {
              console.log(res)
              if(res[0].bool){
                if(this.props.user==="Conductor"){
                    this.setState({
                        kmCobrar:0        
                    }, ()=>toaster.notify('   Los kilometros fueron cobrados   ', {
                        duration: 10000
                      }))
                }
                else{
                    this.setState({
                        kmPagar:0
                    }, ()=>toaster.notify('   Los kilometros fueron pagados   ', {
                        duration: 10000
                      })); 
                }
              }
              else {
                toaster.notify('   Los kilometros no cobrados/pagados   ', {
                    duration: 10000
                  });
              }                 
            });
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
                        <p className="ks">{this.state.kmtransp} Km</p>
                        <p className="ks">Kilometros a cobrar:</p>
                        <p className="ks">{this.state.kmCobrar} Km</p>
                        <button onClick={this.cobrarPagarViajes} >Cobrar Viajes</button>
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
                        <p className="ks">{this.state.kmUsados} Km</p>
                        <p className="ks">Kilometros a Pagar:</p>
                        <p className="ks">{this.state.kmPagar} Km</p>
                        <button onClick={this.cobrarPagarViajes}   >Pagar Viajes</button>
                    </div>
                </div>
                
            );
        default:
        break;
    }
  }
}
export default Menu;