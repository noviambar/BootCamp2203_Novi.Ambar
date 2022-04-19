import { useState } from "react";

const [quantityCount, setquantityCount] = useState[0];

export const handlequantityCount = () => {
  setquantityCount(quantityCount + 1);
};

export default handlequantityCount;
