import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MapDetail extends Component {
  static propTypes = {
    foursquareInfo: PropTypes.object
  }
  render() {
    const { foursquareInfo } = this.props
    let imageURL = foursquareInfo.response.venue.bestPhoto.prefix + "240x180" + foursquareInfo.response.venue.bestPhoto.suffix
    let address = foursquareInfo.response.venue.location.address + ", " + foursquareInfo.response.venue.location.city + ", " + foursquareInfo.response.venue.location.state
    let phone = foursquareInfo.response.venue.contact.phone

    if (!foursquareInfo.response.venue.location.address)
    {  address = "No address listed, " + foursquareInfo.response.venue.location.city + ", " + foursquareInfo.response.venue.location.state  }
    if (!foursquareInfo.response.venue.location.formattedPhone)
    {  phone = "No phone listed";  }

      return (
        <div>
        <h3>{foursquareInfo.response.venue.name}</h3>
          <img className="d-block w-100" src={imageURL} alt="First slide" />
          <p className="lead">{address}</p>
          <p>Price: <span class="text-success">{foursquareInfo.response.venue.price.message}</span></p>
          <p>Phone: {phone}</p>
          <small class="text-muted">Data retrieved from FourSquare</small>
        </div>
      )
  }
}
export default MapDetail
