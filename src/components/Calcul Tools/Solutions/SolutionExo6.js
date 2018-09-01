import React, { Fragment } from "react";
import MakeInference from "../MakeInference";

function SolutionExo6() {
  return (
    <Fragment>
      <MakeInference
        inferenceNumber={"1."}
        inferenceItself={"|~q"}
        inferenceCommentary={"hyp"}
        inferenceType={"hypothesisItself"}
      />
      <MakeInference
        inferenceNumber={"2."}
        inferenceItself={"||p"}
        inferenceCommentary={"hyp"}
        inferenceType={"hypothesisItself"}
      />
      <MakeInference
        inferenceNumber={"3."}
        inferenceItself={"||p⊃q"}
        inferenceCommentary={"a, rep"}
      />
      <MakeInference
        inferenceNumber={"4."}
        inferenceItself={"||~q"}
        inferenceCommentary={"1, reit"}
      />
      <MakeInference
        inferenceNumber={"5."}
        inferenceItself={"||q"}
        inferenceCommentary={"2, 3, ⊃e"}
      />
      <MakeInference
        inferenceNumber={"6."}
        inferenceItself={"|~p"}
        inferenceCommentary={"2, 4, 5, ~i"}
      />
      <MakeInference
        inferenceNumber={"7."}
        inferenceItself={"~q⊃~p"}
        inferenceCommentary={"1-6, ⊃i"}
        inferenceType={"concluding-inference-blinking"}
      />
    </Fragment>
  );
}

export default SolutionExo6;
