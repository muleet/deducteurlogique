import React, { Fragment } from "react";
import MakeInference from "../MakeInference";

function SolutionExo5() {
  return (
    <Fragment>
      <MakeInference
        inferenceNumber={"1."}
        inferenceItself={"p∧q"}
        inferenceCommentary={"a, rep"}
      />
      <MakeInference
        inferenceNumber={"2."}
        inferenceItself={"|q∧~p"}
        inferenceCommentary={"hyp"}
        inferenceType={"hypothesisItself"}
      />
      <MakeInference
        inferenceNumber={"3."}
        inferenceItself={"|p∧q"}
        inferenceCommentary={"1, reit"}
      />
      <MakeInference
        inferenceNumber={"4."}
        inferenceItself={"|~p"}
        inferenceCommentary={"2, ∧e"}
      />
      <MakeInference
        inferenceNumber={"5."}
        inferenceItself={"|p"}
        inferenceCommentary={"3, ∧e"}
      />
      <MakeInference
        inferenceNumber={"6."}
        inferenceItself={"~(q∧~p)"}
        inferenceCommentary={"2, 4, 5, ∧i"}
        inferenceType={"concluding-inference-blinking"}
      />
    </Fragment>
  );
}

export default SolutionExo5;
