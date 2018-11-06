import React, { Component } from 'react';
import * as FoursquareAPI from './FoursquareAPI';
import escapeRegExp from 'escape-string-regexp'
import { Map, TileLayer, Marker, Popup, Tooltip } from 'react-leaflet';
import { locations } from './restaurantList'
import MapDetail from './MapDetail'
import './App.css';


// Rule: alertMessage must be cleared after resets
class App extends Component {
  /*
    ****State Contents****
        selectedRestaurant: data from a selected restaurant, for marker selection; object
        selectedRestaurantInfo: data from a selected restaurant, for popup info; object
        loaded: Logical statement to check if selectedRestaurantInfo is LOADED; boolean
        locations: Lists all locations available in the map; array
        locationMap: Lists ONLY the GPS cordinates for all locations; array
        query: Search Query; string
        result: Search Result; array
        noResult: Check if user is searching for a restaurant; boolean
        selected: Check if a selection is made; boolean
        currentPosition: Set the current position of the map (downtown Tracy); array
        alertType: Alert type (success, error, warning, info); string
        alertMessage: Alert message/detail; string
  */
  state = {
    selectedRestaurant: {},
    selectedRestaurantInfo: {},
    loaded: false,
    locations: locations,
    locationMap: locations.location,
    query: '',
    result: [],
    noResult: true,
    selected: false,
    currentPosition: [37.7383176, -121.4291585],
    alertType: '',
    alertMessage: ''
  }
  // Reset the map marker selection
  resetMap = () => {
    this.setState({ selected: false, alertMessage: '' })
  }
  // Reset the Selected Restaurant Info
  resetSelection = () => {
    this.setState({ selectedRestaurantInfo: {}, loaded: false, alertMessage: '' })
  }
  // Update the search query and search for restaurants
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
  // Updates the marker selection down to a specific restaurant, then centers the map towards that marker
  updateSelectedRestaurant = (data) => {
    this.setState({selectedRestaurant: data, selected: true, loaded: false, currentPosition: data.location}, () => {console.log(this.state.selectedRestaurant)})
  }
  // Fetch the restaurant via Foursquare API
  fetchRestaurant = (id) => {
    FoursquareAPI.getRestaurant(id)
    .then((res) => {this.setState({selectedRestaurantInfo: res})})
    .then(res => {
      if (this.state.selectedRestaurantInfo) {
        this.setState({loaded: true})
      } else {
        // its loaded, set state so content can load
        this.setState({loaded: false, alertType: 'error', alertMessage: 'Unable to fetch FourSquare Info, check console log for more information'})
      }
    })
  }
  getInfo() {
    console.log(this.state.selectedRestaurantInfo.response.venue.name);
  }
  render() {
    const { selectedRestaurant, locations, query, result, noResult, selected, currentPosition, selectedRestaurantInfo, loaded, alert, alertMessage } = this.state
    console.log(locations)
    let mapInfo;
    // if we have data loaded, then lets get the details :D
    if (loaded) {
      mapInfo = (
        <MapDetail foursquareInfo={selectedRestaurantInfo} />
      )
    } else {
      // no data inserted, then its either loading, or has an error. Display it to the user
      let message;
      if (alertMessage) {
        message = alertMessage
      } else {
        message = "Loading..."
      }
      mapInfo = (
        <p>{message}</p>
      )
    }
    return (
      <div className="App">
        <nav className="sidebar">
          <div className="sidebar-header">
            <h1 className="logo">Downtown Tracy Eats</h1>
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
            {result.length === 0 && !noResult && (
              <ul className="list-unstyled components results">
              <li>No results</li>
              </ul>
          )}
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
          <Marker key={`marker-${location.foursquareId}`} id={`marker-${location.foursquareId}`} position={location.location} onClick={(event) => this.fetchRestaurant(location.foursquareId)}>
          <Popup className="popup-content" id={location.foursquareId} key={`popup-${location.foursquareId}`}>
            { mapInfo }
          </Popup>
        </Marker>
        )}
        {!selected && noResult && locations.map((location) =>
          <Marker key={`marker-${location.foursquareId}`} id={`marker-${location.foursquareId}`} position={location.location} onClick={(event) => this.fetchRestaurant(location.foursquareId)} onPopupclose={(event) => this.resetSelection()}>
          <Popup className="popup-content" id={location.foursquareId} key={`popup-${location.foursquareId}`}>
            { mapInfo }
          </Popup>
        </Marker>
        )}
        {selected && Object.keys(selectedRestaurant).map(() =>
          <Marker position={selectedRestaurant.location} onClick={(event) => this.fetchRestaurant(selectedRestaurant.foursquareId)}>
          <Popup className="popup-content" id={selectedRestaurant.foursquareId} key={`popup-${selectedRestaurant.foursquareId}`}>
            { mapInfo }
          </Popup>
          </Marker>
        )}
        </Map>
      </div>
    );
  }
}

export default App;
