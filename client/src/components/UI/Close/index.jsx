import React from "react";
import { Background } from "./styles";

const index = (props) => {
  const { open, trigger } = props;
  return open ? <Background onClick={trigger} /> : null;
};

export default index;
