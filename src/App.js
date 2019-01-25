import React, { Component, Fragment } from "react";
// Importation de mon css
import "./reset.css"; // Reset de tout le css
import "./css/advice.css";
import "./css/app.css";
import "./css/buttonMenu.css";
import "./css/buttonRule.css";
import "./css/deduction.css";
import "./css/exerciseList.css";
import "./css/inference.css";
import "./css/rulePopover.css";
import "./css/ruleModal.css";
import "./css/questions.css";
import "./css/sandbox.css";
import "./css/showInfoRules.css";
import "./css/truthTable.css";
import "./css/color.css";
import "./css/media queries/mediaqueries.css";
// Importation de fonts
import "./font/stylesheet.css";
// // Importation de mes composants
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Cookies from "js-cookie";
import MakeLocution from "./components/MakeLocution";
import Header from "./components/Navigation Components/Header"; // commenté pour le moment
// Importation des pages
import Home from "./components/Pages/Home";
import CalculDesPropositions from "./components/Pages/CalculDesPropositions";
import FormalisationEnonces from "./components/Pages/FormalisationEnonces";
import CalculDesPredicats from "./components/Pages/CalculDesPredicats";
import InfoRules from "./components/Pages/InfoRules.js";
import Questions from "./components/Pages/Questions.js";
import AuthorsAndContact from "./components/Pages/Secondary Pages/AuthorsAndContact";
import TheFuture from "./components/Pages/Secondary Pages/TheFuture";
import greekAlphabet from "./components/Pages/Secondary Pages/greekAlphabet";
// Importations d'autres trucs
// import LogIn from "./components/Users/LogIn";
// import SignUp from "./components/Users/SignUp";
import MakeListExercises from "./components/Pages/MakeListExercises";
import ButtonNav from "./components/Navigation Components/ButtonNav";
import TruthTable from "./components/Pages/TruthTable";
import Sandbox from "./components/Pages/Sandbox";
// Images
// import athens from "./img/athens.svg";

class App extends Component {
  // Code importé ci-dessous
  state = {
    user: {
      token: Cookies.get("token") || "",
      username: Cookies.get("username") || "",
      _id: Cookies.get("_id") || ""
    }
  };

  setUser = user => {
    Cookies.set("token", user.token);
    Cookies.set("username", user.username);
    Cookies.set("_id", user._id);

    this.setState({
      user: user
    });
  };

  logOut = () => {
    Cookies.remove("token");
    Cookies.remove("username");
    Cookies.remove("_id");

    this.setState({
      user: { token: "", username: "", _id: "" }
    });
  };
  // Code importé ci-dessus

  render() {
    const { user } = this.state;

    return (
      <Fragment>
        <Router>
          <div>
            <Header user={user} logOut={this.logOut} />
            {/* cette ligne hyper importante active le composant du Header, et ce avec des props spécifiques.*/}
            <ul className="nav-list">
              <li>
                <Link to="/">
                  {/* <img className="flag anarchy" src={athens} alt="" /> */}
                  <ButtonNav
                    name={<i className="fas fa-home" />}
                    className="flag anarchy"
                    // className="flag-anarchist"
                    exact={true}
                  />
                </Link>
                <Link to="/questions">
                  <ButtonNav
                    className="tutorial-button"
                    // className="info-color"
                    name={
                      "Q"
                      // <i
                      //   className="fas fa-question"
                      //   id="interrogation-mark-1"
                      // />
                    }
                  />
                </Link>
                <Link to="/règles">
                  <ButtonNav
                    className="tutorial-button"
                    // className="info-color"
                    name={
                      "R"
                      // <i
                      //   className="fas fa-question"
                      //   id="interrogation-mark-2"
                      // />
                    }
                  />
                </Link>
                <Link to="/tables-de-vérité">
                  <ButtonNav
                    className="tutorial-button"
                    // className="info-color"
                    name={
                      "T"
                      // <i
                      //   className="fas fa-question"
                      //   id="interrogation-mark-2"
                      // />
                    }
                  />
                </Link>
                {/* <Link to="/tutoriel">
                  <ButtonNav
                    className="tutorial-button unavailable-yet"
                    // className="info-color"
                    name={
                      "T"
                      // <i
                      //   className="fas fa-question"
                      //   id="interrogation-mark-2"
                      // />
                    }
                  />
                </Link> */}
              </li>
              <li>
                <Link to="/bac-à-sable-logique">
                  <ButtonNav name={<i className="fas fa-terminal" />} />
                </Link>
              </li>
              <li>
                <Link to="/calcul-prop-exo">
                  <ButtonNav
                    className="prop-color"
                    name={<i className="fas fa-th" />}
                  />
                </Link>
              </li>
              <li>
                <Link to="/forma-exo">
                  <ButtonNav
                    className="forma-color unavailable-yet"
                    name={<i className="fas fa-th" />}
                  />
                </Link>
              </li>
              <li>
                <Link to="/calcul-pred-exo">
                  <ButtonNav
                    className="pred-color unavailable-yet"
                    name={<i className="fas fa-th" />}
                  />
                </Link>
              </li>
            </ul>
            <ul />
            <Route exact={true} path="/" component={Home} />
            <Route path="/questions" component={Questions} />
            <Route path="/règles" component={InfoRules} />
            <Route path="/tables-de-vérité" component={TruthTable} />
            <Route path="/bac-à-sable-logique" component={Sandbox} />
            <Route path="/omega" component={greekAlphabet} />
            {/* <Route path="/tutoriel" component={Tutoriel} /> */}
            <Route
              path="/calcul-prop/:num"
              render={props => <CalculDesPropositions {...props} user={user} />}
            />
            <Route path="/calcul-prop-exo" component={MakeListExercises} />
            <Route path="/forma/:num" component={FormalisationEnonces} />
            <Route path="/forma-exo" />
            <Route path="/calcul-pred/:num" component={CalculDesPredicats} />
            <Route path="/calcul-pred-exo" />
            <Route
              path="/sign_up"
              // render={props => (
              //   <SignUp {...props} user={user} setUser={this.setUser} />
              // )}
            />
            <Route
              path="/log_in"
              // render={props => (
              //   <LogIn {...props} user={user} setUser={this.setUser} />
              // )}
            />
            <Route path="/auteurs_contact" component={AuthorsAndContact} />
            <Route path="/futur" component={TheFuture} />

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
