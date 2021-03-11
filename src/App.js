import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Router } from "@reach/router";
import "./vendors/line-awesome/css/line-awesome.min.css";
import "./vendors/bootstrap.min.css";
import "./styles/style.css";
import Header from "./Header";
import SearchParams from "./SearchParams";
import Details from "./Details";
import Favourites from "./Favourites";
import ThemeContext from "./ThemeContext";

const App = () => {
  const theme = useState("#4762ad");
  return (
    <ThemeContext.Provider value={theme}>
      <React.Fragment>
        <React.StrictMode>
          <Header />
          <Router>
            <SearchParams path="/" />
            <Details path="/details/:id" />
            <Favourites path="/favourites" />
          </Router>
        </React.StrictMode>
      </React.Fragment>
    </ThemeContext.Provider>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
