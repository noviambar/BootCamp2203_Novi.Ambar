import React, { useState } from "react";

const mainContent = () => {
  const [quantityCount, setquantityCount] = useState(0);

  const HandlequantityCount = () => {
    setquantityCount(quantityCount + 1);
  };

  return (
    <React.Fragment>
      <h1>This is React</h1>
      <p>WGS Bootcamo React</p>
      <button className="btn" onClick={HandlequantityCount}>
        Add
      </button>
      <h2>Quantity: {quantityCount}</h2>
    </React.Fragment>
  );
};

export default mainContent;
