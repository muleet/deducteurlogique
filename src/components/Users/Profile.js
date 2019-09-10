import React, { Component } from "react";
import axios from "axios";

// Fichier pratiquement copié/collé d'un autre projet (tout comme SignUp)

class Profile extends Component {
  state = {
    userExerciseSolved: ""
  };

  renderUserExercises(numExo) {
    return (
      <div className="main-profilePage">
        <li>Votre nom d'utilisateur est {this.props.user.username}</li>
        <li>Le dernier exercice résolu est [nombre].</li>
        <li>
          Vous avez créé
          {numExo} exercices.
        </li>
        <li>
          Votre meilleur temps dans le classement des sophismes est [nombres].
        </li>
      </div>
    );
  }

  render() {
    axios
      .get("http://localhost:5000/api/user/" + this.props.user._id)
      .then(response => {
        console.log("bonjour");
        console.log(response.data);
        this.setState({
          userExerciseSolved: response.data.userExercises.length
        });
      });
    return this.renderUserExercises(this.state.userExerciseSolved);
  }
}

export default Profile;
