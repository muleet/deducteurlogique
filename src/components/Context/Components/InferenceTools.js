// import React, { createContext, Component, Fragment } from "react";

function mayAddFirstParenthesis(inference) {
  // concerne ∧i, ⊻i, ⊃i, ↑e, ↓e, ex falso
  if (inference.length > 2 && inference[inference.length - 1] !== "~") {
    inference = "(" + inference + ")";
  }
  return inference;
}

function mayRemoveFirstParenthesis(inference) {
  // concerne ~i
  let newInference = inference;
  if (inference[0] === "(") {
    newInference = "";
    for (let i = 1; i < inference.length - 1; i++) {
      newInference = newInference + inference[i];
    }
  }
  return newInference;
}

function returnWhatIsBeforeAndAfterTheOperator(str, operator, mayCommute) {
  // Cette fonction a plusieurs intérêts. Elle n'est utilisée que dans certaines règles d'élimination d'opérateur. 1) D'abord, elle reçoit un str contenant une inférence dans sa totalité. 2) Elle vérifie ensuite où commence et où termine la première parenthèse. En faisant cela, elle repère le positionnement de l'opérateur principal (celui hors de toute parenthèse). 3) Elle ajoute alors tout ce qui précède cet opérateur, à un tableau à entrées. 4) Ensuite elle poursuit l'exploration de la string et finit par ajouter ce qui précède à l'opérateur à la deuxième entrée du tableau. 5) Finalement, returnWhatIsBeforeAndAfterTheOperator doit retourner un tableau contenant les deux parties, en retirant les premières parenthèses si elles en avaient.
  let arrayToReturn = [];
  if (str.indexOf(operator) !== -1) {
    let level = 0;
    let part = "";
    for (let i = 0; i < str.length; i++) {
      if (str[i] === operator && level === 0) {
        // si on arrive ici c'est qu'on vient de recontrer l'unique opérateur hors de toute parenthèse
        arrayToReturn.push(part);
        part = "";
        i++;
      }
      if (str[i] === "(") {
        level++;
      } else if (str[i] === ")") {
        level--;
      }
      part = part + str[i];
      if (i === str.length - 1) {
        arrayToReturn.push(part);
      }
    }
    if (arrayToReturn.length === 2) {
      for (let i = 0; i < 2; i++) {
        let noFirstParenthesis = "";
        if (arrayToReturn[i][0] === "(") {
          for (let j = 1; j < arrayToReturn[i].length - 1; j++) {
            noFirstParenthesis = noFirstParenthesis + arrayToReturn[i][j];
          }
          arrayToReturn[i] = noFirstParenthesis;
        }
      }
    } else {
      arrayToReturn = "error";
    }
    // arrayToReturn[0] = <ce qui précède>, arrayToReturn[1] = <ce qui succède>.
    if (
      mayCommute === "commute" &&
      (operator === "∧" ||
        operator === "⊻" ||
        operator === "≡" ||
        operator === "⊅" ||
        operator === "↓")
    ) {
      arrayToReturn =
        this.mayAddFirstParenthesis(arrayToReturn[1]) +
        operator +
        this.mayAddFirstParenthesis(arrayToReturn[0]);
    }
  } else {
    // this.props.valueInference.setAdvice(
    //   "Cliquez sur une inférence ayant pour connecteur dominant le symbole '" +
    //     operator +
    //     "'.",
    //   "error-advice"
    // );
    arrayToReturn = "error";
  }
  return arrayToReturn;
}

function returnAnInferenceOutOfTwoInferences(A, B, operator) {
  A = this.mayAddFirstParenthesis(A);
  B = this.mayAddFirstParenthesis(B);
  let AoperatorB = A + operator + B;
  return AoperatorB;
}

function commute(inference, operator) {
  let commutedInference = this.returnWhatIsBeforeAndAfterTheOperator(
    inference,
    operator,
    "commute"
  );
  return commutedInference;
}

function checkMainOperator(str, operator) {
  // fonction qui retourne true or false si le mainOperator est bien celui attendu
  let arrayToCheck = [],
    bool = false;
  if (str.indexOf(operator) !== -1) {
    let level = 0;
    let part = "";
    for (let i = 0; i < str.length; i++) {
      if (str[i] === operator && level === 0) {
        // si on arrive ici c'est qu'on vient de recontrer l'unique opérateur hors de toute parenthèse
        bool = true;
        i = str.length;
      }
      if (str[i] === "(") {
        level++;
      } else if (str[i] === ")") {
        level--;
      }
      part = part + str[i];
      if (i === str.length - 1) {
        arrayToCheck.push(part);
      }
    }
    arrayToCheck = "error";
  }
  return bool;
}

function withdrawFirstCharacters(str, quantity) {
  // On regarde combien de fois le caractère en question est présent au début de str, dans la limite du nombre à retirer
  // utilisé par ~~e
  let result = "";
  for (let i = 0; i < str.length - quantity; i++) {
    result = result + str[quantity + i];
  }
  return result;
}

function isThereAMainOperator(inference) {
  const everyConnector = ["∧", "⊃", "∨", "⊻", "≡", "⊅", "↑", "↓"];
  let result = "",
    bool = false;
  for (let i = 0; i < everyConnector.length; i++) {
    result = this.returnWhatIsBeforeAndAfterTheOperator(
      inference,
      everyConnector[i]
    );
    if (result !== "error") {
      i = everyConnector.length;
      bool = true;
    }
  }
  return bool;
}

function returnNegationCount(inference) {
  let negationCount = 0;
  for (let i = 0; i < inference.length; i++) {
    if (inference[i] === "~") {
      negationCount++;
    } else {
      i = i + inference.length;
    }
  }
  return negationCount;
}

export default {
  mayAddFirstParenthesis,
  mayRemoveFirstParenthesis,
  returnWhatIsBeforeAndAfterTheOperator,
  returnAnInferenceOutOfTwoInferences,
  commute,
  checkMainOperator,
  withdrawFirstCharacters,
  isThereAMainOperator,
  returnNegationCount
};
