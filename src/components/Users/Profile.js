import React, { Component, Fragment } from "react";
import axios from "axios";

// Fichier pratiquement copié/collé d'un autre projet (tout comme SignUp)

class Profile extends Component {
  render() {
    axios.get("http://localhost:3001/api/exos").then(response => {
      console.log(response.data);
    });
    return (
      <div className="main-profilePage">
        <li>Votre nom d'utilisateur est {this.props.user.username}</li>
        <li>Le dernier exercice résolu est [nombre].</li>
        <li>Vous avez créé [nombre] exercices.</li>
        <li>
          Votre meilleur temps dans le classement des sophismes est [nombres].
        </li>
      </div>
    );
  }
}

export default Profile;
