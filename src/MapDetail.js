import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MapDetail extends Component {
  static propTypes = {
    location: PropTypes.object.isRequred
  }
  render() {
    const { location } = this.props
    return (
      <div>
      <h3>{location.name}</h3>
      <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img class="d-block w-100" src="https://via.placeholder.com/250" alt="First slide" />
            </div>
            <div class="carousel-item">
              <img class="d-block w-100" src="https://via.placeholder.com/250" alt="Second slide" />
            </div>
            <div class="carousel-item">
              <img class="d-block w-100" src="https://via.placeholder.com/250" alt="Third slide" />
            </div>
          </div>
          <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
          </a>
          <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
          </a>
        </div>
        <p className="lead">{location.address}</p>
      </div>
    )
  }
}
export default MapDetail
