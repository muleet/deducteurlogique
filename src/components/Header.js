import React, { Fragment } from "react";
import { NavLink, withRouter } from "react-router-dom";
import ButtonMenu from "./ButtonMenu";

class Header extends React.Component {
  onLogOut = event => {
    this.props.logOut();
    this.props.history.push("/");
    event.preventDefault();
  };
  renderNav() {
    if (this.props.user._id) {
      return (
        <React.Fragment>
          <li>
            <NavLink to={"/profile/" + this.props.user._id}>
              {this.props.user.username}
            </NavLink>
          </li>
          <li>
            <button onClick={this.onLogOut}>Déconnexion</button>
          </li>
        </React.Fragment>
      );
    }
    return (
      <Fragment>
        <NavLink to="/sign_up">
          <ButtonMenu
            className="header-button"
            name="Créer un compte (optionnel)"
          />
        </NavLink>
      </Fragment>
    );
  }
  render() {
    return (
      <header>
        <ul className="nav-list">
          <NavLink to="/log_in">
            <ButtonMenu className="header-button" name="Log in (optionnel)" />
          </NavLink>
          {this.renderNav()}
          <ButtonMenu className="header-button" name="Option" />
          <h1>
            déducteur et<br />formaliseur logique
          </h1>
          <ButtonMenu
            className="header-button"
            id="author-button"
            name={"Auteurs \n& contact"}
          />
        </ul>
      </header>
    );
  }
}

export default withRouter(Header);
