import React from "react";
import { Message } from "../../../static/common";
import { Form, PLink } from "../styles";

const set_time = ({ open, trigger }) => {
  return open ? (
    <Form>
      <Message>Set timer: </Message>
      <PLink onClick={() => trigger(30)}>30 min</PLink>
      <PLink onClick={() => trigger(60)}>60 min</PLink>
    </Form>
  ) : null;
};

export default set_time;
