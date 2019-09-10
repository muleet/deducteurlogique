// import React, { Component, Fragment } from "react";

// // Cette fonction est appelée par InferenceProvider.
// // Cette fonction affiche le numéro de l'inférence, le contenu de l'inférence, et le commentaire de l'inférence.
// // (A FAIRE) Elle doit aussi afficher le niveau d'hypothèse par un ou trait ou plus.

// class MakeInference extends Component {
//   renderCheckSquare(checkSquare) {
//     if (checkSquare) {
//       return checkSquare;
//     }
//   }

//   renderProbableArrow() {}

//   render() {
//     let hypothesisLevel = "",
//       selectableClassName = "selectable ",
//       classNames = this.props.inferenceType + this.props.additionalClassNames;
//     for (let i = 0; i < this.props.hypothesisCurrentLevel; i++) {
//       hypothesisLevel += "|";
//     }

//     return (
//       <Fragment>
//         <li
//           className={
//             "inferenceGlobal " +
//             selectableClassName +
//             // this.props.inferenceGlobalType +
//             classNames
//           }
//           onClick={this.props.onClickSent}
//         >
//           <div className={"inferenceNumber "}>{this.props.inferenceNumber}</div>
//           <div className={"hypothesis-level "}>
//             {hypothesisLevel}
//             {/* {this.props.hypIDSent} */}
//           </div>
//           <div className={"inferenceItself "}>
//             {console.log(this.props.inferenceItself)}
//             {this.props.inferenceItself}
//           </div>
//           <div className={"inferenceCommentary "}>
//             {this.props.inferenceCommentary}
//           </div>
//           {this.renderCheckSquare(this.props.checkSquare)}
//           {/* {this.props.checkSquare} */}
//           {/* <i className="fas fa-play icon" id="probableArrow"></i> */}
//         </li>
//       </Fragment>
//     );
//   }
// }

// export default MakeInference;
