import React from "react";
import { Burger, Line } from "./styles";

const index = ({ trigger }) => {
  return (
    <Burger onClick={trigger}>
      <Line />
      <Line />
      <Line />
    </Burger>
  );
};

export default index;
