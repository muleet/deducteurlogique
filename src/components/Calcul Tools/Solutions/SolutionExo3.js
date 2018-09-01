import React, { Fragment } from "react";
import MakeInference from "../MakeInference";

function SolutionExo3() {
  return (
    <Fragment>
      <MakeInference
        inferenceNumber={"1."}
        inferenceItself={"(p∧q)∧(p∧r)"}
        inferenceCommentary={"a, rep"}
      />
      <MakeInference
        inferenceNumber={"2."}
        inferenceItself={"p∧q"}
        inferenceCommentary={"1, ∧e"}
      />
      <MakeInference
        inferenceNumber={"3."}
        inferenceItself={"p∧r"}
        inferenceCommentary={"1, ∧e"}
      />
      <MakeInference
        inferenceNumber={"4."}
        inferenceItself={"q"}
        inferenceCommentary={"2, ∧e"}
      />
      <MakeInference
        inferenceNumber={"5."}
        inferenceItself={"r"}
        inferenceCommentary={"3, ∧e"}
      />
      <MakeInference
        inferenceNumber={"6."}
        inferenceItself={"q∧r"}
        inferenceCommentary={"4, 5, ∧i"}
      />
      <MakeInference
        inferenceNumber={"7."}
        inferenceItself={"p"}
        inferenceCommentary={"2, ∧e"}
      />
      <MakeInference
        inferenceNumber={"8."}
        inferenceItself={"p∧(q∧r)"}
        inferenceCommentary={"7, 6, ∧i"}
        inferenceType={"concluding-inference-blinking"}
      />
    </Fragment>
  );
}

export default SolutionExo3;
