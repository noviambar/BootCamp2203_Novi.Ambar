import React from "react";
import ReactDOM from "react-dom";

const nav = (
  <nav>
    <h1>WGS Bootcamp Batch 1: Experiment With ReactJs</h1>
    <ul>
      <li>Home</li>
      <li>About</li>
      <li>Contact</li>
    </ul>
  </nav>
);
ReactDOM.render(nav, document.getElementById("nav"));

const element = <h2>This is React</h2>;
ReactDOM.render(element, document.getElementById("root"));
