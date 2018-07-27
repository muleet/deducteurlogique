import React, { Component, Fragment } from "react";
import {
  NavLink,
  withRouter,
  BrowserRouter as Router,
  Route,
  Link
} from "react-router-dom";
import Cookies from "js-cookie";

import ButtonMenu from "./ButtonMenu";

// Pages
import CalculDesPropositions from "../components/Pages/CalculDesPropositions";
import FormalisationEnonces from "../components/Pages/FormalisationEnonces";
import CalculDesPredicats from "../components/Pages/CalculDesPredicats";
import Tutoriels from "../components/Pages/Tutoriels";
import LogIn from "../components/Users/LogIn";
import SignUp from "../components/Users/SignUp";
import MakeListExercises from "../components/Pages/MakeListExercises";
import Home from "../components/Pages/Home";

class HeaderNav extends Component {
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
        <ul className="list-link">
          <Link to="/">Menu principal</Link>
          <Link to="/tuto">Qu'est-ce que... que sont...</Link>
          <Link to="/calcul-prop">Calcul des propositions</Link>
          <Link to="/calcul-prop-exo">Exercices des propositions</Link>
          <Link to="/fde">Formalisation des énoncés</Link>
          <Link to="/calcul-pred">Calcul des prédicats</Link>
          <Link to="/calcul-pred-exo">Exercices des prédicats</Link>
        </ul>
        <Route exact={true} path="/" component={Home} />
        <Route path="/tuto" component={Tutoriels} />
        <Route path="/calcul-prop" component={CalculDesPropositions} />
        <Route path="/calcul-prop-exo" component={MakeListExercises} />
        <Route path="/fde" component={FormalisationEnonces} />
        <Route path="/calcul-pred" component={CalculDesPredicats} />
        <Route path="/calcul-pred-exo" component={MakeListExercises} />
        <Route
          path="/sign_up"
          render={props => (
            <SignUp {...props} user={user} setUser={this.setUser} />
          )}
        />
        <Route
          path="/log_in"
          render={props => (
            <LogIn {...props} user={user} setUser={this.setUser} />
          )}
        />{" "}
      </Fragment>
    );
  }
}

export default HeaderNav;
