import React from "react";

const Container = ({ children }) => {
  const style = {
    padding: "0 20px",
    width:"100%"
  };
  return <div style={style}>{children}</div>;
};

export default Container;
