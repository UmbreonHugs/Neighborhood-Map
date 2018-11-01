import React, { Component } from 'react'
import escapeRegExp from 'escape-string-regexp'
import PropTypes from 'prop-types'
import { map } from './Map';
import L from 'leaflet';
class Search extends Component {
  static propTypes = {
    locations: PropTypes.array.isRequred
  }
  state = {
    query: '',
    result: [],
    noResult: true
  }
  updateQuery = (query) => {
    this.setState({ query })
    if (query) {
        const match = new RegExp(escapeRegExp(query), 'i')
        let searchedLocation = this.props.locations.filter((location) => match.test(location.name) || match.test(location.tags))
        this.setState({result: searchedLocation, noResult: false})
        // update location state
    } else {
      //let searchedLocation = this.props.locations
        this.setState({result: [], noResult: true})
    }
  }
  // on search query update, search for it within the "location"
  render() {
    const { query, result, noResult } = this.state
    const { locations } = this.props
    return (
      <div>
          <input type="text" class="form-control search-form" placeholder="Search" value={query}
            onChange={(event) => this.updateQuery(event.target.value)} />
          {result.length > 0 && (
          <ul class="list-unstyled components results">
            {result.map((location) => (
            <li key={location.foursquareId}>{location.name}</li>
            ))}
          </ul>
        )}
        {noResult &&
          <ul class="list-unstyled components results">
            {locations.map((location) =>
              <li key={location.foursquareId}>{location.name}</li>
            )}
          </ul>
          }
      </div>
    )
  }
}

export default Search
