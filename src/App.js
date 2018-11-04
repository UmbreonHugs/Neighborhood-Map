import React, { Component } from 'react';
import * as FoursquareAPI from './FoursquareAPI';
import escapeRegExp from 'escape-string-regexp'
import { Map, TileLayer, Marker, Popup, Tooltip } from 'react-leaflet';
import { locations } from './restaurantList'
import MapDetail from './MapDetail'
import './App.css';

class App extends Component {
  state = {
    selectedRestaurant: [],
    locations: locations,
    locationMap: locations.location,
    query: '',
    result: [],
    noResult: true,
    selected: false,
    markerHighlight: ''
  }

  selectLocation = (id) => {
    this.setState({ markerHighlight: id })
    Map.openPopup('test');
    console.log(this.state.markerHighlight)
  }
  updateQuery = (query) => {
    this.setState({ query })
    if (query) {
        const match = new RegExp(escapeRegExp(query), 'i')
        let searchedLocation = this.state.locations.filter((location) => match.test(location.name) || match.test(location.tags))
        this.setState({result: searchedLocation, noResult: false})
        // update location state
    /*    this.state.result.map(location => {
          L.marker([location.location.lat, location.location.lng]).addTo(this.map).bindPopup().openPopup();
        }) */
      } else {
        //let searchedLocation = this.props.locations
        this.setState({result: [], noResult: true})
      }
    }
  updateSelectedRestaurant = (data) => {
    this.setState({selectedRestaurant: data})
  }
  fetchRestaurant = () => {
    FoursquareAPI.getRestaurant().then((response) => {this.setState({selectedRestaurant: response})})
    // console.log(this.state.selectedRestaurant.venue)
  }
  render() {
    const { selectedRestaurant, locations, query, result, noResult, selected } = this.state
    return (
      <div className="App">
        <nav className="sidebar">
          <div className="sidebar-header">
            <h1 className="logo">Downtown Tracy Eats</h1>
            <p></p>
          </div>
          <input type="text" className="form-control search-form" placeholder="Search" value={query}
              onChange={(event) => this.updateQuery(event.target.value)} />
            {result.length > 0 && (
            <ul className="list-unstyled components results">
              {result.map((location) => (
              <li key={location.foursquareId}>{location.name}</li>
              ))}
            </ul>
          )}
          {noResult &&
            <ul className="list-unstyled components results">
              {locations.map((location) =>
                <li key={location.foursquareId}><a href="#" onClick={(event) => this.selectLocation(location.foursquareId)}>{location.name}</a></li>
              )}
            </ul>
            }
        </nav>
        <Map
          center={[37.7383176, -121.4291585]}
          zoom={16}
          >
          <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
          />
        {result.map((location) =>
          <Marker key={`marker-${location.foursquareId}`} id={`marker-${location.foursquareId}`} position={location.location}>
          <Popup className="popup-content" id={location.foursquareId}>
            <MapDetail />
          </Popup>
        </Marker>
        )}
        {noResult && locations.map((location) =>
          <Marker key={`marker-${location.foursquareId}`} id={`marker-${location.foursquareId}`} position={location.location}>
          <Popup className="popup-content" id={location.foursquareId} key={`popup-${location.foursquareId}`} open="true">
            <MapDetail />
          </Popup>
        </Marker>
        )}
        </Map>
      </div>
    );
  }
}

export default App;
