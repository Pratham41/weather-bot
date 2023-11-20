import React from "react";

const FormLayout = ({ children }) => {
  return (
    <div className="flex flex-col justify-start items-center">{children}</div>
  );
};

export default FormLayout;
