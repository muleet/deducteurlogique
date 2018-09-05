import React from "react";
import { BrowserRouter as Route, Link } from "react-router-dom";

function Linker(props) {
  /*props.link=le lien dans la barre d'adresse, qui est lié à la props ci-dessous
  props.name = le futur nom du lien, lié à la props ci-dessus
  props.exact, la route est-elle exacte
  props.path=le chemin après la barre d'adresse et le composant qu'il faudra charger
  props.component= y a-t-il un composant à rajouter ?
  */

  return (
    <div className="link">
      <div>
        <Link to={props.link}>{props.name}</Link>
      </div>
      <Route
        exact={props.exactness}
        path={props.link}
        component={props.component}
      />
    </div>
  );
}

export default Linker;
