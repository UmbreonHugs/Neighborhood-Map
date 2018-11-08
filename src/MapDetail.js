import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MapDetail extends Component {
  static propTypes = {
    foursquareInfo: PropTypes.object
  }
  render() {
    const { foursquareInfo } = this.props
    // put them into variables and add user friendlinesss
    let imageURL = foursquareInfo.response.venue.bestPhoto.prefix + "240x180" + foursquareInfo.response.venue.bestPhoto.suffix
    let address = foursquareInfo.response.venue.location.address + ", " + foursquareInfo.response.venue.location.city + ", " + foursquareInfo.response.venue.location.state
    let phone = foursquareInfo.response.venue.contact.formattedPhone
    let rating = foursquareInfo.response.venue.rating + " out of 10"

    // check if info is missing
    if (!foursquareInfo.response.venue.location.address)
    {  address = "No address listed, " + foursquareInfo.response.venue.location.city + ", " + foursquareInfo.response.venue.location.state  }
    if (!foursquareInfo.response.venue.contact.formattedPhone)
    {  phone = "No phone listed";  }
    if (!foursquareInfo.response.venue.rating)
    {  rating = "No rating provided"  }
      return (
        <div>
        <h3>{foursquareInfo.response.venue.name}</h3>
          <img className="d-block w-100" src={imageURL} alt={foursquareInfo.response.venue.name} />
          <p className="lead">{address}</p>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">Price: <span className="text-success">{foursquareInfo.response.venue.price.message}</span></li>
            <li className="list-group-item">Phone: {phone}</li>
            <li className="list-group-item">{foursquareInfo.response.venue.likes.count} people liked this place</li>
            <li className="list-group-item">Rating: {rating}</li>
          </ul>
          <small className="text-muted">Data retrieved from FourSquare</small>
        </div>
      )
  }
}
export default MapDetail
