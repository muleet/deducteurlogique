import React, { Fragment } from "react";
import MakeInference from "../MakeInference";

function SolutionExo7() {
  return (
    <Fragment>
      <MakeInference
        inferenceNumber={"1."}
        inferenceItself={"|~(pv~p)"}
        inferenceCommentary={"hyp"}
      />
      <MakeInference
        inferenceNumber={"2."}
        inferenceItself={"||p"}
        inferenceCommentary={"hyp"}
      />
      <MakeInference
        inferenceNumber={"3."}
        inferenceItself={"||pv~p"}
        inferenceCommentary={"2, vi"}
      />
      <MakeInference
        inferenceNumber={"4."}
        inferenceItself={"||~(pv~p)"}
        inferenceCommentary={"1, reit"}
      />
      <MakeInference
        inferenceNumber={"5."}
        inferenceItself={"|~p"}
        inferenceCommentary={"2, 3, 4, ~i"}
      />
      <MakeInference
        inferenceNumber={"6."}
        inferenceItself={"|pv~p"}
        inferenceCommentary={"5, vi"}
      />
      <MakeInference
        inferenceNumber={"|7."}
        inferenceItself={"~(pv~p)"}
        inferenceCommentary={"1, reit"}
      />
      <MakeInference
        inferenceNumber={"8."}
        inferenceItself={"~~(pv~p)"}
        inferenceCommentary={"1, 6, 7, ~i"}
      />
      <MakeInference
        inferenceNumber={"9."}
        inferenceItself={"pv~p"}
        inferenceCommentary={"5, ~e"}
        lastInference={true}
      />
    </Fragment>
  );
}

export default SolutionExo7;
