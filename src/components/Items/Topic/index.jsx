import React, { useEffect } from "react";
import { StyledLink, Buttons, Button } from "../../../static/common";
import {
  Topic,
  Content,
  TopicName,
  ImageContainer,
  Displayer,
  Line,
} from "./styles";
// Redux
import {
  hide_topic,
  delete_topic,
  set_directory,
} from "../../../store/actions/data_actions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { set_content } from "../../../store/actions/content_actions";
// Icons
import hideB from "../../../static/icons/buttons/hide.png";
import hide from "../../../static/icons/buttons/hide - Copy.png";
import edit from "../../../static/icons/buttons/edit-white.png";
import move from "../../../static/icons/buttons/move.png";
import bin from "../../../static/icons/buttons/bin-white - Copy.png";

const index = (props) => {
  const {
    user,
    method,
    topic,
    trigger,
    set_directory,
    hide_topic,
    delete_topic,
    onContentChange,
  } = props;
  const {
    _id,
    class_name,
    subject_name,
    chapter_name,
    topic_name,
    content,
    image_url,
    hidden,
  } = topic;
  const isAdmin = user === "Admin" ? true : false;

  const change_handler = (str) => {
    onContentChange(str);
  };

  const set_directoryFunc = () => {
    set_directory({
      class_name,
      subject_name,
      chapter_name,
      topic_name,
      topic_id: _id,
      content,
    });
  };
  const questions_count = () => {
    return content.reduce((acc) => {
      acc++;
      return acc;
    }, 0);
  };

  // Buttons
  const delete_topicFunc = () =>
    delete_topic({ class_name, subject_name, chapter_name, topic_name });
  const hide_topicFunc = () => hide_topic({ topic_id: _id, hidden: !hidden });

  const trimmedName =
    topic_name.length > 34 ? topic_name.slice(0, 33) + "..." : topic_name;

  return isAdmin ? (
    <Topic onClick={set_directoryFunc}>
      {isAdmin ? (
        <Buttons>
          <Button onClick={hide_topicFunc}>
            <img
              alt="hide"
              src={hidden ? hide : hideB}
              width="20px"
              height="auto"
              style={{ margin: "2px 2px 0 0" }}
            />
          </Button>
          <Button onClick={() => trigger("EDIT_TOPIC")}>
            <img
              alt="edit"
              src={edit}
              width="20px"
              height="auto"
              style={{ margin: "2px 2px 0 0" }}
            />
          </Button>
          <Button onClick={() => trigger("MOVE_TOPIC")}>
            <img
              alt="move"
              src={move}
              width="20px"
              height="auto"
              style={{ margin: "2px 2px 0 0" }}
            />
          </Button>
          <Button onClick={delete_topicFunc}>
            <img
              alt="delete"
              src={bin}
              width="20px"
              height="auto"
              style={{ margin: "2px 2px 0 0" }}
            />
          </Button>
        </Buttons>
      ) : null}

      {isAdmin ? (
        <div
          className="subject-link"
          onClick={() => {
            change_handler("questions");
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
            <TopicName long={trimmedName.length > 12 ? true : false}>
              {trimmedName}
            </TopicName>
            <Displayer>Questions: {questions_count()}</Displayer>
          </Content>
        </div>
      ) : (
        <div
          className="subject-link"
          onClick={() => {
            change_handler(method === "TEST" ? "test_page" : "practice_page");
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
            <TopicName>{trimmedName}</TopicName>
            <Displayer>Questions: {questions_count()}</Displayer>
          </Content>
        </div>
      )}
    </Topic>
  ) : hidden ? null : (
    <Topic onClick={set_directoryFunc}>
      <Content onClick={trigger}>
        <ImageContainer>
          <img
            alt="No image on subject"
            src={image_url}
            width="100%"
            height="auto"
          />
        </ImageContainer>
        <TopicName long={trimmedName.length > 12 ? true : false}>
          {trimmedName}
        </TopicName>
        <Displayer>Questions: {questions_count()}</Displayer>
      </Content>
    </Topic>
  );
};

index.propTypes = {
  user: PropTypes.string.isRequired,
  method: PropTypes.string.isRequired,
  hide_topic: PropTypes.func.isRequired,
  delete_topic: PropTypes.func.isRequired,
  set_directory: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  hide_topic: (order) => dispatch(hide_topic(order)),
  delete_topic: (details) => dispatch(delete_topic(details)),
  set_directory: (directory) => dispatch(set_directory(directory)),
  onContentChange: (str) => dispatch(set_content(str)),
});

const mapStateToProps = (state) => ({
  user: state.user.user,
  method: state.user.method,
});

export default connect(mapStateToProps, mapDispatchToProps)(index);
