import React from "react";
import { navigate } from "@reach/router";
import pet from "@frontendmasters/pet";
import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoundary";
import ThemeContext from "./ThemeContext";
import Modal from "./Modal";

class Details extends React.Component {
  constructor() {
    super();
    this.state = { isLoading: true, favourite: false, showModal: false };
  }
  handleFavourites = () => {
    let newFavourite = {
      name: this.state.name,
      animal: this.state.animal,
      location: this.state.location,
      id: this.props.id,
      breed: this.state.breed,
      media: this.state.media
    };
    let favourites;
    if (this.state.favourite === false) {
      if (localStorage.getItem("favourites") === null) {
        favourites = [];
        favourites.push(newFavourite);
        localStorage.setItem("favourites", JSON.stringify(favourites));
      } else {
        favourites = JSON.parse(localStorage.getItem("favourites"));
        favourites.push(newFavourite);
        localStorage.setItem("favourites", JSON.stringify(favourites));
      }
    } else {
      favourites = JSON.parse(localStorage.getItem("favourites"));
      favourites.forEach((favourite, index) => {
        if (newFavourite.id === favourite.id) {
          favourites.splice(index, 1);
        }
      });
      localStorage.setItem("favourites", JSON.stringify(favourites));
    }
    this.setState({ favourite: !this.state.favourite });
  };
  componentDidMount() {
    pet
      .animal(+this.props.id)
      .then(({ animal }) => {
        this.setState({
          name: animal.name,
          animal: animal.type,
          location: `${animal.contact.address.city}, ${animal.contact.address
            .state}`,
          description: animal.description,
          media: animal.photos,
          breed: animal.breeds.primary,
          url: animal.url,
          isLoading: false
        });
      })
      .catch(err => this.setState({ error: err }));
    if (localStorage.getItem("favourites") === null) {
      console.log("no");
    } else {
      let favourites = JSON.parse(localStorage.getItem("favourites"));
      if (favourites.some(favourite => favourite.id === this.props.id)) {
        this.setState({ favourite: true });
      }
    }
  }
  toggleModal = () => this.setState({ showModal: !this.state.showModal });
  adopt = () => navigate(this.state.url);
  render() {
    if (this.state.isLoading) {
      return (
        <div className="container mt-5 mb-4">
          <div className="row">
            <div className="col-md-6">
              <div className="loading-line" style={{ minHeight: "350px" }} />
              <div className="arrows mt-3 d-flex justify-content-between mb-4">
                <div
                  className="loading-line"
                  style={{ minHeight: "50px", width: "50px" }}
                />
                <div
                  className="loading-line"
                  style={{ minHeight: "50px", width: "50px" }}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div
                className="w-100 loading-line"
                style={{ minHeight: "60px" }}
              />
              <div
                className="w-100 loading-line mt-4"
                style={{ minHeight: "50px" }}
              />
              <div
                className="w-50 loading-line mt-4"
                style={{ minHeight: "50px" }}
              />
              <div
                className="w-100 loading-line mt-4"
                style={{ minHeight: "100px" }}
              />
            </div>
          </div>
        </div>
      );
    }

    const {
      animal,
      name,
      location,
      breed,
      description,
      media,
      showModal
    } = this.state;
    return (
      <section className="mt-5 mb-4">
        <div className="pt-5 container position-relative">
          <i
            className={
              this.state.favourite ? (
                "active position-absolute favourites la la-heart"
              ) : (
                " position-absolute favourites la la-heart"
              )
            }
            onClick={() => {
              this.handleFavourites();
            }}
          />
          <div className="row">
            <div className="col-md-6">
              <Carousel media={media} />
            </div>
            <div className="col-md-6">
              <h1 className="d-inline-block">
                <span className="details-name">{name}</span>{" "}
                <span className="dot">.</span>{" "}
              </h1>
              <div className="details-info mt-4">{`${animal} - ${breed} - ${location}`}</div>
              <ThemeContext.Consumer>
                {([theme]) => (
                  <button
                    onClick={this.toggleModal}
                    style={{ backgroundColor: theme }}
                    className="btn btn-primary mt-4"
                  >
                    Adopt {name}
                  </button>
                )}
              </ThemeContext.Consumer>
              <p className="details-description mt-4">{description}</p>
            </div>
          </div>
        </div>
        {showModal ? (
          <Modal>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h4 className="modal-title">Adopt me</h4>
                </div>
                <div className="modal-body">
                  <h3 className="lead">Would you like to adopt {name} </h3>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-primary" onClick={this.adopt}>
                    Yes
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={this.toggleModal}
                  >
                    No
                  </button>
                </div>
              </div>
            </div>
          </Modal>
        ) : null}
      </section>
    );
  }
}

export default function DetailsErrorBoundary(props) {
  return (
    <ErrorBoundary>
      <Details {...props} />
    </ErrorBoundary>
  );
}
