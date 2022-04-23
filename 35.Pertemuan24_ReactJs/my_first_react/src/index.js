import React from "react";
import ReactDOM from "react-dom";

import MainContent from "./mainContent";
import Nav from "./nav";

function renderDOM(content, id) {
  ReactDOM.render(content, document.getElementById(id));
}

renderDOM(<MainContent />, "root");
renderDOM(<Nav />, "nav");
