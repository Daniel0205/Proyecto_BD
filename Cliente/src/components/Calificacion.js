import React, { Component } from 'react';
import './Calificacion.css'
import star from '../images/estrella.svg'


class Calificaion extends Component {
  constructor(props) {
    super(props);

    this.state = this.props.viaje;
    this.state.calificacion=0;

    this.handleClick = this.handleClick.bind(this);
    this.seleccionar = this.seleccionar.bind(this);
    this.boton = this.boton.bind(this);
  }

  handleClick(){
    fetch("/finalizarViaje", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ 
        longitudOrigen:this.state.longitudOrigen,
        latitudOrigen:this.state.latitudOrigen,
        longitudDestino:this.state.longitudDestino,
        latitudDestino:this.state.latitudDestino,        
      })
    })
    .then(res => res.json())
    .then(res => {
      if(res[0].bool){
        console.log("viaje terminado exitosamente")
      }
      else {console.log("el viaje no pudo ser terminado")}
      
      this.props.callback({
        pagina:"Menu-Usuario",
        cellphone:this.state.cellphone,
        nombre:this.state.nombre})});
  }

  seleccionar(event){
    this.setState({
      calificacion:event.target.value})
  }

  boton(){
    if(this.state.calificacion!==0){
      return(<button onClick={this.handleClick} >Finalizar Viaje </button>);
    }
  }

  render() {

    let numEstrellas = [1,2,3,4,5]
    const estrellas = numEstrellas.map((x) => 
    {
      if(x.toString()===this.state.calificacion){
        return([<input type='radio' checked={true} value={x} onChange={this.seleccionar} key={x}/>])
      }
      else{
        return([<input type='radio' checked={false} value={x} onChange={this.seleccionar} key={x}/>])
      }
    })


        
    return (
      <div className="Calificacion" >
        <h2 >Porfavor califique la calidad del servicio:</h2>
        <div className='conte'>
          <div className='puntu'>
            {estrellas}
          </div>
          <div className='stars'>
            <div>
              <img className='imagenes' src={star} alt="logoesc"/>
            </div>
            <div>
              <img className='imagenes' src={star} alt="logoesc"/>
              <img className='imagenes' src={star} alt="logoesc"/>
            </div>
            <div>
              <img className='imagenes' src={star} alt="logoesc"/>
              <img className='imagenes' src={star} alt="logoesc"/>
              <img className='imagenes' src={star} alt="logoesc"/>
            </div>
            <div>
              <img className='imagenes' src={star} alt="logoesc"/>
              <img className='imagenes' src={star} alt="logoesc"/>
              <img className='imagenes' src={star} alt="logoesc"/>
              <img className='imagenes' src={star} alt="logoesc"/>
            </div>
            <div>
              <img className='imagenes' src={star} alt="logoesc"/>
              <img className='imagenes' src={star} alt="logoesc"/>
              <img className='imagenes' src={star} alt="logoesc"/>
              <img className='imagenes' src={star} alt="logoesc"/>
              <img className='imagenes' src={star} alt="logoesc"/>
            </div>
          </div>
          
        </div>
          {this.boton()}        
      </div>
    ); 
  }
}
export default Calificaion;