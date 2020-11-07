import React, { useState } from "react";
import { Button } from "../../../static/common";
import {
  QA,
  Author,
  Asked,
  Answer,
  AnswerArea,
  DeleteBtn,
  SendBtn,
} from "./styles";
// Redux
import {
  answer_question,
  delete_qa,
} from "../../../store/actions/data_actions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import bin from "../../../static/icons/buttons/bin-white.png";

const index = (props) => {
  const { question, admin, answer_question, delete_qa } = props;
  // Checking for admin
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  var d = new Date(question.created_at);

  var date = d.getDate();
  var month = monthNames[d.getMonth()]; // Since getMonth() returns month from 0-11 not 1-12
  var year = d.getFullYear();

  var dateStr = month + " " + date + ", " + year;
  const isAdmin = admin === "Admin" ? true : false;

  // States
  const [answer, setAnswer] = useState("");

  // Handles
  const answerHandle = (e) => setAnswer(e.target.value);

  // Submits
  const submitHandle = (e) => {
    e.preventDefault();
    if (answer !== "") {
      answer_question({ question_id: question._id, answer });
    }
  };

  return (
    <QA color={question.answer ? "none" : "#4786E5"} onSubmit={submitHandle}>
      {isAdmin ? (
        <Author>Author: {question.user_email}</Author>
      ) : (
        <Author>{dateStr}</Author>
      )}

      {isAdmin ? (
        <DeleteBtn onClick={() => delete_qa(question._id)}>
          <img alt="delete" src={bin} width="20px" height="auto" />
        </DeleteBtn>
      ) : null}
      <Asked>{question.question}</Asked>
      {question.answer ? <Answer>{question.answer}</Answer> : null}
      {isAdmin && !question.answer ? (
        <React.Fragment>
          <AnswerArea
            placeholder={`User ${question.user_email} is waiting for your response ...`}
            value={answer}
            onChange={answerHandle}
          />
          <SendBtn type="submit">Send</SendBtn>
        </React.Fragment>
      ) : null}
    </QA>
  );
};

index.propTypes = {
  admin: PropTypes.string.isRequired,
  answer_question: PropTypes.func.isRequired,
  delete_qa: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  answer_question: (answer) => dispatch(answer_question(answer)),
  delete_qa: (question_id) => dispatch(delete_qa(question_id)),
});

const mapStateToProps = (state) => ({
  admin: state.user.user,
});

export default connect(mapStateToProps, mapDispatchToProps)(index);
