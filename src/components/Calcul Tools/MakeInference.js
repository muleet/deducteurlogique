import React, { Fragment } from "react";

function MakeInference(props) {
  return (
    <Fragment>
      {props.infNum}.{props.content}
    </Fragment>
  );
}

export default MakeInference;
