import React from "react";

const PageContainer = ({ children }) => {
  const style = {
    paddingTop: "50px",
    width: "100%",
  };
  return <div style={style}>{children}</div>;
};

export default PageContainer;
