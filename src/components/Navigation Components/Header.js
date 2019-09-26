import React, { Fragment } from "react";
import { NavLink, withRouter } from "react-router-dom";
import ButtonNav from "./ButtonNav";
import LogIn from "../Users/LogIn";

class Header extends React.Component {
  state = { loginButtonDeployed: false };

  deployLogin() {
    let loginButtonDeployed = false;
    if (!this.state.loginButtonDeployed) {
      loginButtonDeployed = true;
    }
    this.setState({ loginButtonDeployed: loginButtonDeployed });
  }

  onLogOut = event => {
    this.props.logOut();
    this.props.history.push("/");
    event.preventDefault();
  };

  renderLoginAndSignUpButtons() {
    if (this.props.user._id) {
      // un utilisateur est loggé, on va afficher son nom et le bouton de LogOut
      return (
        <Fragment>
          <NavLink to={"/profile/" + this.props.user._id}>
            {this.props.user.username}
          </NavLink>
          <div
            className="nav-button header-button user-color"
            onClick={this.onLogOut}
          >
            <i className="fas fa-sign-out-alt" />
          </div>
        </Fragment>
      );
    } else {
      // aucun utilisateur n'est loggé, on va afficher le bouton de SignUp et le bouton de LogIn
      let loginButton = "";
      if (!this.state.loginButtonDeployed) {
        // l'utilisateur n'a pas encore cliqué sur le bouton de login
        loginButton = (
          <div
            className="fas fa-sign-in-alt icon nav-button header-button user-color unavailable-yet"
            id="icon-login-deployer"
            onClick={() => this.deployLogin()}
          />
        );
      } else if (this.state.loginButtonDeployed) {
        // l'utilisateur a cliqué sur le bouton de login
        loginButton = (
          <Fragment>
            <div
              className="fas fa-window-close icon nav-button header-button user-color unavailable-yet"
              id="icon-login-deployer"
              onClick={() => this.deployLogin()}
            />
            <LogIn
              // {...props}
              user={this.props.user}
              setUser={this.props.setUser}
            />
          </Fragment>
        );
      }
      return (
        <Fragment>
          {loginButton}
          <NavLink
            to=""
            // to="/sign_up"
          >
            <ButtonNav
              className="header-button user-color  unavailable-yet"
              name={<i className="fas fa-globe" />} // je savais pas quelle icône prendre pour signifier "créer un compte"
            />
          </NavLink>
        </Fragment>
      );
    }
  }

  render() {
    return (
      <header>
        <ul className="header-nav-list">
          {this.renderLoginAndSignUpButtons()}
          <NavLink to="/options">
            <ButtonNav
              className="header-button user-color unavailable-yet"
              name={<i className="fas fa-cog" />}
            />
          </NavLink>
          <NavLink to="/fallacies">
            <ButtonNav
              className="header-button"
              name={<i className="fas fa-umbrella" />}
            />
          </NavLink>
          <NavLink to="/omega">
            <ButtonNav className="header-button" name="Ω" />
          </NavLink>
          <NavLink to="/futur">
            <ButtonNav
              className="header-button"
              name={<i className="fas fa-flask" />}
            />
          </NavLink>
          <NavLink to="/auteurs_contact">
            <ButtonNav
              className="header-button"
              id="author-button"
              name={<i className="far fa-hand-rock" />}
            />
          </NavLink>
          <h1 className="website-title">
            déducteur et
            <br />
            formaliseur logique
            <div className="website-version">version 0.65b</div>
          </h1>
        </ul>
      </header>
    );
  }
}

export default withRouter(Header);
