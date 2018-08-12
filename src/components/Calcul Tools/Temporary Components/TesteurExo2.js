import React, { Fragment } from "react";
import MakeInference from "../MakeInference";

function TesteurTemporaire() {
  return (
    <Fragment>
      <MakeInference
        inferenceNumber={"1."}
        inferenceItself={"p∧q"}
        inferenceCommentary={"a, rep"}
      />
      <MakeInference
        inferenceNumber={"2."}
        inferenceItself={"q"}
        inferenceCommentary={"1, ∧e"}
      />
      <MakeInference
        inferenceNumber={"3."}
        inferenceItself={"q⊃~r"}
        inferenceCommentary={"b, rep"}
      />
      <MakeInference
        inferenceNumber={"4."}
        inferenceItself={"~r"}
        inferenceCommentary={"2, 3, ⊃e"}
      />
    </Fragment>
  );
}

export default TesteurTemporaire;
