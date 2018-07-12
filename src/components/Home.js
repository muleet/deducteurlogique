import React, { Component } from "react";
// Importation de mon css
import "../css/App.css";
import "../css/ButtonMenu.css";
import "../css/Color.css";
// Importation de mes composants
import ButtonMenu from "./ButtonMenu";
import Tutoriels from "./Tutoriels";
import CalculDesPropositions from "./CalculDesPropositions.js";
import FormalisationEnonces from "./FormalisationEnonces";
import CalculDesPredicats from "./CalculDesPredicats";
import Linker from "./Linker";

class Home extends Component {
  render() {
    return (
      <div>
        <header>
          <ButtonMenu className="header-button" name="Login (optionnel)" />
          <ButtonMenu className="header-button" name="Option" />
          <ButtonMenu className="false-button" name="FalseButton" />
          {/* <h1>
            déducteur et<br />formaliseur logique
          </h1> */}
          <ButtonMenu
            className="header-button"
            id="author-button"
            name={"Auteurs \n& contact"}
          />
        </header>
        <main>
          <Linker
            link="/tuto"
            path="/tuto"
            components={Tutoriels}
            name={
              <ButtonMenu
                className="tuto-color main-button"
                name="Qu'est-ce que... Que sont..."
              />
            }
          />
          <Linker
            link="/cdpro"
            path="/cdpro"
            components={CalculDesPropositions}
            name={
              <ButtonMenu
                className="prop-color main-button"
                name="Calcul des propositions"
              />
            }
          />
          <Linker
            link="/fde"
            path="/fde"
            components={FormalisationEnonces}
            name={
              <ButtonMenu
                className="forma-color main-button"
                name="Formalisation des énoncés"
              />
            }
          />
          <div class="three-options-menu">
            <ButtonMenu
              className="option-color main-button"
              wesh={
                <Linker
                  link="/"
                  path="/"
                  components={Home}
                  name="Infos menu 1"
                />
              }
            />
            <ButtonMenu
              className="option-color main-button"
              wesh={
                <Linker
                  link="/"
                  path="/"
                  components={Home}
                  name="Infos menu 2"
                />
              }
            />{" "}
            <ButtonMenu
              className="option-color main-button"
              wesh={
                <Linker
                  link="/"
                  path="/"
                  components={Home}
                  name="Infos menu 3"
                />
              }
            />
          </div>
        </main>
        <footer>Quidquid latine dictum sit, altum sonatur.</footer>
      </div>
    );
  }
}

export default Home;
