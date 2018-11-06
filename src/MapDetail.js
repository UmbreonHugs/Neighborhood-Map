import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MapDetail extends Component {
  static propTypes = {
    location: PropTypes.object.isRequred,
    foursquareInfo: PropTypes.object
  }

  render() {
    const { location, foursquareInfo } = this.props
    let imageURL = foursquareInfo.response.venue.bestPhoto.prefix + "300x300" + foursquareInfo.response.venue.bestPhoto.suffix
    let address = foursquareInfo.response.venue.location.address + ", " + foursquareInfo.response.venue.location.city + ", " + foursquareInfo.response.venue.location.state
      return (
        <div>
        <h3>{foursquareInfo.response.venue.name}</h3>
          <img className="d-block w-100" src={imageURL} alt="First slide" />
          <p className="lead">{address}</p>
          <p className="lead">{foursquareInfo.response.venue.contact.phone}</p>
        </div>
      )
  }
}
export default MapDetail
