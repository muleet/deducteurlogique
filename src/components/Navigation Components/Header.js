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
        <Fragment>
          <li>
            <NavLink to={"/profile/" + this.props.user._id}>
              {this.props.user.username}
            </NavLink>
          </li>
          <li>
            <button onClick={this.onLogOut}>
              <i className="fas fa-sign-out-alt" />
            </button>
          </li>
        </Fragment>
      );
    }
    return (
      <Fragment>
        <NavLink to="/sign_up">
          <ButtonNav
            className="header-button unavailable-yet"
            name={<i className="fas fa-globe" />} // je savais pas quelle icône prendre pour signifier "créer un compte"
          />
        </NavLink>
      </Fragment>
    );
  }
  render() {
    return (
      <header>
        <ul className="header-nav-list">
          <NavLink to="/log_in">
            <ButtonNav
              className="header-button unavailable-yet"
              name={<i className="fas fa-sign-in-alt" />}
            />
          </NavLink>
          {this.renderNav()}
          <NavLink to="/options">
            <ButtonNav
              className="header-button unavailable-yet"
              name={<i className="fas fa-cog" />}
            />
          </NavLink>
          <NavLink to="/omega">
            <ButtonNav className="header-button" id="author-button" name="Ω" />
          </NavLink>
          <NavLink to="/futur">
            <ButtonNav
              className="header-button"
              id="author-button"
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
            <div className="website-version">version 0.58b</div>
          </h1>
        </ul>
      </header>
    );
  }
}

export default withRouter(Header);
