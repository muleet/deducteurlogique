import React, { Component } from "react";
import PDF, { AddPage, Table, Html, Text, Line } from "jspdf-react";
// import jsPDF from "jspdf";

// module lancé par ShowFallacies.js, avec 2 paramètres :
// - "Fallacies" (qui est le .json contenant toutes les fallacies)

const styleH1 = {
  fontSize: "15px",
  textAlign: "center",
  color: "red",
};

const invisibleStyle = {
  display: "none",
};

export default class App extends Component {
  render() {
    const Fallacies = this.props.Fallacies;
    let array = [];
    for (let i = 0; i < Fallacies.length; i++) {
      array[i] = (
        <ul className="fallacyCard-bothside">
          <li className="fallacyCard-template fc-recto fallacyCardName">
            {Fallacies[i].name}
          </li>
          <li className="fallacyCard-template fc-verso">
            <div className="fallacyCardDefinition">
              {Fallacies[i].definition}
            </div>
          </li>
        </ul>
      );
    }

    return (
      <React.Fragment>
        <div className="allFallacyCard">{array}</div>
      </React.Fragment>
    );

    // const doc = new jsPDF({
    //   orientation: "landscape",
    //   unit: "in",
    //   height: "3508px",
    //   width: "2480px",
    //   format: [4, 2],
    // });
    // array = array.join(" ");
    // // doc.text("Hello world!", 1, 1);
    // doc.text(array, 1, 1);
    // doc.save("two-by-four.pdf");

    // return (
    //   <React.Fragment>
    //     <PDF properties={properties} preview={true}>
    //       <Text x={35} y={25} size={30}>
    //         Octonyan loves jsPDF
    //       </Text>
    //       <AddPage />
    //       {/* <h1>{numberOfFallacies}</h1> */}
    //       <Table head={head} body={body} />
    //       <AddPage format="a6" orientation="l" />
    //       <Text x={10} y={10} color="red">
    //         Sample
    //       </Text>
    //       <Line x1={20} y1={20} x2={60} y2={20} />
    //       <AddPage />
    //       {/* <div className="allFallacyCard">{array}</div> */}
    //       <Html sourceById="page" />
    //     </PDF>
    //     <div id="page" style={invisibleStyle}>
    //       <h1 style={styleH1}>Source Html</h1>
    //       <p>
    //         <strong>lorem ipsumLorem </strong>Ipsum is simply dummy text of the
    //         printing and typesetting industry. Lorem Ipsum has been the
    //         industry's standard dummy text ever since the 1500s, when an unknown
    //         printer took a galley of type and scrambled it to make a type
    //         specimen book. It has survived not only five centuries, but also the
    //         leap into electronic typesetting, remaining essentially unchanged.
    //         It was popularised in the 1960s with the release of Letraset sheets
    //         containing Lorem Ipsum passages, and more recently with desktop
    //         publishing software like Aldus PageMaker including versions of Lorem
    //         Ipsum.
    //       </p>
    //     </div>
    //   </React.Fragment>
    // );
  }
}
