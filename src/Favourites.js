import React, { useContext } from "react";
import Pet from "./Pet";
import ThemeContext from "./ThemeContext";

const Favourites = () => {
  const [theme] = useContext(ThemeContext);
  let favourites;
  if (localStorage.getItem("favourites") === null) {
    console.log("no");
    favourites = null;
  } else {
    favourites = JSON.parse(localStorage.getItem("favourites"));
  }
  if (!favourites || !favourites.length) {
    return (
      <section className="mb-5">
        <h1
          className="py-4 text-center text-white"
          style={{ backgroundColor: theme, color: "#fff" }}
        >
          Your favourites
        </h1>
        <div className="container">
          <div className="mt-4">
            <p className="lead text-center">You have no saved pet</p>
          </div>
        </div>
      </section>
    );
  }
  return (
    <section className="mb-5">
      <h1
        className="py-4 text-center text-white"
        style={{ backgroundColor: theme, color: "#fff" }}
      >
        Your favourites
      </h1>
      <div className="container">
        <div className="mt-4 row">
          {}
          {favourites.map(favourite => {
            const { name, media, animal, breed, location, id } = favourite;
            return (
              <Pet
                name={name}
                animal={animal}
                breed={breed}
                media={media}
                location={location}
                id={id}
                key={id}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};
export default Favourites;
