import React, { Fragment } from "react";
import axios from "axios";

// Fichier pratiquement copié/collé d'un autre projet (tout comme LogIn)

class SignUp extends React.Component {
  state = {
    email: "",
    password: "",
    username: ""
  };

  handleChange = event => {
    const target = event.target;
    const name = target.name;
    const value = target.type === "checkbox" ? target.checked : target.value;

    this.setState({
      [name]: value
    });
  };

  onSubmit = event => {
    axios
      .post("http://localhost:3001/api/user/sign_up", {
        email: this.state.email,
        password: this.state.password,
        username: this.state.username
      })
      .then(response => {
        console.log(response.data);
        // {
        //   account: { username: "Farid" },
        //   token: "Ii0HYfXTN7L2SMoL",
        //   _id: "5b4ceb668c2a9a001440b2fb"
        // };

        if (response.data && response.data.token) {
          this.props.setUser({
            token: response.data.token,
            username: response.data.account.username,
            _id: response.data._id
          });

          this.props.history.push("/");
        }
      })
      .catch(err => {
        console.log(err);
      });
    event.preventDefault();
  };

  render() {
    return (
      <Fragment>
        <main>
          <form onSubmit={this.onSubmit} className="form-signup-set">
            <label htmlFor="email">email</label>
            <input
              className="form-singleLine user-color"
              id="email"
              name="email"
              type="text"
              value={this.state.email}
              onChange={this.handleChange}
            />
            <label htmlFor="email">mot de passe</label>
            <input
              className="form-singleLine user-color"
              id="password"
              name="password"
              type="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
            <label htmlFor="username">nom d'utilisateur</label>
            <input
              className="form-singleLine user-color"
              id="username"
              name="username"
              type="text"
              value={this.state.username}
              onChange={this.handleChange}
            />
            <input
              type="submit"
              value="Valider"
              className="form-submit-line user-color"
            />
          </form>
        </main>
      </Fragment>
    );
  }
}

export default SignUp;
