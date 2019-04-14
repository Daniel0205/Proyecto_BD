import React, { Component } from "react";
import "./Login.css";
import toaster from "toasted-notes";
import "toasted-notes/src/styles.css"; // optional styles

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cellphone: "",
      psw: ""
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleClick() {
    this.props.callback({ pagina: "Registro" });
  }

  handleSubmit(event) {
    event.preventDefault();
    var expreg = /^[0-9]{10}$/;

    if (expreg.test(this.state.cellphone) || this.state.cellphone === "1234") {
      const { cellphone, psw } = this.state;
      fetch("/login", {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ Username: cellphone, Password: psw })
      })
        .then(res => res.json())
        .then(res => {
          this.setState(res[0], () => {
            if (this.state.login) {
              this.props.callback({
                cellphone: this.state.cellphone,
                pagina: "Menu-" + this.state.user
              });
            } else {
              toaster.notify("   Usuario o contraseña incorrecto    ");
            }
          });
        });
    } else {
      toaster.notify("   El celular deben ser 10 numeros    ");
    }
  }

  //Funcion para actualizar las variables ingresadas en el login
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { cellphone, psw } = this.state;
    return (
      <div className="loginp">
        <form className="form" name="login" onSubmit={this.handleSubmit}>
          <h1>Login</h1>
          <p>Celular:</p>
          <input
            type="text"
            name="cellphone"
            placeholder="Numero de telefono"
            value={cellphone}
            onChange={this.onChange}
          />
          <p>Contraseña:</p>
          <i className="logo" />
          <input
            type="password"
            name="psw"
            placeholder="Password"
            value={psw}
            onChange={this.onChange}
          />
          <br />
          <input type="submit" name="submit" value="Ingresar" />
        </form>
        <div className="registro">
          <p>No tienes una cuenta?</p>
          <button onClick={this.handleClick}>Regristrarse</button>
        </div>
      </div>
    );
  }
}
export default Login;
