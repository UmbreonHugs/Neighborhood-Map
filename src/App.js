import React, { Component } from 'react';
import * as FoursquareAPI from './FoursquareAPI';
import escapeRegExp from 'escape-string-regexp'
import { Map, TileLayer, Marker, Popup, Tooltip } from 'react-leaflet';
import { locations } from './restaurantList'
import MapDetail from './MapDetail'
import './App.css';

class App extends Component {
  state = {
    selectedRestaurant: {},
    selectedRestaurantInfo: {},
    locations: locations,
    locationMap: locations.location,
    query: '',
    result: [],
    noResult: true,
    selected: false,
    markerHighlight: '',
    currentPosition: [37.7383176, -121.4291585],
    alertType: '',
    alertMessage: ''
  }

  selectLocation = (id) => {
    this.setState({ markerHighlight: id })
    Map.openPopup(id);
    console.log(this.state.markerHighlight)
  }
  resetMap = () => {
    this.setState({ selected: false })
  }
  updateQuery = (query) => {
    this.setState({ query })
    if (query) {
        const match = new RegExp(escapeRegExp(query), 'i')
        let searchedLocation = this.state.locations.filter((location) => match.test(location.name) || match.test(location.tags))
        this.setState({result: searchedLocation, noResult: false, selected: false})
        // update location state
    /*    this.state.result.map(location => {
          L.marker([location.location.lat, location.location.lng]).addTo(this.map).bindPopup().openPopup();
        }) */
      } else {
        //let searchedLocation = this.props.locations
        this.setState({result: [], noResult: true, selected: false})
      }
    }
  updateSelectedRestaurant = (data) => {
    this.setState({selectedRestaurant: data, selected: true, currentPosition: data.location}, () => {console.log(this.state.selectedRestaurant)})
    console.log(data.location)
  }
  fetchRestaurant = (id) => {
    FoursquareAPI.getRestaurant(id).then((res) => {this.setState({selectedRestaurantInfo: res})})
  }
  getInfo() {
    console.log(this.state.selectedRestaurantInfo.response.venue.name);
  }
  render() {
    const { selectedRestaurant, locations, query, result, noResult, selected, currentPosition } = this.state
    return (
      <div className="App">
        <nav className="sidebar">
          <div className="sidebar-header">
            <h1 className="logo">Downtown Tracy Eats</h1>
            <a href="#" onClick={(event) => this.fetchRestaurant('5704519d498e87cf57eb55d5')}>Fetch Restaurant</a>
            <a href="#" onClick={(event) => this.getInfo()}>Info</a>
          </div>
          <input type="text" className="form-control search-form" placeholder="Search" value={query}
              onChange={(event) => this.updateQuery(event.target.value)} onClick={(event) => this.resetMap()}/>
            {result.length > 0 && (
            <ul className="list-unstyled components results">
              {result.map((location) => (
              <li key={location.foursquareId}><a href="#" onClick={(event) => this.updateSelectedRestaurant(location)}>{location.name}</a></li>
              ))}
            </ul>
          )}
          {noResult &&
            <ul className="list-unstyled components results">
              {locations.map((location) =>
                <li key={location.foursquareId}><a href="#" onClick={(event) => this.updateSelectedRestaurant(location)}>{location.name}</a></li>
              )}
            </ul>
            }
        </nav>
        <Map
          center={currentPosition}
          zoom={16}
          >
          <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
          />
        {!selected && result.map((location) =>
          <Marker key={`marker-${location.foursquareId}`} id={`marker-${location.foursquareId}`} position={location.location}>
          <Popup className="popup-content" id={location.foursquareId}>
            <MapDetail location={location} />
          </Popup>
        </Marker>
        )}
        {!selected && noResult && locations.map((location) =>
          <Marker key={`marker-${location.foursquareId}`} id={`marker-${location.foursquareId}`} position={location.location}>
          <Popup className="popup-content" id={location.foursquareId} key={`popup-${location.foursquareId}`} open="true">
            <MapDetail location={location} />
          </Popup>
        </Marker>
        )}
        {selected && Object.keys(selectedRestaurant).map(() =>
          <Marker position={selectedRestaurant.location}>
            <Popup className="popup-content" id={selectedRestaurant.foursquareId} open="true">
            <MapDetail location={selectedRestaurant}/>
            </Popup>
          </Marker>
        )}
        </Map>
      </div>
    );
  }
}

export default App;
