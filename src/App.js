import React, { Component } from 'react';
import logo from './logo.svg';
import Map from './Map'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <nav class="sidebar">
          <div class="sidebar-header">
            <h1 class="logo">Downtown Tracy Eats</h1>
          </div>
          <input type="text" class="form-control search-form" placeholder="Search" />
          <ul class="list-unstyled components results">
            <li>Restaurant 1</li>
            <li>Restaurant 2</li>
            <li>Restaurant 3</li>
            <li>Restaurant 4</li>
            <li>Restaurant 5</li>
          </ul>
        </nav>
        <Map />
      </div>
    );
  }
}

export default App;
