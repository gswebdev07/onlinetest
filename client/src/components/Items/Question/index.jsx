import React from "react";
import { Question, Content, ImageContainer, QuestionTitle } from "./styles";
import { Buttons, Button } from "../../../static/common";
// Icons
import qboy from "../../../static/icons/buttons/question.png";
import edit from "../../../static/icons/buttons/edit.png";
import move from "../../../static/icons/buttons/move - Copy.png";
import bin from "../../../static/icons/buttons/bin.png";
// Redux
import { delete_question } from "../../../store/actions/data_actions";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const index = (props) => {
  const {
    question,
    trigger,
    toTopicsPage,
    current_directory,
    delete_question,
  } = props;
  const { question_title } = question;
  const { topic_id } = current_directory;

  const delete_questionFunc = async () => {
    await delete_question({ topic_id, question }).then(() => toTopicsPage());
  };

  return (
    <Question>
      <Content onClick={() => trigger("EDIT_QUESTION", question)}>
        <ImageContainer>
          <img
            alt="Question boy"
            src={qboy}
            width="40px"
            height="auto"
            style={{ padding: "5px" }}
          />
        </ImageContainer>
        <QuestionTitle>{question_title}</QuestionTitle>
      </Content>
      <Buttons>
        <Button onClick={() => trigger("EDIT_QUESTION", question)}>
          <img
            alt="edit"
            src={edit}
            width="20px"
            height="auto"
            style={{ margin: "2px 2px 0 0" }}
          />
        </Button>
        <Button onClick={() => trigger("MOVE_QUESTION", question)}>
          <img
            alt="move"
            src={move}
            width="20px"
            height="auto"
            style={{ margin: "2px 2px 0 0" }}
          />
        </Button>
        <Button onClick={delete_questionFunc}>
          <img
            alt="delete"
            src={bin}
            width="20px"
            height="auto"
            style={{ margin: "2px 2px 0 0" }}
          />
        </Button>
      </Buttons>
    </Question>
  );
};

index.propTypes = {
  current_directory: PropTypes.object.isRequired,
  delete_question: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  delete_question: (details) => dispatch(delete_question(details)),
});

const mapStateToProps = (state) => ({
  current_directory: state.data.current_directory,
});

export default connect(mapStateToProps, mapDispatchToProps)(index);
