import React, { Component } from 'react';
import './Posicion.css'
import Mapa from './Mapa';



class Posicion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cellphone: this.props.cellphone,
            tipo:this.props.tipo,
            seleccion:'',
            favoritos:[],
            check:false
        };    

        this.handleChange = this.handleChange.bind(this);
        //this.seleccion = this.seleccion.bind(this);
        this.getFavoritos = this.getFavoritos.bind(this);
        this.handleSelectFav = this.handleSelectFav.bind(this);
        this.sacarInformacion = this.sacarInformacion.bind(this);
        this.setPosition = this.setPosition.bind(this)
        this.handleCheck =this.handleCheck.bind(this)
        this.getFavoritos();
      }
    
    handleChange(event) {
           
        this.setState({
            tipo:this.props.tipo,
            seleccion: event.target.value
        });
    
    }

    getFavoritos(){

        fetch("/favoritos", {
          method: "POST",
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ Username: this.state.cellphone})
        })
          .then(res => res.json())
          .then(res => this.setState({favoritos:res[0].favoritos},console.log(this.state)))
          .then(res => {
              this.setState({
                  favoritos:this.state.favoritos.map((x) => 
                  {return(<option value={[x.longitud,x.latitud,x.direccion]} key={[x.latitud,x.longitud]}>{x.direccion}</option>)}
                  )})
                });

    }


    sacarInformacion(str,num){
        let aux=''
        
        for (let i = 0; i < str.length ; i++) {
            
            if(str[i]===','){
                num=num-1
                if(num!==0){
                    aux=''
                }
                else break;
            }
            else{
                aux=aux+str[i]
            }
        }
        return aux
    }


    handleSelectFav(event){
        
        if(this.state.tipo==="origen"){
            this.props.callback({
                longitudOrigen:this.sacarInformacion(event.target.value,1),
                latitudOrigen:this.sacarInformacion(event.target.value,2),
                descripcionOrigen:this.sacarInformacion(event.target.value,3),
                tipo:this.state.tipo,
                favoritosOrigen:false
            })    
        }
        else{
            this.props.callback({
                longitudDestino:this.sacarInformacion(event.target.value,1),
                latitudDestino:this.sacarInformacion(event.target.value,2),
                descripcionDestino:this.sacarInformacion(event.target.value,3),
                tipo:this.state.tipo,
                favoritosDestino:false
            })
        }         
    }

    setPosition(event){
            
        if(this.state.tipo==="origen"){
            this.props.callback({
                longitudOrigen:event.longitud,
                latitudOrigen:event.latitud,
                descripcionOrigen:event.descripcion,
                tipo:this.state.tipo,
                favoritosOrigen:this.state.check
            })    
        }
        else{
            this.props.callback({
                longitudDestino:event.longitud,
                latitudDestino:event.latitud,
                descripcionDestino:event.descripcion,
                tipo:this.state.tipo,
                favoritosDestino:this.state.check
            })
        }         
    }

    handleCheck(event){

        this.setState({check:!this.state.check})
    }

    render() {    
        console.log(this.state)

        switch(this.state.seleccion){
            case "mapa":
            return ( 
                <div className={this.state.tipo}>
<<<<<<< HEAD
                    <h3>Ingrese {this.props.tipo}</h3>
                    <input type="radio"  value="mapa" checked={true} onChange={this.handleChange}/> Seleccionar del mapa<br></br>
                    <input type="checkbox"  value="add-fav"/> Agregar a favoritos<br></br>
                    <Mapa />
=======
                    <h1>Ingrese {this.props.tipo}</h1>
                    <input type="checkbox" onChange={this.handleCheck} checked={this.state.check} value="add-fav"/> Agregar a favoritos<br></br>
                    <input type="radio"  value="mapa" checked={true} onChange={this.handleChange}/> Seleccionar del mapa<br></br>
                    <Mapa callback={this.setPosition} />
>>>>>>> ba75cf206d2cd46d51c2624023851bc58cc8757c
                    <input type="radio"  value="favoritos" checked={false} onChange={this.handleChange}/>Seleccionar de favoritos<br></br>

                </div>);
            case "favoritos":
                return (                    
                        <div className={this.props.tipo}>
                            <h3>Ingrese {this.state.tipo}</h3>
                            
                            <input type="radio" value="mapa" checked={false} onChange={this.handleChange}/> Seleccionar del mapa<br></br>
                            <input type="radio" value="favoritos" checked={true} onChange={this.handleChange}/>Seleccionar de favoritos<br></br>
                            <select name="favoritos" defaultValue ="Select"  onChange={this.handleSelectFav}>
                                <option value="Select" disabled>Selecciona un {this.props.tipo}:</option>
                                {this.state.favoritos}
                            </select><br></br>                            
                        </div>);
            default:
                return (
                <div className={this.props.tipo}>
                    <h3>Ingrese {this.props.tipo}</h3>
                    <input type="radio" value="mapa" checked={false} onChange={this.handleChange}/> Seleccionar del mapa<br></br>
                    <input type="radio" value="favoritos" checked={false}  onChange={this.handleChange}/>Seleccionar de favoritos<br></br>

                </div>);
        } 
    }
}
export default Posicion;