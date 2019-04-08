import React from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import "./Mapa.css";
import L from 'leaflet';

const Geo = require("open-street-map-reverse-geo-node-client");
const reverse = new Geo.ReverseGeocoder();

class Mapa extends React.Component {
  constructor() {
    super();
    this.state = {
      lat: 3.37512,
      lng: -76.537189,
      zoom: 15,
      currentPos: null,
      markers: [],
      address: ''
    };
    this.handleClick = this.handleClick.bind(this);
  }

  //Funcion para capturar la latitud, la longitud y la direccion
  //respecto a un click en el mapa
  handleClick(e) {
    
    this.setState({ currentPos: e.latlng },()=>{
      reverse
        .getReverse(this.state.currentPos.lat, this.state.currentPos.lng)
        .then(location => {
          this.setState({address:location.displayName},
            ()=>{
            this.props.callback({
            latitud: this.state.currentPos.lat,
            longitud: this.state.currentPos.lng,
            descripcion: this.state.address
          })});
                
        })
        .catch(err => {
          console.error(err);
        });
      this.addMarker(e);
      }); 
  }

  //Funcion para añadir marcadores al mapa dinamicamente
  addMarker = e => {
    const { markers } = this.state;
    markers[0]=e.latlng;
    this.setState({ markers });
  };


  render() {
    const position = [this.state.lat, this.state.lng];
    const taxi = L.icon({
    iconUrl: 'taxi.png',iconSize: [50, 50],
    popupAnchor: [-10, -10], });
    
    return (
      <Map
        center={position}
        zoom={this.state.zoom}
        onClick={this.handleClick}
      >
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {this.state.markers.map((position, idx) => (
          <Marker key={`marker-${idx}`} position={position} icon={taxi} >
            <Popup>
              <span>
                {this.state.address}
              </span> 
            </Popup>
          </Marker>
        ))}
      </Map>
    );
  }
}

export default Mapa;
