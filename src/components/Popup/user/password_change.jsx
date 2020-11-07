import React from "react";
import { Message } from "../../../static/common";
import { Form, Close } from "../styles";

const index = (props) => {
  const { open, trigger } = props;

  return open ? (
    <Form onClick={trigger}>
      <Message>Password Changed Successfully</Message>
    </Form>
  ) : null;
};

export default index;
