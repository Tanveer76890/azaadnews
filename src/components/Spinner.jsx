import React from "react";
import loading from "./spinner-image/loading2.gif";

const Spinner = () => {
  return (
    <div className="text-center">
      <img className="my-4" src={loading} alt="loading-spinner" />
    </div>
  );
};

export default Spinner;
