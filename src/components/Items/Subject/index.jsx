import React from "react";
import { StyledLink, Buttons, Button } from "../../../static/common";
import {
  Subject,
  Content,
  SubjeckName,
  ImageContainer,
  Displayers,
  Displayer,
  Bookmark,
} from "./styles";
// Redux
import {
  hide_subject,
  delete_subject,
  set_directory,
} from "../../../store/actions/data_actions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// Icons
import hide from "../../../static/icons/buttons/hide.png";
import hide1 from "../../../static/icons/buttons/hide - Copy.png";
import edit from "../../../static/icons/buttons/edit-white.png";
import bin from "../../../static/icons/buttons/bin-white - Copy.png";
import { set_content } from "../../../store/actions/content_actions";
import "./styles.css";

const index = (props) => {
  const {
    chapters,
    topics,
    user,
    subject,
    trigger,
    hide_subject,
    delete_subject,
    set_directory,
    onContentChange,
    content,
  } = props;
  const {
    _id,
    class_name,
    subject_name,
    image_url,
    hidden,
    created_at,
  } = subject;
  const isAdmin = user === "Admin" ? true : false;

  // Functions
  const change_handler = (str) => {
    onContentChange(str);
    console.log(content);
  };

  const chapters_count = () => {
    return chapters.reduce((acc, cur) => {
      if (cur.class_name === class_name && cur.subject_name === subject_name)
        acc++;
      return acc;
    }, 0);
  };
  const questions_count = () => {
    return topics.reduce((acc, cur) => {
      if (cur.class_name === class_name && cur.subject_name === subject_name)
        cur.content.map(() => acc++);
      return acc;
    }, 0);
  };

  const set_directoryFunc = () => {
    set_directory({ class_name, subject_name });
  };

  // Buttons
  const hide_subjectFunc = () =>
    hide_subject({ subject_id: _id, hidden: !hidden });
  const delete_subjectFunc = () => delete_subject({ class_name, subject_name });

  const trimmedName =
    subject_name.length > 34 ? subject_name.slice(0, 33) + "..." : subject_name;

  return isAdmin ? (
    <Subject onClick={set_directoryFunc}>
      <Buttons>
        <Button onClick={hide_subjectFunc}>
          <img
            alt="hide"
            src={hidden ? hide1 : hide}
            width="20px"
            height="auto"
            style={{ margin: "2px 2px 0 0" }}
          />
        </Button>
        <Button onClick={() => trigger("EDIT_SUBJECT")}>
          <img
            alt="edit"
            src={edit}
            width="20px"
            height="auto"
            style={{ margin: "2px 2px 0 0" }}
          />
        </Button>
        <Button onClick={delete_subjectFunc}>
          <img
            alt="delete"
            src={bin}
            width="20px"
            height="auto"
            style={{ margin: "2px 2px 0 0" }}
          />
        </Button>
      </Buttons>
      <div
        className="subject-link"
        onClick={() => {
          change_handler(isAdmin ? "chap" : "userchap");
        }}
      >
        <Content>
          <Bookmark />
          <SubjeckName long={trimmedName.length > 11 ? true : false}>
            {trimmedName}
          </SubjeckName>
          <ImageContainer>
            <img
              alt="No image on subject"
              src={image_url}
              width="100%"
              height="auto"
              style={{ objectFit: "fit" }}
            />
          </ImageContainer>
          <Displayers>
            <Displayer>Chapters: {chapters_count()}</Displayer>
            <Displayer>Questions: {questions_count()}</Displayer>
          </Displayers>
        </Content>
      </div>
    </Subject>
  ) : hidden ? null : (
    <Subject onClick={set_directoryFunc}>
      <div
        className="subject-link"
        onClick={() => {
          change_handler(isAdmin ? "chap" : "userchap");
        }}
      >
        <Content>
          <Bookmark />
          <SubjeckName long={trimmedName.length > 11 ? true : false}>
            {trimmedName}
          </SubjeckName>
          <ImageContainer>
            <img
              alt="No image on subject"
              src={image_url}
              width="100%"
              height="auto"
            />
          </ImageContainer>
          <Displayers>
            <Displayer>Chapters: {chapters_count()}</Displayer>
            <Displayer>Questions: {questions_count()}</Displayer>
          </Displayers>
        </Content>
      </div>
    </Subject>
  );
};

index.propTypes = {
  user: PropTypes.string.isRequired,
  chapters: PropTypes.array.isRequired,
  topics: PropTypes.array.isRequired,
  hide_subject: PropTypes.func.isRequired,
  delete_subject: PropTypes.func.isRequired,
  set_directory: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  hide_subject: (order) => dispatch(hide_subject(order)),
  delete_subject: (details) => dispatch(delete_subject(details)),
  set_directory: (directory) => dispatch(set_directory(directory)),
  onContentChange: (str) => dispatch(set_content(str)),
});

const mapStateToProps = (state) => ({
  user: state.user.user,
  chapters: state.data.chapters,
  topics: state.data.topics,
  content: state.content.content,
});

export default connect(mapStateToProps, mapDispatchToProps)(index);
