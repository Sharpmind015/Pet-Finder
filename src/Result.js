import React from "react";
import Pet from "./Pet";
import dog from "./img/dog2.png";

const Result = ({ pets, loading }) => {
  return (
    <section className="container-fluid mt-5">
      {loading && (
        <div className="loader d-flex position-fixed align-items-center justify-content-center w-100 h-100">
          <i className="la la-bone" />
        </div>
      )}
      <div className="row">
        {!pets.length ? (
          <div className="col-md-10 mx-auto py-4 text-center">
            <p className="lead">No Pets Found</p>
            <img src={dog} alt="No pets" />
          </div>
        ) : (
          pets.map((pet) => {
            return (
              <Pet
                animal={pet.type}
                key={pet.id}
                name={pet.name}
                breed={pet.breeds.primary}
                media={pet.photos}
                location={`${pet.contact.address.city}, ${pet.contact.address.state}`}
                id={pet.id}
              />
            );
          })
        )}
      </div>
    </section>
  );
};

export default Result;
