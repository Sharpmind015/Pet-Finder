import React, { useContext } from "react";
import { Link } from "@reach/router";
import ThemeContext from "./ThemeContext";

const Pet = props => {
  const { name, animal, breed, media, location, id } = props;
  const [theme] = useContext(ThemeContext);

  let hero = "http://placecorgi.com/300/300";
  if (media.length) {
    hero = media[0].small;
  }
  return (
    <div className="col-md-4">
      <div className="card mt-5 px-0 ">
        <div
          className="d-top py-5"
          style={{ backgroundColor: theme, color: "#fff", borderColor: theme }}
        />
        <img src={hero} alt="dog" className="img-fluid position-relative" />
        <h3 className="text-center">{name}</h3>
        <p className="text-center lead">
          {animal} || {breed} || {location}
        </p>
        <Link
          to={`/details/${id}`}
          className="btn btn-primary position-absolute"
          style={{ backgroundColor: theme, color: "#fff" }}
        >
          View
        </Link>
      </div>
    </div>
  );
};

export default Pet;
