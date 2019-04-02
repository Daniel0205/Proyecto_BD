import React, { Component } from 'react';



class Registro extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user:this.props.user,
      registro:true
    };    
    this.getDatos = this.getDatos.bind(this);
  }


  getDatos() { 
    const x = 'datos-Personales'+ this.state.user
    return(
      <div id={x}>
        <h1>Datos-Personales</h1>
        <input type="text" name="cellphone" placeholder='Celular*'/><br></br>
        <input type="password" name="psw" placeholder='Password*'/><br></br>
        <input type="text" name="nombre" placeholder='Nombre(s)*'/><br></br>
        <input type="text" name="apellido" placeholder='Apellido(s)*'/><br></br>
        <select name="cars" defaultValue ="Select">
          <option value="Select" disabled>Selecciona un genero:</option>
          <option value="Masculina">Masculino</option>
          <option value="Femenino">Femenino</option>
          <option value="No Definido">No Definido</option>
        </select><br></br>
        <input type="text" name="direccion" placeholder='Direccion De Residencia'/><br></br>
      </div>);
  }

  render() {

    switch(this.state.user){
      case 'Usuario':
        return(
          <div className='Registro'>
            {this.getDatos()}
          </div>);
      case 'Conductor':
        let allYears = [];
        for(let x = 0; x <= 39; x++) {
          allYears.push(2019 - x)
        }
        
        const yearList = allYears.map((x) => {return(<option value={x} key={x}>{x}</option>)});
        
        return (
          <div className='Registro'>
              <form className="form-Conductor" method="get" name='login'>
                {this.getDatos()}
                <div>
                  <h1>Datos del Automovil</h1>
                  <input type="text" name="cellphone" placeholder='Placa*'/><br></br>
                  <input type="password" name="psw" placeholder='Modelo*'/><br></br>
                  <input type="text" name="nombre" placeholder='Marca*'/><br></br>
                  <select name="baul" defaultValue ="Select2">
                    <option value="Select2" disabled>Selecciona un tipo de baul:</option>
                    <option value="Grande">Grande</option>
                    <option value="Mediano">Mediano</option>
                    <option value="Pequeno">Pequeno</option>
                  </select><br></br>
                  <select name="year" defaultValue ="Select1">
                    <option value="Select1" disabled>Selecciona una fecha de fabricacion:</option>
                    {yearList}
                  </select><br></br>
                  <input type="text" name="direccion" placeholder='Direccion De Residencia'/><br></br>
                </div>
                <p>(*) Campos Obligatorios</p>
                <input type="submit" name="psw" value='Registrarse'/> 
              </form>
              
            </div>
        );
        
      default:     
          break;   
    }  
  }  
}

export default Registro;