import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function Linker(props) {
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
