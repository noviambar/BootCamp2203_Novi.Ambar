import { useState } from "react";

export default function Component() {
  const [quantityCount, setquantityCount] = useState[0];

  const Quantity = () => {
    setquantityCount(quantityCount + 1);
  };
  return (
    <div>
      <p>Quantity: {quantityCount} </p>
      <button onClick={Quantity}>Add</button>
    </div>
  );
}
