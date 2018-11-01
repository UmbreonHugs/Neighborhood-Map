import React, { Component } from 'react';

class MapDetail extends Component {
  render() {
    return (
      <div>
      <h1>Title</h1>
      <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img class="d-block w-100" src="https://via.placeholder.com/350" alt="First slide" />
            </div>
            <div class="carousel-item">
              <img class="d-block w-100" src="https://via.placeholder.com/350" alt="Second slide" />
            </div>
            <div class="carousel-item">
              <img class="d-block w-100" src="https://via.placeholder.com/350" alt="Third slide" />
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
        <p>Address</p>
      </div>
    )
  }
}
export default MapDetail
