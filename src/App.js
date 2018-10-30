import React, { Component } from 'react';
import * as FoursquareAPI from './FoursquareAPI';
import Map from './Map';
import Search from './Search';
import { locations } from './restaurantList'
import './App.css';

class App extends Component {
  state = {
    selectedRestaurant: [],
    locations: locations
  }
  componentDidMount() {
    //this.fetchRestaurant();
    console.log(this.state.locations)
  }
  fetchRestaurant = () => {
    FoursquareAPI.getRestaurant().then((response) => {this.setState({selectedRestaurant: response})})
    // console.log(this.state.selectedRestaurant.venue)
  }
  render() {
    const { selectedRestaurant, locations } = this.state
    return (
      <div className="App">
        <nav class="sidebar">
          <div class="sidebar-header">
            <h1 class="logo">Downtown Tracy Eats</h1>
            <p></p>
          </div>
          <Search locations={locations} />
        </nav>
        <Map />
      </div>
    );
  }
}

export default App;
