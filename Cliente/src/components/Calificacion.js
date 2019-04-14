import React, { Component } from "react";
import "./Calificacion.css";
import star from "../images/estrella.svg";
import toaster from "toasted-notes";
import "toasted-notes/src/styles.css"; // optional styles

class Calificaion extends Component {
  constructor(props) {
    super(props);

    this.state = this.props.viaje;
    this.state.calificacion = 0;

    this.handleClick = this.handleClick.bind(this);
    this.seleccionar = this.seleccionar.bind(this);
    this.boton = this.boton.bind(this);
  }

  handleClick() {
    fetch("/finalizarViaje", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state)
    })
      .then(res => res.json())
      .then(res => {
        if (res[0].bool) {
          toaster.notify("   El viaje fue almacenado exitosamente!   ", {
            duration: 10000
          });
        } else {
          toaster.notify("   El viaje no pudo ser almacenado   ", {
            duration: 10000
          });
        }

        this.props.callback({
          pagina: "Menu-Usuario",
          cellphone: this.state.cellphone
        });
      });
  }

  seleccionar(event) {
    this.setState({
      calificacion: event.target.value
    });
  }

  boton() {
    if (this.state.calificacion !== 0) {
      return <button onClick={this.handleClick}>Finalizar Viaje </button>;
    }
  }

  render() {
    let numEstrellas = [1, 2, 3, 4, 5];
    const estrellas = numEstrellas.map(x => {
      if (x.toString() === this.state.calificacion) {
        return [
          <input
            type="radio"
            checked={true}
            value={x}
            onChange={this.seleccionar}
            key={x}
          />
        ];
      } else {
        return [
          <input
            type="radio"
            checked={false}
            value={x}
            onChange={this.seleccionar}
            key={x}
          />
        ];
      }
    });

    return (
      <div className="Calificacion">
        <h2>Porfavor califique la calidad del servicio:</h2>
        <div className="conte">
          <div className="puntu">{estrellas}</div>
          <div className="stars">
            <div>
              <img className="imagenes" src={star} alt="logoesc" />
            </div>
            <div>
              <img className="imagenes" src={star} alt="logoesc" />
              <img className="imagenes" src={star} alt="logoesc" />
            </div>
            <div>
              <img className="imagenes" src={star} alt="logoesc" />
              <img className="imagenes" src={star} alt="logoesc" />
              <img className="imagenes" src={star} alt="logoesc" />
            </div>
            <div>
              <img className="imagenes" src={star} alt="logoesc" />
              <img className="imagenes" src={star} alt="logoesc" />
              <img className="imagenes" src={star} alt="logoesc" />
              <img className="imagenes" src={star} alt="logoesc" />
            </div>
            <div>
              <img className="imagenes" src={star} alt="logoesc" />
              <img className="imagenes" src={star} alt="logoesc" />
              <img className="imagenes" src={star} alt="logoesc" />
              <img className="imagenes" src={star} alt="logoesc" />
              <img className="imagenes" src={star} alt="logoesc" />
            </div>
          </div>
        </div>
        {this.boton()}
      </div>
    );
  }
}
export default Calificaion;
