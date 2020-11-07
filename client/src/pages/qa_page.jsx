import React, { useState, useEffect } from "react";
import { Message, Form, SubForm, FormBtn } from "../static/common";
// Containers
import Container from "../containers/Container";
// Components
import Input from "../components/UI/Input";
import QA from "../components/Items/QA";
// Icons
import qa from "../static/icons/png/ques - Copy.png";
// Redux
import { get_questions, ask_question } from "../store/actions/data_actions";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const Questions = (props) => {
  const { questions } = props;
  return questions.map((question, index) => (
    <QA key={index} question={question} />
  ));
};

const qa_page = (props) => {
  const {
    admin,
    user_credentials,
    questions,
    get_questions,
    ask_question,
  } = props;
  // Checking for admin
  const isAdmin = admin === "Admin" ? true : false;

  // States
  const [question, setQuestion] = useState("");

  // Handles
  const questionHandle = (e) => setQuestion(e.target.value);

  // Submits
  const submitHandle = (e) => {
    e.preventDefault();
    if (question !== "") {
      ask_question(
        { email: user_credentials.email, question },
        user_credentials._id
      );
    }
  };

  useEffect(() => {
    if (isAdmin) {
      get_questions();
    } else {
      get_questions(user_credentials._id);
    }
  }, []);

  return (
    <div>
      <Message></Message>
      

      <Container>
        <Questions questions={questions} />
      </Container>
      {!isAdmin ? (
        <Form onSubmit={submitHandle}>
          <SubForm>
            <Input
              icon={qa}
              name="question"
              type="text"
              placeholder="What is your question ?"
              value={question}
              onChange={questionHandle}
            />
            <FormBtn type="submit">Ask</FormBtn>
          </SubForm>
        </Form>
      ) : null}
    </div>
  );
};

qa_page.propTypes = {
  admin: PropTypes.string.isRequired,
  user_credentials: PropTypes.object.isRequired,
  questions: PropTypes.array,
  get_questions: PropTypes.func.isRequired,
  ask_question: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  get_questions: (user_id) => dispatch(get_questions(user_id)),
  ask_question: (question, user_id) =>
    dispatch(ask_question(question, user_id)),
});

const mapStateToProps = (state) => ({
  admin: state.user.user,
  user_credentials: state.user.user_credentials,
  questions: state.data.questions,
});

export default connect(mapStateToProps, mapDispatchToProps)(qa_page);
