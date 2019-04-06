import React  from 'react';
import { Map , TileLayer, Marker, Popup } from 'react-leaflet';

import './Mapa.css';


class Mapa extends React.Component {
    constructor() {
        super()
        this.state = {
            lat: 51.505,
            lng: -0.09,
            zoom: 13,
          }
          this.mandarPos = this.mandarPos.bind(this);
    }
    
    mandarPos(){
      this.props.callback({
        lat: 51.505,
        lng: -0.09
      });
    }

    render() {
        const position = [this.state.lat, this.state.lng]
        return (
          <Map center={position} zoom={this.state.zoom} onSelect={this.mandarPos}>
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
          </Map>
        );
    }
}

export default Mapa;