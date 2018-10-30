import React from 'react';
import L from 'leaflet';
import PropTypes from 'prop-types'

class Map extends React.Component {
  static propTypes = {
    locations: PropTypes.array.isRequred
  }
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
    this.props.locations.map(location => {
      L.marker([location.location.lat, location.location.lng]).addTo(this.map).bindPopup(location.name).openPopup();;
    })
  }
  render() {
    return <div id="map"></div>
  }
}
export default Map;
