import React from "react";
import axios from "axios";

// Fichier pratiquement copié/collé d'un autre projet (tout comme SignUp)

class LogIn extends React.Component {
  state = {
    email: "email",
    password: "mot de passe",
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
      // le site lui-même
      .post("http://deducteurlogique-api.herokuapp.com/api/user/log_in", {
        // quand je suis en local
        // .post("http://localhost:5000/api/user/log_in", {
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
    let typeInputPassword = "text";
    if (this.state.password !== "mot de passe") {
      typeInputPassword = "password";
    }
    return (
      <form onSubmit={this.onSubmit} className="form-login-set">
        {/* <label htmlFor="email">Email</label> */}
        <input
          className="form-singleLine user-color unavailable-yet"
          id="email"
          name="email"
          type="text"
          value={this.state.email}
          onChange={this.handleChange}
        />
        {/* <label htmlFor="email">password</label> */}
        <input
          className="form-singleLine user-color unavailable-yet"
          id="password"
          name="password"
          type={typeInputPassword}
          value={this.state.password}
          onChange={this.handleChange}
        />
        {/* <label htmlFor="username">username</label>
        <input
          id="username"
          name="username"
          type="text"
          value={this.state.username}
          onChange={this.handleChange}
        /> */}
        <input
          type="submit"
          value="Valider"
          className="form-submit-line user-color unavailable-yet"
        />
      </form>
    );
  }
}

export default LogIn;
