import React from "react";
import Component from "./quantity";

const mainContent = () => {
  return (
    <React.Fragment>
      <h1>This is React</h1>
      <p>WGS Bootcamo React</p>
      <button className="btn" onClick={Component}>
        Add
      </button>
      <h2>Quantity: {Component}</h2>
    </React.Fragment>
  );
};

export default mainContent;
