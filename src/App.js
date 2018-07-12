import React, { Component } from "react";
// Importation de mon css
import "./css/App.css";
import "./css/ButtonMenu.css";
import "./css/Color.css";
// Importation de mes composants
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
// Importation des pages
import Home from "./components/Pages/Home";
import CalculDesPropositions from "./components/Pages/CalculDesPropositions";
import FormalisationEnonces from "./components/Pages/FormalisationEnonces";
import CalculDesPredicats from "./components/Pages/CalculDesPredicats";
import Tutoriels from "./components/Pages/Tutoriels";

class App extends Component {
  render() {
    return (
      <div>
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
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
