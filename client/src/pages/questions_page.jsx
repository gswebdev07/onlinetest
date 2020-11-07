import React, { useState } from "react";
import { AddButton, Message } from "../static/common";
// Containers
import Container from "../containers/Container";
// Components
import Close from "../components/UI/Close";
import Question from "../components/Items/Question";
import ActQuestion from "../components/Popup/act_question";
import NavigationLinks from "../components/UI/NavigationLinks";
// Icons
import add from "../static/icons/buttons/add.png";
// Redux
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { set_content } from "../store/actions/content_actions";

let Questions = ({ questions, trigger, toTopicsPage }) => {
  return questions.length > 0 ? (
    questions.map((question, index) => (
      <Question
        key={index}
        question={question}
        trigger={trigger}
        toTopicsPage={toTopicsPage}
      />
    ))
  ) : (
    <Message>No questions ...</Message>
  );
};

const questions_page = (props) => {
  const { questions, current_directory, onContentChange } = props;
  const [act, setAct] = useState({ act: "", question: null });
  const [open, setOpen] = useState(false);

  const toggle = (act, question) => {
    if (!act && !question) {
      setAct({ act: "", question: null });
    } else if (!act) {
      setAct({ act: "", question });
    } else if (!question) {
      setAct({ act, question: null });
    } else {
      setAct({ act, question });
    }
    setOpen((prevState) => !prevState);
  };

  const toTopicsPage = () => onContentChange("topic");

  return (
    <div>
      {/* Popup */}
      <ActQuestion
        open={open}
        trigger={toggle}
        act={act}
        toTopicsPage={toTopicsPage}
      />
      <Close open={open} trigger={toggle} />

      <NavigationLinks
        links={[
          { dir: "class", name: current_directory.class_name },
          { dir: "subjects", name: current_directory.subject_name },
          { dir: "chap", name: current_directory.chapter_name },
          { dir: "topic", name: current_directory.topic_name },
        ]}
      />

      <Container>
        <Questions
          questions={questions}
          trigger={toggle}
          toTopicsPage={toTopicsPage}
        />
      </Container>
      <AddButton onClick={() => toggle("ADD_QUESTION")}>
        Question
        <img alt="add" src={add} width="35px" height="auto" />
      </AddButton>
    </div>
  );
};

questions_page.propTypes = {
  questions: PropTypes.array.isRequired,
  current_directory: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  questions: state.data.current_directory.content,
  current_directory: state.data.current_directory,
});

const mapDispatchToProps = (dispatch) => ({
  onContentChange: (str) => dispatch(set_content(str)),
});

export default connect(mapStateToProps, mapDispatchToProps)(questions_page);
