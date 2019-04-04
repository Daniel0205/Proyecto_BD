import React, { Component } from 'react';


class Calificaion extends Component {
  constructor(props) {
    super(props);

    this.state = {
        selected:0
    };
    this.handleClick = this.handleClick.bind(this);
    this.seleccionar = this.seleccionar.bind(this);
    this.boton = this.boton.bind(this);
  }

  handleClick(){
    this.props.callback('Menu-Usuario');
  }

  seleccionar(event){
    this.setState({
      selected:event.target.value
    })
  }

  boton(){
    if(this.state.selected!==0){
      return(<button onClick={this.handleClick} >Finalizar Viaje </button>);
    }
  }

  render() {

    let numEstrellas = [1,2,3,4,5]
    const estrellas = numEstrellas.map((x) => 
    {
      if(x.toString()===this.state.selected){
        return([<input type='radio' checked={true} value={x} onChange={this.seleccionar} key={x}/>,<p key={x+x}>{x}</p>])
      }
      else{
        return([<input type='radio' checked={false} value={x} onChange={this.seleccionar} key={x}/>,<p key={x+x}>{x}</p>])
      }
    })


        
    return (
      <div className="Calificacion" >
        <h2 >Porfavor califique la calidad del serivicio:</h2>
          {estrellas}
          {this.boton()}        
      </div>
    ); 
  }
}
export default Calificaion;