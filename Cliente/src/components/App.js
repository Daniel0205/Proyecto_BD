import React, { Component } from 'react';

import Header from './Global/Header'
import Content from './Global/Content'
import Footer from './Global/Footer';

class App extends Component {
  constructor(props){
    super(props)
    this.state={
      pagina:'Login'
    }

    this.recargar =this.recargar.bind(this)
  }

  recargar(log){
    this.setState({pagina:log.pagina});
  }

  render() {
    
    return (
      <div className="App">
        <Header pagina={this.state.pagina} callback={this.recargar} />
        <Content pagina={this.state.pagina}  callback={this.recargar}/>
        <Footer/>
      </div>
    );
  }
}

export default App;
