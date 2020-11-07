import React from "react";
import { Result } from "./styles";

const index = (props) => {
  const { result } = props;
  const {
    user_email,
    topic_name,
    amount_of_corrects,
    amount_of_questions,
  } = result;

  return (
    <Result>
      <td>{user_email}</td>
      <td>{topic_name}</td>
      <td>
        {amount_of_corrects}/{amount_of_questions}
      </td>
    </Result>
  );
};

export default index;
