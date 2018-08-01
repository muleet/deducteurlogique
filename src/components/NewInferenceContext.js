import React, { createContext } from "react";
import { render } from "react-dom";

// Cette classe est méga importante. Elle va contenir la variable globale contenant la nouvelle inférence, laquelle sera construite
// dans différentes classes et sous-classes. A la fin d'un long périple entre bien des classes, son contenu sera finalement ajouté à un tableau.
// Puis, ladite variable globale, sera remise à zéro.

export const UserContext = createContext({
  NewInference: ""
});

class UserProvider extends Component {
  state = {
    NewInference: "Weshceciestuneinférence" // une valeur de départ
  };

  render() {
    return (
      /**
       * la propriété value est très importante ici, elle rend
       * le contenu du state disponible aux `Consumers` de l'application
       */
      <UserContext.Provider value={this.state}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

export default UserProvider;
