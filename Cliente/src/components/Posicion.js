import React, { Component } from "react";
import "./Posicion.css";
import Mapa from "./Mapa";

class Posicion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cellphone: this.props.cellphone,
      tipo: this.props.tipo,
      seleccion: "",
      favoritos: [],
      check: false
    };

    this.handleChange = this.handleChange.bind(this);
    //this.seleccion = this.seleccion.bind(this);
    this.getFavoritos = this.getFavoritos.bind(this);
    this.handleSelectFav = this.handleSelectFav.bind(this);
    this.sacarInformacion = this.sacarInformacion.bind(this);
    this.setPosition = this.setPosition.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.getFavoritos();
  }

  handleChange(event) {
    this.setState({
      tipo: this.props.tipo,
      seleccion: event.target.value
    });
  }

  getFavoritos() {
    fetch("/favoritos", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ Username: this.state.cellphone })
    })
      .then(res => res.json())
      .then(res => this.setState({ favoritos: res[0].favoritos }))
      .then(res => {
        this.setState({
          favoritos: this.state.favoritos.map(x => {
            return (
              <option
                value={[x.longitud, x.latitud, x.direccion]}
                key={[x.latitud, x.longitud]}
              >
                {x.direccion}
              </option>
            );
          })
        });
      });
  }

  sacarInformacion(str, num) {
    let aux = "";

    for (let i = 0; i < str.length; i++) {
      if (str[i] === ",") {
        num = num - 1;
        if (num !== 0) {
          aux = "";
        } else break;
      } else {
        aux = aux + str[i];
      }
    }
    return aux;
  }

  handleSelectFav(event) {
    if (this.state.tipo === "origen") {
      this.props.callback({
        longitudOrigen: this.sacarInformacion(event.target.value, 1),
        latitudOrigen: this.sacarInformacion(event.target.value, 2),
        descripcionOrigen: this.sacarInformacion(event.target.value, 3),
        tipo: this.state.tipo,
        favoritosOrigen: false
      });
    } else {
      this.props.callback({
        longitudDestino: this.sacarInformacion(event.target.value, 1),
        latitudDestino: this.sacarInformacion(event.target.value, 2),
        descripcionDestino: this.sacarInformacion(event.target.value, 3),
        tipo: this.state.tipo,
        favoritosDestino: false
      });
    }
  }

  setPosition(event) {
    if (this.state.tipo === "origen") {
      this.props.callback({
        longitudOrigen: event.longitud,
        latitudOrigen: event.latitud,
        descripcionOrigen: event.descripcion,
        tipo: this.state.tipo,
        favoritosOrigen: this.state.check
      });
    } else {
      this.props.callback({
        longitudDestino: event.longitud,
        latitudDestino: event.latitud,
        descripcionDestino: event.descripcion,
        tipo: this.state.tipo,
        favoritosDestino: this.state.check
      });
    }
  }

  handleCheck(event) {
    this.setState(
      { check: !this.state.check },()=>{
        if (this.state.tipo === "origen") {
          this.props.callback({
            favoritosOrigen: this.state.check
          });
        } else {
          this.props.callback({
            favoritosDestino: this.state.check
          });
        }
      }
    );
  }

  render() {
    
    switch (this.state.seleccion) {
      case "mapa":
        return (
          <div className={this.state.tipo}>
            <h3>Ingrese {this.props.tipo}</h3>
            <input
              type="radio"
              value="mapa"
              checked={true}
              onChange={this.handleChange}
            />{" "}
            Seleccionar del mapa
            <br />
            <input
              type="checkbox"
              onChange={this.handleCheck}
              checked={this.state.check}
              value="add-fav"
            />{" "}
            Agregar a favoritos
            <br />
            <Mapa callback={this.setPosition} />
            <input
              type="radio"
              value="favoritos"
              checked={false}
              onChange={this.handleChange}
            />
            Seleccionar de favoritos
            <br />
          </div>
        );
      case "favoritos":
        return (
          <div className={this.props.tipo}>
            <h3>Ingrese {this.state.tipo}</h3>
            <input
              type="radio"
              value="mapa"
              checked={false}
              onChange={this.handleChange}
            />{" "}
            Seleccionar del mapa
            <br />
            <input
              type="radio"
              value="favoritos"
              checked={true}
              onChange={this.handleChange}
            />
            Seleccionar de favoritos
            <br />
            <select
              name="favoritos"
              defaultValue="Select"
              onChange={this.handleSelectFav}
            >
              <option value="Select" disabled>
                Selecciona un {this.props.tipo}:
              </option>
              {this.state.favoritos}
            </select>
            <br />
          </div>
        );
      default:
        return (
          <div className={this.props.tipo}>
            <h3>Ingrese {this.props.tipo}</h3>
            <input
              type="radio"
              value="mapa"
              checked={false}
              onChange={this.handleChange}
            />{" "}
            Seleccionar del mapa
            <br />
            <input
              type="radio"
              value="favoritos"
              checked={false}
              onChange={this.handleChange}
            />
            Seleccionar de favoritos
            <br />
          </div>
        );
    }
  }
}
export default Posicion;
