import React, { useState } from "react";
import { Link } from "@reach/router";
import Theme from "./Theme";

const NavLink = props => (
  <Link
    {...props}
    getProps={({ isCurrent }) => {
      return {
        style: {
          color: isCurrent ? "#4762ad" : "#1d1e25"
        }
      };
    }}
  />
);

const Header = () => {
  const [modal, setModal] = useState(false);
  return (
    <header className="container-fluid py-3 px-4">
      <nav className="row align-items-center justify-content-between">
        <a href="index.html" className="col-md-4 d-none d-md-inline-block">
          PET FINDER
        </a>
        <ul className="col-md-8 d-flex mb-0 justify-content-around">
          <li>
            <NavLink to="/" className="px-2">
              <i className="la la-home" />{" "}
              <span className="d-none d-md-inline-block">Home</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/favourites" className="px-2">
              <i className="la la-heart" />{" "}
              <span className="d-none d-md-inline-block">Favourites</span>
            </NavLink>
          </li>
          <li>
            <button
              className="px-2"
              onClick={() => {
                setModal(!modal);
              }}
            >
              <i className="la la-brush" />{" "}
              <span className="d-none d-md-inline-block">Theme</span>
            </button>
          </li>
        </ul>
      </nav>

      <Theme modal={modal} setModal={setModal} />
    </header>
  );
};

export default Header;
