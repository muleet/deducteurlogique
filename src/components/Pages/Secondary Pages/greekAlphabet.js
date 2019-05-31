import React, { Component } from "react";
// import greekAlphabetData from "../../../data/greekAlphabet";

class greekAlphabet extends Component {
  state = {
    greekHigherCase: [
      "Α",
      "Β",
      "Γ",
      "Δ",
      "Ε",
      "Ζ",
      "Η",
      "Θ",
      "Ι",
      "Κ",
      "Λ",
      "Μ",
      "Ν",
      "Ξ",
      "Ο",
      "Π",
      "Ρ",
      "Σ",
      "Τ",
      "Υ",
      "Φ",
      "Χ",
      "Ψ",
      "Ω"
    ],
    greekLowerCase: [
      "α",
      "β",
      "γ",
      "δ",
      "ε",
      "ζ",
      "η",
      "θ",
      "ι",
      "κ",
      "λ",
      "μ",
      "ν",
      "ξ",
      "ο",
      "π",
      "ρ",
      "σ",
      "τ",
      "υ",
      "φ",
      "χ",
      "ψ",
      "ω"
    ],
    greekNames: [
      "ἄλφα",
      "βῆτα",
      "γάμμα",
      "δέλτα",
      "ἒψιλόν",
      "ζῆτα",
      "ἦτα",
      "θῆτα",
      "ἰῶτα",
      "κάππα",
      "λάμβδα",
      "μῦ",
      "νῦ",
      "ξῖ",
      "ὂμικρόν",
      "πῖ",
      "ῥῶ",
      "σῖγμα",
      "ταῦ",
      "ὒψιλόν",
      "φῖ",
      "χῖ",
      "ψῖ",
      "ὦμέγα"
    ],
    greekNamesInFrench: [
      "alpha",
      "bêta",
      "gamma",
      "delta",
      "epsilon",
      "zêta",
      "êta",
      "thêta",
      "iôta",
      "kappa",
      "lambda",
      "mu",
      "nu",
      "ksi",
      "omikron",
      "pi",
      "rhô",
      "sigma",
      "tau",
      "upsilon",
      "phi",
      "khi",
      "psi",
      "ômega"
    ],
    selectedLetters: [],
    selectedLettersThemselves: [],
    unselectedLetters: [],
    unselectedLettersThemselves: [],
    currentType: [0, "mix"] // 0 = rien, 1 = HC, 2 = HL, 3 = N
  };

  selectLetter(letter) {
    let newSelectedLetters = this.state.selectedLetters;
    let newSelectedLettersThemselves = this.state.selectedLettersThemselves;
    let newUnselectedLetters = this.state.unselectedLetters;
    let newUnselectedLettersThemselves = this.state.unselectedLettersThemselves;
    const NUSLposition = newUnselectedLettersThemselves.indexOf(letter); // On trouve sa position dans les non-sélectionnés
    const NSLposition = newSelectedLettersThemselves.indexOf(letter); // On trouve sa position dans les sélections
    if (newUnselectedLettersThemselves.indexOf(letter) !== -1) {
      newSelectedLetters.push(this.showLetter(letter));
      newSelectedLettersThemselves.push(letter);
      newUnselectedLetters.splice(NUSLposition, 1);
      newUnselectedLettersThemselves.splice(NUSLposition, 1);
    } else if (newSelectedLettersThemselves.indexOf(letter) !== -1) {
      newUnselectedLetters.push(this.showLetter(letter));
      newUnselectedLettersThemselves.push(letter);
      newSelectedLetters.splice(NSLposition, 1);
      newSelectedLettersThemselves.splice(NSLposition, 1);
    }

    this.setState({
      selectedLetters: newSelectedLetters,
      unselectedLetters: newUnselectedLetters
    });
  }

  refillBoxes(arrayLetters, currentType) {
    this.resetEverything();
    let newUnselectedLetters = [];
    arrayLetters = this.mixArray(arrayLetters);
    for (let i = 0; i < arrayLetters.length; i++) {
      newUnselectedLetters.push(this.showLetter(arrayLetters[i], i));
    }
    this.setState({
      selectedLetters: [],
      selectedLettersThemselves: [],
      unselectedLetters: newUnselectedLetters,
      unselectedLettersThemselves: arrayLetters,
      currentType: currentType
    });
  }

  mixArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  showLetter(letter, key) {
    return (
      <div
        key={key}
        className="greek-alphabet-square"
        onClick={() => {
          this.selectLetter(letter);
        }}
      >
        {letter}
      </div>
    );
  }

  showSolution(type) {
    let arraySolution = [];
    for (let i = 0; i < type.length; i++) {
      arraySolution.push(
        <div className="greek-alphabet-square-solution">{type[i]}</div>
      );
    }
    this.setState({
      unselectedLetters: arraySolution
    });
  }

  resetEverything() {
    let greekHigherCase = [
        "Α",
        "Β",
        "Γ",
        "Δ",
        "Ε",
        "Ζ",
        "Η",
        "Θ",
        "Ι",
        "Κ",
        "Λ",
        "Μ",
        "Ν",
        "Ξ",
        "Ο",
        "Π",
        "Ρ",
        "Σ",
        "Τ",
        "Υ",
        "Φ",
        "Χ",
        "Ψ",
        "Ω"
      ],
      greekLowerCase = [
        "α",
        "β",
        "γ",
        "δ",
        "ε",
        "ζ",
        "η",
        "θ",
        "ι",
        "κ",
        "λ",
        "μ",
        "ν",
        "ξ",
        "ο",
        "π",
        "ρ",
        "σ",
        "τ",
        "υ",
        "φ",
        "χ",
        "ψ",
        "ω"
      ],
      greekNames = [
        "ἄλφα",
        "βῆτα",
        "γάμμα",
        "δέλτα",
        "ἒψιλόν",
        "ζῆτα",
        "ἦτα",
        "θῆτα",
        "ἰῶτα",
        "κάππα",
        "λάμβδα",
        "μῦ",
        "νῦ",
        "ξῖ",
        "ὂμικρόν",
        "πῖ",
        "ῥῶ",
        "σῖγμα",
        "ταῦ",
        "ὒψιλόν",
        "φῖ",
        "χῖ",
        "ψῖ",
        "ὦμέγα"
      ],
      greekNamesInFrench = [
        "alpha",
        "bêta",
        "gamma",
        "delta",
        "epsilon",
        "zêta",
        "êta",
        "thêta",
        "iôta",
        "kappa",
        "lambda",
        "mu",
        "nu",
        "ksi",
        "omikron",
        "pi",
        "rhô",
        "sigma",
        "tau",
        "upsilon",
        "phi",
        "khi",
        "psi",
        "ômega"
      ];

    this.setState({
      greekHigherCase: greekHigherCase,
      greekLowerCase: greekLowerCase,
      greekNames: greekNames,
      greekNamesInFrench: greekNamesInFrench
    });
  }

  render() {
    let choiceClassNameH = "",
      choiceClassNameL = "",
      choiceClassNameN = "",
      choiceClassNameF = "";
    let greekHigherCase = [
        "Α",
        "Β",
        "Γ",
        "Δ",
        "Ε",
        "Ζ",
        "Η",
        "Θ",
        "Ι",
        "Κ",
        "Λ",
        "Μ",
        "Ν",
        "Ξ",
        "Ο",
        "Π",
        "Ρ",
        "Σ",
        "Τ",
        "Υ",
        "Φ",
        "Χ",
        "Ψ",
        "Ω"
      ],
      greekLowerCase = [
        "α",
        "β",
        "γ",
        "δ",
        "ε",
        "ζ",
        "η",
        "θ",
        "ι",
        "κ",
        "λ",
        "μ",
        "ν",
        "ξ",
        "ο",
        "π",
        "ρ",
        "σ",
        "τ",
        "υ",
        "φ",
        "χ",
        "ψ",
        "ω"
      ],
      greekNames = [
        "ἄλφα",
        "βῆτα",
        "γάμμα",
        "δέλτα",
        "ἒψιλόν",
        "ζῆτα",
        "ἦτα",
        "θῆτα",
        "ἰῶτα",
        "κάππα",
        "λάμβδα",
        "μῦ",
        "νῦ",
        "ξῖ",
        "ὂμικρόν",
        "πῖ",
        "ῥῶ",
        "σῖγμα",
        "ταῦ",
        "ὒψιλόν",
        "φῖ",
        "χῖ",
        "ψῖ",
        "ὦμέγα"
      ],
      greekNamesInFrench = [
        "alpha",
        "bêta",
        "gamma",
        "delta",
        "epsilon",
        "zêta",
        "êta",
        "thêta",
        "iôta",
        "kappa",
        "lambda",
        "mu",
        "nu",
        "ksi",
        "omikron",
        "pi",
        "rhô",
        "sigma",
        "tau",
        "upsilon",
        "phi",
        "khi",
        "psi",
        "ômega"
      ];

    if (this.state.currentType === 1) {
      choiceClassNameH = "greek-alphabet-choice-active ";
    } else if (this.state.currentType === 2) {
      choiceClassNameL = "greek-alphabet-choice-active";
    } else if (this.state.currentType === 3) {
      choiceClassNameN = "greek-alphabet-choice-active";
    } else if (this.state.currentType === 4) {
      choiceClassNameF = "greek-alphabet-choice-active";
    }

    // création des boutons pour que l'utilisateur sélectionne ce qu'il veut classer
    const buttonHigherCase = (
      <div
        className={"greek-alphabet-choice " + choiceClassNameH}
        onClick={() => {
          this.refillBoxes(this.state.greekHigherCase, 1);
        }}
      >
        majuscules
      </div>
    );
    const buttonLowerCase = (
      <div
        className={"greek-alphabet-choice " + choiceClassNameL}
        onClick={() => this.refillBoxes(this.state.greekLowerCase, 2)}
      >
        minuscules
      </div>
    );
    const buttonNames = (
      <div
        className={"greek-alphabet-choice " + choiceClassNameN}
        onClick={() => this.refillBoxes(this.state.greekNames, 3)}
      >
        en toutes lettres, en grec
      </div>
    );
    const buttonNamesInFrench = (
      <div
        className={"greek-alphabet-choice " + choiceClassNameF}
        onClick={() => this.refillBoxes(this.state.greekNamesInFrench, 4)}
      >
        en toutes lettres, en français
      </div>
    );

    // création des boutons donnant la solution
    const buttonSolutionHigherCase = (
      <div
        className="greek-alphabet-button-solution"
        onClick={() => this.showSolution(greekHigherCase)}
      >
        Α
      </div>
    );
    const buttonSolutionLowerCase = (
      <div
        className="greek-alphabet-button-solution"
        onClick={() => this.showSolution(greekLowerCase)}
      >
        α
      </div>
    );
    const buttonSolutionGreekName = (
      <div
        className="greek-alphabet-button-solution"
        onClick={() => this.showSolution(greekNames)}
      >
        G
      </div>
    );
    const buttonSolutionGreekNamesInFrench = (
      <div
        className="greek-alphabet-button-solution"
        onClick={() => this.showSolution(greekNamesInFrench)}
      >
        F
      </div>
    );

    // vérification de la victoire
    let victory = "";
    var greekHigherCaseTrue =
      this.state.selectedLettersThemselves.length === greekHigherCase.length &&
      this.state.selectedLettersThemselves.every(function(element, index) {
        return element === greekHigherCase[index];
      });
    var greekLowerCaseTrue =
      this.state.selectedLettersThemselves.length === greekLowerCase.length &&
      this.state.selectedLettersThemselves.every(function(element, index) {
        return element === greekLowerCase[index];
      });
    var greekNamesTrue =
      this.state.selectedLettersThemselves.length === greekNames.length &&
      this.state.selectedLettersThemselves.every(function(element, index) {
        return element === greekNames[index];
      });
    var greekNamesInFrenchTrue =
      this.state.selectedLettersThemselves.length ===
        greekNamesInFrench.length &&
      this.state.selectedLettersThemselves.every(function(element, index) {
        return element === greekNamesInFrench[index];
      });
    if (
      greekHigherCaseTrue ||
      greekLowerCaseTrue ||
      greekNamesTrue ||
      greekNamesInFrenchTrue
    ) {
      victory = "greek-alphabet-box-victory";
    }

    // section du point d'interrogation
    const questionMark = (
      <div className={"question-mark-button icon "}>
        <i class="fas fa-question-circle" />
        <div className="question-mark">
          <div className="question-mark-title">A quoi sert cette page ?</div>
          <ul className="question-mark-content">
            Cette page a pour but d'aider à apprendre l'alphabet grec : ses
            majuscules, ses minuscules, et le nom de ses lettres. Cliquez sur
            l'une des trois possibilités pour qu'un tirage au sort soit fait
            dans la première ligne, vous devrez ensuite cliquer dans le bon
            ordre pour les classer dans la seconde ligne. (Note : non en effet
            cette page n'a rien à voir avec le reste de ce site.)
          </ul>
        </div>
      </div>
    );

    // return
    return (
      <main className="main-greekAlphabet">
        <h2 style={{ marginBottom: "10px" }}>
          Apprenons l'alphabet grec {questionMark}
        </h2>
        <div className="greek-alphabet-choices">
          {buttonHigherCase}
          {buttonLowerCase}
          {buttonNames}
          {buttonNamesInFrench}
          {buttonSolutionHigherCase}
          {buttonSolutionLowerCase}
          {buttonSolutionGreekName}
          {buttonSolutionGreekNamesInFrench}
        </div>
        <div className="greek-alphabet-box">{this.state.unselectedLetters}</div>
        <div className={"greek-alphabet-box " + victory}>
          {this.state.selectedLetters}
        </div>
      </main>
    );
  }
}
export default greekAlphabet;
