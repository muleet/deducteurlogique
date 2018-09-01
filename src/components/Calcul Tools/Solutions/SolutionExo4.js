import React, { Fragment } from "react";
import MakeInference from "../MakeInference";

function SolutionExo4() {
  return (
    <Fragment>
      <MakeInference
        inferenceNumber={"1."}
        inferenceItself={"p"}
        inferenceCommentary={"a, rep"}
      />
      <MakeInference
        inferenceNumber={"2."}
        inferenceItself={"~(p∧q)"}
        inferenceCommentary={"b, rep"}
      />
      <MakeInference
        inferenceNumber={"3."}
        inferenceItself={"|q"}
        inferenceCommentary={"hyp"}
        inferenceType={"hypothesisItself"}
      />
      <MakeInference
        inferenceNumber={"4."}
        inferenceItself={"|p"}
        inferenceCommentary={"1, reit"}
      />
      <MakeInference
        inferenceNumber={"5."}
        inferenceItself={"|~(p∧q)"}
        inferenceCommentary={"2, reit"}
      />
      <MakeInference
        inferenceNumber={"6."}
        inferenceItself={"|p∧q"}
        inferenceCommentary={"3, 4, ∧i"}
      />
      <MakeInference
        inferenceNumber={"7."}
        inferenceItself={"~q"}
        inferenceCommentary={"3, 5, 6 ,∧i"}
        inferenceType={"concluding-inference-blinking"}
      />
    </Fragment>
  );
}

export default SolutionExo4;
