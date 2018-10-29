import React from 'react';
import L from 'leaflet';
class Map extends React.Component {
  componentDidMount() {
    // create map
    this.map = L.map('map', {
      center: [37.7383176, -121.4291585],
      zoom: 16,
      layers: [
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }),
      ]
    });
  }
  render() {
    return <div id="map"></div>
  }
}
export default Map;
