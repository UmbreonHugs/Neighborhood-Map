import React, { Component } from 'react'
import escapeRegExp from 'escape-string-regexp'
import PropTypes from 'prop-types'
import { map } from './Map';
class Search extends Component {
  static propTypes = {
    locations: PropTypes.array.isRequred
  }
  state = {
    query: ''
  }
  updateQuery = (query) => {
    this.setState({query: query.trim()})
  }
  // on search query update, search for it within the "location"
  render() {
    const { query } = this.state
    const { locations } = this.props
    let searchedLocation;
    if (query) {
      const match = new RegExp(escapeRegExp(query), 'i')
      searchedLocation = locations.filter((location) => match.test(location.name) || match.test(location.tags))
      // update location state
    } else {
      searchedLocation = locations
    }
    return (
      <div>
          <input type="text" class="form-control search-form" placeholder="Search" value={query}
            onChange={(event) => this.updateQuery(event.target.value)} />
          <ul class="list-unstyled components results">
            {searchedLocation.map((location) => (
            <li key={location.foursquareId}>{location.name}</li>
            ))}
          </ul>
      </div>
    )
  }
}

export default Search
