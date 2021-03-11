import React from "react";
import ThemeContext from "./ThemeContext";

class Carousel extends React.Component {
  state = {
    photos: [],
    active: 0
  };
  static getDerivedStateFromProps({ media }) {
    let photos = ["http://placecorgi.com/600/600"];
    if (media.length) {
      photos = media.map(({ large }) => large);
    }
    return { photos };
  }
  handleArrowRight = () => {
    if (this.state.active >= this.state.photos.length - 1) {
      this.setState({ active: 0 });
    } else {
      this.setState({ active: this.state.active + 1 });
    }
  };
  handleArrowLeft = () => {
    if (this.state.active <= 0) {
      this.setState({ active: this.state.photos.length - 1 });
    } else {
      this.setState({ active: this.state.active - 1 });
    }
  };
  render() {
    const { photos, active } = this.state;
    return (
      <React.Fragment>
        <img
          src={photos[active]}
          className="img-fluid w-100 mt-3"
          alt="carousel"
        />
        <ThemeContext.Consumer>
          {([theme]) => (
            <div className="arrows d-flex justify-content-between align-items-center mt-3">
              <i
                className="la la-arrow-left"
                style={{ backgroundColor: theme }}
                onClick={this.handleArrowLeft}
              />
              <i
                className="la la-arrow-right"
                style={{ backgroundColor: theme }}
                onClick={this.handleArrowRight}
              />
            </div>
          )}
        </ThemeContext.Consumer>
      </React.Fragment>
    );
  }
}

export default Carousel;
