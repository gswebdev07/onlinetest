import React from "react";

const ItemsContainers = ({ children }) => {
  const style = {
    display: "flex",
    flexWrap: "wrap",
    marginTop: "2.5rem",
    width: "100%",
  };
  return <div style={style}>{children}</div>;
};

export default ItemsContainers;
