import React, { Fragment } from "react";
import MakeInference from "../MakeInference";

function SolutionExo8() {
  return (
    <Fragment>
      <MakeInference
        inferenceNumber={"1."}
        inferenceItself={"|p∨q"}
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
        inferenceItself={"||q∨p"}
        inferenceCommentary={"2, ∨i"}
      />
      <MakeInference
        inferenceNumber={"4."}
        inferenceItself={"||q"}
        inferenceCommentary={"hyp"}
        inferenceType={"hypothesisItself"}
      />
      <MakeInference
        inferenceNumber={"5."}
        inferenceItself={"||q∨p"}
        inferenceCommentary={"4, ∨i"}
      />
      <MakeInference
        inferenceNumber={"6."}
        inferenceItself={"|q∨p"}
        inferenceCommentary={"1, 2-3, 4-5, ∨e "}
      />
      <MakeInference
        inferenceNumber={"7."}
        inferenceItself={"(pvq)⊃(qvp)"}
        inferenceCommentary={"1-6, ⊃i"}
        inferenceType={"concluding-inference-blinking"}
      />
    </Fragment>
  );
}

export default SolutionExo8;
