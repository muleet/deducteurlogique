import React, { Fragment } from "react";
import MakeInference from "../MakeInference";

function SolutionExo1() {
  return (
    <Fragment>
      <MakeInference
        inferenceNumber={"1."}
        inferenceItself={"p"}
        inferenceCommentary={"a, rep"}
      />
      <MakeInference
        inferenceNumber={"2."}
        inferenceItself={"p⊃q"}
        inferenceCommentary={"b, rep"}
      />
      <MakeInference
        inferenceNumber={"3."}
        inferenceItself={"q"}
        inferenceCommentary={"1, 2, ⊃e"}
        lastInference={true}
      />
    </Fragment>
  );
}

export default SolutionExo1;
