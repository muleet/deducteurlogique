import React, { Component, Fragment } from "react";
// Importation de mon css
import "./css/reset.css"; // Reset de tout le css
import "./css/app.css";
import "./css/buttonMenu.css";
import "./css/color.css";
import "./css/deduction.css";
import "./css/inference.css";
// // Importation de mes composants
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
// Importation des pages
import Home from "./components/Pages/Home";
import CalculDesPropositions from "./components/Pages/CalculDesPropositions";
import FormalisationEnonces from "./components/Pages/FormalisationEnonces";
import CalculDesPredicats from "./components/Pages/CalculDesPredicats";
import Tutoriels from "./components/Pages/Tutoriels";
import MakeLocution from "./components/MakeLocution";

class App extends Component {
  render() {
    return (
      <Fragment>
        <Router>
          <div>
            <ul className="list-link">
              <Link to="/">Menu principal</Link>
              <Link to="/tuto">Qu'est-ce que... que sont...</Link>
              <Link to="/cdpro">Calcul des propositions</Link>
              <Link to="/fde">Formalisation des énoncés</Link>
              <Link to="/cdpre">Calcul des prédicats</Link>
            </ul>
            <Route exact={true} path="/" component={Home} />
            <Route path="/tuto" component={Tutoriels} />
            <Route path="/cdpro" component={CalculDesPropositions} />
            <Route path="/fde" component={FormalisationEnonces} />
            <Route path="/cdpre" component={CalculDesPredicats} />
            <footer>
              <MakeLocution />
            </footer>
          </div>
        </Router>
      </Fragment>
    );
  }
}

export default App;
