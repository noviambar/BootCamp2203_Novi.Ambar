import React from "react";
import DateTime from "./time";

const nav = () => {
  return (
    <nav>
      <h1>Bootcamp Batch 1 : Experiment with REACTJS</h1>
      <ul>
        <li>Home</li>
        <li>About</li>
        <li>Contact</li>
        <h2>
          <DateTime></DateTime>
        </h2>
      </ul>
    </nav>
  );
};
export default nav;
