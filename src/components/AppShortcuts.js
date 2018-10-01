import React from "react";
import { render } from "react-dom";
import { Shortcuts, ShortcutManager } from "react-shortcuts";
import PropTypes from "prop-types";

const keymap = {
  SHORTCUTKEY: {
    LEFT: ["left"], // gauche et droite serviront à changer d'exo rapidement
    RIGHT: ["right"],
    ONE: ["1", "&"],
    TWO: ["2", "é"],
    THREE: ["3", '"'],
    FOUR: ["4", "'"],
    FIVE: ["5", "("],
    SIX: ["6", "-"],
    SEVEN: ["7", "è"],
    EIGHT: ["8", "_"],
    NINE: ["9", "ç"],
    TEN: ["0", "à"]
  }
};

const shortcutManager = new ShortcutManager(keymap);

const ObjectShortcutter = ({ onMoveRequest }) => {
  const _handleShortcuts = (action, event) => {
    switch (action) {
      case "LEFT":
        console.log("leftkey");
        break;
      case "RIGHT":
        console.log("rightkey");
        break;
      case "ONE":
        console.log("1key");
        break;
      case "TWO":
        console.log("2key");
        break;
      case "THREE":
        console.log("3key");
        break;
      case "FOUR":
        console.log("4key");
        break;
      case "FIVE":
        console.log("5key");
        break;
      case "SIX":
        console.log("6key");
        break;
      case "SEVEN":
        console.log("7key");
        break;
      case "EIGHT":
        console.log("8key");
        break;
      case "NINE":
        console.log("9key");
        break;
      case "ZERO":
        console.log("0key");
        break;
      default:
        console.log("default");
        break;
    }
  };

  return (
    <Shortcuts name="SHORTCUTKEY" handler={_handleShortcuts}>
      <div />
    </Shortcuts>
  );
};

class App extends React.Component {
  static childContextTypes = {
    shortcuts: PropTypes.object.isRequired
  };

  getChildContext() {
    return { shortcuts: shortcutManager };
  }

  handleMove = (newPosition, index) => {
    // const boxes = this.state.boxes.slice();
    // boxes[index] = Object.assign(boxes[index], newPosition);
    // this.setState({ boxes });
  };

  render() {
    return (
      <div>
        <ObjectShortcutter key={1} onMoveRequest={this.handleMove} />
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));

export default App;
