import React, { Component, Fragment } from "react";
// Importation de mes composants
import ButtonMenu from "../ButtonMenu";
import InfoRules from "./InfoRules";
import CalculDesPropositions from "./CalculDesPropositions.js";
import FormalisationEnonces from "./FormalisationEnonces";
// import CalculDesPredicats from "./CalculDesPredicats";
import Linker from "../Linker";
import MakeListExercises from "./MakeListExercises";

class Home extends Component {
  render() {
    return (
      <Fragment>
        <main className="main-menu">
          <Linker
            link="/list-regles"
            path="/list-regles"
            components={InfoRules}
            name={
              <ButtonMenu
                className="tuto-color main-button"
                name={"Tuto & infos"}
              />
            }
          />
          <Linker
            link="/calcul-prop-exo"
            path="/calcul-prop-exo"
            components={MakeListExercises}
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
