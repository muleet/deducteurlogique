import React, { Component, Fragment } from "react";
// Importation de mes composants
import ButtonMenu from "../ButtonMenu";
import Tutoriels from "./Tutoriels";
import CalculDesPropositions from "./CalculDesPropositions.js";
import FormalisationEnonces from "./FormalisationEnonces";
// import CalculDesPredicats from "./CalculDesPredicats";
import Linker from "../Linker";

class Home extends Component {
  render() {
    return (
      <Fragment>
        <main className="main-menu">
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
            link="/calcul-prop"
            path="/calcul-prop"
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
          <div className="three-options-menu">
            <ButtonMenu
              className="option-color main-button"
              link={
                <Linker
                  link="/"
                  path="/"
                  components={Home}
                  name="Infos menu 1"
                />
              }
            />
            {/* <ButtonMenu
              className="option-color main-button"
              link={
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
              link={
                <Linker
                  link="/"
                  path="/"
                  components={Home}
                  name="Infos menu 3"
                />
            } /> */}
          </div>
        </main>
      </Fragment>
    );
  }
}

export default Home;
