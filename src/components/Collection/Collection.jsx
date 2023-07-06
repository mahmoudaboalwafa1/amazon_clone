import React from "react";
import Header from "../Header/Header";

// Collection => To collect the header and any other element
const Collection = ({ element }) => {
  return (
    <>
      <Header />
      {element}
    </>
  );
};

export default Collection;
