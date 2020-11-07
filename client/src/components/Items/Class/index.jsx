import React from "react";
import { StyledLink, Buttons, Button } from "../../../static/common";
import { Class, ClassName, Stick, Content, Displayer } from "./styles";
// Redux
import {
  delete_class,
  set_directory,
} from "../../../store/actions/data_actions";
import { set_content } from "../../../store/actions/content_actions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// Icons
import edit from "../../../static/icons/buttons/edit.png";
import bin from "../../../static/icons/buttons/bin.png";
import "./styles.css";

const index = (props) => {
  const {
    data,
    trigger,
    users,
    subjects,
    topics,
    set_directory,
    delete_class,
    onContentChange,
    content,
  } = props;
  const { class_name } = data;
  const change_handler = (str) => {
    onContentChange(str);
  };

  const set_directoryFunc = () => {
    set_directory({ class_name });
  };

  // Count functions
  const users_count = () => {
    return users.reduce((acc, cur) => {
      if (cur.class === class_name) acc++;
      return acc;
    }, 0);
  };
  const subjects_count = () => {
    return subjects.reduce((acc, cur) => {
      if (cur.class_name === class_name) acc++;
      return acc;
    }, 0);
  };
  const questions_count = () => {
    return topics.reduce((acc, cur) => {
      if (cur.class_name === class_name) cur.content.map(() => acc++);
      return acc;
    }, 0);
  };

  // Buttons
  const delete_classFunc = () => delete_class({ class_name });

  return (
    <Class
      onClick={() => {
        set_directoryFunc();
      }}
    >
      {users_count() > 0 ? null : (
        <Buttons>
          <button
            className="class-button"
            onClick={() => trigger("EDIT_CLASS")}
          >
            <img alt="edit" src={edit} width="20px" height="auto" />
          </button>
          <button className="class-button" onClick={delete_classFunc}>
            <img alt="delete" src={bin} width="20px" height="auto" />
          </button>
        </Buttons>
      )}

      <div className="class-link" onClick={() => change_handler("subjects")}>
        <ClassName>{class_name}</ClassName>
        <div className="class-stick" />
        <Content>
          <Displayer>Students: {users_count()}</Displayer>
          <Displayer>Subjects: {subjects_count()}</Displayer>
          <Displayer>Questions: {questions_count()}</Displayer>
        </Content>
      </div>
    </Class>
  );
};

index.propTypes = {
  users: PropTypes.array.isRequired,
  subjects: PropTypes.array.isRequired,
  topics: PropTypes.array.isRequired,
  delete_class: PropTypes.func.isRequired,
  set_directory: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  delete_class: (details) => dispatch(delete_class(details)),
  set_directory: (directory) => dispatch(set_directory(directory)),
  onContentChange: (str) => dispatch(set_content(str)),
});

const mapStateToProps = (state) => ({
  users: state.data.users,
  subjects: state.data.subjects,
  topics: state.data.topics,
  content: state.content.content,
});

export default connect(mapStateToProps, mapDispatchToProps)(index);
