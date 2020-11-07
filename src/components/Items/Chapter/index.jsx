import React from "react";
import { StyledLink, Buttons, Button } from "../../../static/common";
import {
  Chapter,
  Content,
  ChapterName,
  ImageContainer,
  Displayers,
  Displayer,
  Line,
} from "./styles";
// Redux
import {
  hide_chapter,
  delete_chapter,
  set_directory,
} from "../../../store/actions/data_actions";
import PropTypes, { object } from "prop-types";
import { connect } from "react-redux";
import { set_content } from "../../../store/actions/content_actions";
// Icons
import hide from "../../../static/icons/buttons/hide - Copy.png";
import hideB from "../../../static/icons/buttons/hide.png";
import edit from "../../../static/icons/buttons/edit-white.png";
import bin from "../../../static/icons/buttons/bin-white - Copy.png";

const index = (props) => {
  const {
    chapter,
    trigger,
    topics,
    user,
    hide_chapter,
    delete_chapter,
    set_directory,
    onContentChange,
  } = props;
  const {
    _id,
    class_name,
    subject_name,
    chapter_name,
    hidden,
    image_url,
  } = chapter;
  const isAdmin = user === "Admin" ? true : false;

  // Functions

  const change_handler = (str) => {
    onContentChange(str);
  };

  const topics_count = () => {
    return topics.reduce((acc, cur) => {
      if (
        cur.class_name === class_name &&
        cur.subject_name === subject_name &&
        cur.chapter_name === chapter_name
      )
        acc++;
      return acc;
    }, 0);
  };
  const questions_count = () => {
    return topics.reduce((acc, cur) => {
      if (
        cur.class_name === class_name &&
        cur.subject_name === subject_name &&
        cur.chapter_name === chapter_name
      )
        cur.content.map(() => acc++);
      return acc;
    }, 0);
  };

  const set_directoryFunc = () =>
    set_directory({ class_name, subject_name, chapter_name });

  // Buttons
  const delete_chapterFunc = () =>
    delete_chapter({ class_name, subject_name, chapter_name });
  const hide_chapterFunc = () =>
    hide_chapter({ chapter_id: _id, hidden: !hidden });

  const trimmedName =
    chapter_name.length > 34 ? chapter_name.slice(0, 33) + "..." : chapter_name;

  return isAdmin ? (
    <Chapter onClick={set_directoryFunc}>
      <Buttons>
        <Button onClick={hide_chapterFunc}>
          <img
            alt="hide"
            src={hidden ? hide : hideB}
            width="20px"
            height="auto"
            style={{ margin: "2px 2px 0 0" }}
          />
        </Button>
        <Button onClick={() => trigger("EDIT_CHAPTER")}>
          <img
            alt="edit"
            src={edit}
            width="20px"
            height="auto"
            style={{ margin: "2px 2px 0 0" }}
          />
        </Button>
        <Button onClick={delete_chapterFunc}>
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
          change_handler(isAdmin ? "topic" : "usertopic");
        }}
      >
        <Content>
          <ImageContainer>
            <img
              alt="No image on subject"
              src={image_url}
              width="100%"
              height="auto"
            />
          </ImageContainer>
          <ChapterName long={trimmedName.length > 14 ? true : false}>
            {trimmedName}
          </ChapterName>
          <Displayers>
            <Displayer>Topics: {topics_count()}</Displayer>
            <Displayer>Questions: {questions_count()}</Displayer>
          </Displayers>
        </Content>
      </div>
    </Chapter>
  ) : hidden ? null : (
    <Chapter onClick={set_directoryFunc}>
      <div
        className="subject-link"
        onClick={() => {
          change_handler(isAdmin ? "topic" : "usertopic");
        }}
      >
        <Content>
          <ImageContainer >
            <img
              alt="No image on subject"
              src={image_url}
              width="100%"
              height="auto"
              
            />
          </ImageContainer>
          <ChapterName long={trimmedName.length > 14 ? true : false}>
            {trimmedName}
          </ChapterName>
          <Displayers>
            <Displayer>Topics: {topics_count()}</Displayer>
            <Displayer>Questions: {questions_count()}</Displayer>
          </Displayers>
        </Content>
      </div>
    </Chapter>
  );
};

index.propTypes = {
  user: PropTypes.string.isRequired,
  topics: PropTypes.array.isRequired,
  hide_chapter: PropTypes.func.isRequired,
  delete_chapter: PropTypes.func.isRequired,
  set_directory: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  hide_chapter: (order) => dispatch(hide_chapter(order)),
  delete_chapter: (details) => dispatch(delete_chapter(details)),
  set_directory: (directory) => dispatch(set_directory(directory)),
  onContentChange: (str) => dispatch(set_content(str)),
});

const mapStateToProps = (state) => ({
  topics: state.data.topics,
  user: state.user.user,
});

export default connect(mapStateToProps, mapDispatchToProps)(index);
