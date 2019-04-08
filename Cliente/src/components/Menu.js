import React, { Component } from 'react';




class Menu extends Component {

    constructor(props){
        super(props)    
        if(this.props.user==="Conductor"){
            this.state={
                kmtransp:this.calcularKmTransp(),
                kmCobrar:this.consultarKmCobrar()               
            }
        }
        else{
            this.state={
                kmUsados:this.calcularKmUsados(),
                kmPagar:this.calcularKmPagar()              
            }
        }

        this.calcularKmUsados=this.calcularKmUsados.bind(this)
        this.calcularKmPagar=this.calcularKmPagar.bind(this)
        this.calcularKmTransp=this.calcularKmTransp.bind(this)
        this.consultarKmCobrar=this.consultarKmCobrar.bind(this)
        this.cobrarPagarViajes=this.cobrarPagarViajes.bind(this)
        this.solicitarViaje=this.solicitarViaje.bind(this)
        this.reportarEstado =this.reportarEstado.bind(this)
        this.modificarDatos =this.modificarDatos.bind(this)
        this.verViajes =this.verViajes.bind(this)

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
                    })
                }
                else{
                    this.setState({
                        kmPagar:0
                    }); 
                }
              }
              else console.log('Accion no realizada')              
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
                <div>
                    <div className='opciones'>
                        <h2>Seleccione una opcion:</h2>
                        <button onClick={this.modificarDatos} >Modificar Datos</button>
                        <button onClick={this.reportarEstado} >Reportar Estado</button>
                        <button onClick={this.verViajes}>Ver Viajes</button>
                        </div>
                        <div className='kilometros'>
                    <h2>Kilometros</h2>
                        <p>Kilometros transportados:</p>
                        <p>{this.state.kmtransp} Km</p>
                        <p>Kilometros a cobrar:</p>
                        <p>{this.state.kmCobrar} Km</p>
                        <button onClick={this.cobrarPagarViajes} >Cobrar Viajes</button>
                    </div>
                </div>
            );            
    
        case "Usuario":
            return(
                <div>
                    <div className='opciones'>
                        <h2>Seleccione una opcion:</h2>
                        <button  onClick={this.modificarDatos} >Modificar Datos</button>
                        <button  onClick={this.solicitarViaje} >Solicitar Viaje</button>
                        <button  onClick={this.verViajes}>Ver Viajes</button>
                        </div>
                        <div className='kilometros'>
                    <h2>Kilometros</h2>
                        <p>Kilometros Usados:</p>
                        <p>{this.state.kmUsados} Km</p>
                        <p>Kilometros a Pagar:</p>
                        <p>{this.state.kmPagar} Km</p>
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