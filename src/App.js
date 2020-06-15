import React from "react";
import logo from "./logo.svg";
import styled from "styled-components";
import sanitizeHtml from "sanitize-html";

import "./App.scss";

const Button = styled.button`
  background: yellow;
`;

function App() {
  const dirty = '<p>This is <a href="http://www.linux.org"></a><br/>Linux</p>';
  const clean = sanitizeHtml(dirty, {
    exclusiveFilter: function (frame) {
      return frame.tag === "a" && !frame.text.trim();
    },
  });

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <br />
        <Button>Styled component</Button>
        <div dangerouslySetInnerHTML={{ __html: clean }}></div>
      </header>
    </div>
  );
}

export default App;
