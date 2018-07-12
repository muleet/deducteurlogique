import React, { Component } from "react";
import LocutionsLatines from "../LocutionsLatines.json";
const random = Math.floor(Math.random() * LocutionsLatines.length);

class MakeLocution extends Component {
  state = {
    sentence: LocutionsLatines[random]
  };

  NoteEtAuteur = id => {
    if (this.state.sentence.note || this.state.sentence.auteur) {
      <div>
        <br />
        <div id="MakeLocution-auteur-et-note">
          {this.state.sentence.note + " " + this.state.sentence.auteur}
        </div>
      </div>;
    }
  };

  render() {
    return (
      <div>
        <div id="locution">{this.state.sentence.latin}</div>
        {this.NoteEtAuteur()}
        <br />
        <div id="traduction-latine">{this.state.sentence.traduction}</div>
      </div>
    );
  }
}

export default MakeLocution;
