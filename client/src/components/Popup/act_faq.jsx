import React, { useState } from "react";
import { Message } from "../../static/common";
import { Form, Label, Text, Button, Close } from "./styles";
// Redux
import { post_faq } from "../../store/actions/data_actions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Cross from "../../assets/cross.png";

const ActFAQ = (props) => {
  const { open, trigger, post_faq } = props;

  // States
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  // Handles
  const questionHandle = (e) => setQuestion(e.target.value);
  const answerHandle = (e) => setAnswer(e.target.value);

  // Submits
  const submitHandle = (e) => {
    e.preventDefault();
    post_faq({ question, answer }).then(() => {
      setQuestion("");
      setAnswer("");
    });
    trigger();
  };

  return open ? (
    <Form onSubmit={submitHandle}>
      <Message>New FAQ</Message>
      <Close onClick={trigger}>
        <img src={Cross} alt="Cross" width="20px" />
      </Close>
      <Label>
        FAQ question:
        <Text
          placeholder="Write here ..."
          value={question}
          onChange={questionHandle}
        />
      </Label>
      <Label>
        Answer:
        <Text
          placeholder="Write here ..."
          value={answer}
          onChange={answerHandle}
        />
      </Label>
      <Button type="submit">Add FAQ</Button>
    </Form>
  ) : null;
};

ActFAQ.propTypes = {
  post_faq: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  post_faq: (details) => dispatch(post_faq(details)),
});

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ActFAQ);
