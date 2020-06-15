import React, { Component } from "react";
import Jpg from "./some.jpg";
import Svg from "./stop.svg";

import "./App.css";

class App extends Component {
  render() {
    return (
      <div>
        <h1>My React App!</h1>
        <div className="assets">
          <img src={Jpg} />
          <img src={Svg} />
        </div>
      </div>
    );
  }
}

export default App;
