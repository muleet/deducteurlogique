import React, { Fragment } from "react";
import { NavLink, withRouter } from "react-router-dom";
import ButtonNav from "./ButtonNav";

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
            <button onClick={this.onLogOut}>
              <i class="fas fa-sign-out-alt" />
            </button>
          </li>
        </React.Fragment>
      );
    }
    return (
      <Fragment>
        <NavLink to="/sign_up">
          <ButtonNav
            className="header-button"
            name={<i class="fas fa-globe" />} // je savais pas quelle icône prendre pour signifier "créer un compte"
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
            <ButtonNav
              className="header-button"
              name={<i class="fas fa-sign-in-alt" />}
            />
          </NavLink>
          {this.renderNav()}
          <ButtonNav
            className="header-button"
            name={<i class="fas fa-wrench" />}
          />
          <NavLink to="/auteurs_contact">
            <ButtonNav
              className="header-button"
              id="author-button"
              name={<i class="fas fa-address-book" />}
            />
          </NavLink>
          <h1>
            déducteur et<br />formaliseur logique
          </h1>
        </ul>
      </header>
    );
  }
}

export default withRouter(Header);
