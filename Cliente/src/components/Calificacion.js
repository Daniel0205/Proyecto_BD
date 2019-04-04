import React, { Component } from 'react';


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
        return([<input type='radio' checked={true} value={x} onChange={this.seleccionar} key={x}/>,<p key={x+x}>{x}</p>])
      }
      else{
        return([<input type='radio' checked={false} value={x} onChange={this.seleccionar} key={x}/>,<p key={x+x}>{x}</p>])
      }
    })


        
    return (
      <div className="Calificacion" >
        <h2 >Porfavor califique la calidad del servicio:</h2>
          {estrellas}
          {this.boton()}        
      </div>
    ); 
  }
}
export default Calificaion;