import React, { useState, useEffect, useContext } from "react";
import pet, { ANIMALS } from "@frontendmasters/pet";
import useDropdown from "./useDropdown";
import Result from "./Result";
import ThemeContext from "./ThemeContext";

const SearchParams = () => {
  const [theme, setTheme] = useContext(ThemeContext);
  const location = "Seattle, WA";
  const [breeds, setBreeds] = useState([]);
  const [animal, , AnimalDropdown] = useDropdown("Animal", "dog", ANIMALS);
  const [breed, setBreed, BreedDropdown] = useDropdown("Breed", "", breeds);
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(false);

  async function requestPets() {
    setLoading(true);
    const { animals } = await pet.animals({
      location,
      breed,
      type: animal
    });
    setPets(animals || []);
    setLoading(false);
  }

  useEffect(
    () => {
      setBreeds([]);
      setBreed("");
      pet.breeds(animal).then(({ breeds }) => {
        const breedStrings = breeds.map(({ name }) => name);
        setBreeds(breedStrings);
      }, console.error);
    },
    [animal]
  );
  return (
    <main>
      <section className="hero position-relative py-5 px-md-4 container-fluid d-flex align-items-center justify-content-center ">
        <div className="overlay position-absolute" />
        <div className="w-100">
          <h1 className="text-center mb-2">Find a Pet</h1>
          <form
            className="row"
            onSubmit={e => {
              e.preventDefault();
              requestPets();
            }}
          >
            <AnimalDropdown />
            <BreedDropdown />
            <input
              type="submit"
              value="Find"
              className="btn btn-primary btn-block mx-3"
              style={{ backgroundColor: theme, color: "#fff" }}
            />
          </form>
        </div>
      </section>
      <Result pets={pets} loading={loading} />
    </main>
  );
};

export default SearchParams;
