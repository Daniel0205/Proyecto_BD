import React  from 'react';
import { Map , TileLayer, Marker, Popup } from 'react-leaflet';
import './Mapa.css';

const Geo = require('open-street-map-reverse-geo-node-client')
const reverse = new Geo.ReverseGeocoder()


class Mapa extends React.Component {
    constructor() {
        super()  
        this.state = {
            lat: 3.375120,
            lng: -76.537189,
            zoom: 15,
            currentPos: null 
          }
          this.mandarPos = this.mandarPos.bind(this);
          this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e){
      this.setState({
        lat: e.latlng.lat,
        lng: e.latlng.lng,
        currentPos: e.latlng });
      console.log(this.state);

      reverse.getReverse(this.state.currentPos.lat, this.state.currentPos.lng)
	  .then((location)=>{console.log(location.displayName)})
	  .catch(err=>{console.error(err)})
    }
    
    
    mandarPos(){
      this.props.callback({
        lat: this.state.currentPos.lat,
        lng: this.state.currentPos.lng
      });
    }

    render() {
        const position = [this.state.lat, this.state.lng]
        return (
          <Map center={position} zoom={this.state.zoom} onClick={this.handleClick} onSelect={this.mandarPos}>
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