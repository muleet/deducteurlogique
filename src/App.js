import React, { Component, Fragment } from "react";
// Importation de mon css
import "./reset.css"; // Reset de tout le css
import "./css/advice.css";
import "./css/animation.css";
import "./css/app.css";
import "./css/BasicReactModal.css";
import "./css/buttonMenu.css";
import "./css/buttonRule.css";
import "./css/deduction.css";
import "./css/exerciseList.css";
import "./css/fallacies.css";
import "./css/inference.css";
import "./css/rulePopover.css";
import "./css/ruleModal.css";
import "./css/questions.css";
import "./css/sandbox.css";
import "./css/showInfoRules.css";
import "./css/truthTable.css";
import "./css/user.css";
import "./css/color.css";
import "./css/media queries/mediaqueries.css";
// Importation de fonts
import "./font/stylesheet.css";
// // Importation de mes composants
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Cookies from "js-cookie";
import MakeLocution from "./components/MakeLocution";
import Header from "./components/Navigation Components/Header";
// Importation des pages
import Home from "./components/Pages/Home";
import CalculDesPropositions from "./components/Pages/CalculDesPropositions";
import FormalisationEnonces from "./components/Pages/FormalisationEnonces";
import CalculDesPredicats from "./components/Pages/CalculDesPredicats";
import ShowInfoRules from "./components/Pages/ShowInfoRules.js";
import ShowQuestions from "./components/Pages/ShowQuestions.js";
import AuthorsContactAndSources from "./components/Pages/Secondary Pages/AuthorsContactAndSources";
import TheFuture from "./components/Pages/Secondary Pages/TheFuture";
import greekAlphabet from "./components/Pages/Secondary Pages/greekAlphabet";
import Locutions from "./components/Pages/Secondary Pages/Locutions";
// Importations d'autres trucs
// import LogIn from "./components/Users/LogIn";
import Profile from "./components/Users/Profile";
import SignUp from "./components/Users/SignUp";
import MakeListExercises from "./components/Pages/MakeListExercises";
import MakeListExercisesOfUser from "./components/Pages/MakeListExercisesOfUser";
import ButtonNav from "./components/Navigation Components/ButtonNav";
import TruthTable from "./components/Pages/ShowTruthTable";
import Sandbox from "./components/Pages/Sandbox";
import ShowFallacies from "./components/Pages/ShowFallacies";
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
            <Header user={user} logOut={this.logOut} setUser={this.setUser} />
            {/* cette ligne hyper importante active le composant du Header, et ce avec des props spécifiques.*/}
            <ul className="nav-list">
              <li>
                <Link to="/">
                  {/* <img className="flag anarchy" src={athens} alt="" /> */}
                  <ButtonNav
                    name={<i className="fas fa-home" />}
                    className="flag anarchy"
                    exact={true}
                  />
                </Link>
              </li>
              <li>
                <Link to="/questions">
                  <ButtonNav className="info-button" name={"Q"} />
                </Link>
                <Link to="/règles">
                  <ButtonNav className="info-button" name={"R"} />
                </Link>
                <Link to="/table-de-vérité">
                  <ButtonNav className="info-button" name={"T"} />
                </Link>
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
                <Link to="/calcul-prop-exo-user">
                  <ButtonNav
                    className="user-color"
                    name={<i className="fas fa-user" />}
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
            <Route exact={true} path="/" component={Home} />
            <Route path="/questions" component={ShowQuestions} />
            <Route path="/règles" component={ShowInfoRules} />
            <Route path="/table-de-vérité" component={TruthTable} />
            <Route path="/bac-à-sable-logique" component={Sandbox} />
            <Route path="/omega" component={greekAlphabet} />
            <Route path="/locutions" component={Locutions} />
            <Route path="/fallacies" component={ShowFallacies} />
            {/* <Route path="/tutoriel" component={Tutoriel} /> */}
            <Route
              path="/calcul-prop/:num"
              render={props => <CalculDesPropositions {...props} user={user} />}
            />
            <Route path="/calcul-prop-exo" component={MakeListExercises} />
            <Route
              path="/calcul-prop-exo-user"
              component={MakeListExercisesOfUser}
            />
            <Route path="/forma/:num" component={FormalisationEnonces} />
            <Route path="/forma-exo" />
            <Route path="/calcul-pred/:num" component={CalculDesPredicats} />
            <Route path="/calcul-pred-exo" />
            <Route
              path="/sign_up"
              render={props => (
                <SignUp {...props} user={user} setUser={this.setUser} />
              )}
            />
            {/* <Route
              path="/log_in"
              render={props => (
                <LogIn {...props} user={user} setUser={this.setUser} />
              )}
            /> */}
            <Route
              path="/profile"
              render={props => (
                <Profile {...props} user={user} setUser={this.setUser} />
              )}
            />
            <Route
              path="/auteurs_contact"
              component={AuthorsContactAndSources}
            />
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
