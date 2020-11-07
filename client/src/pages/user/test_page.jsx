import React, { useState } from "react";
import { Message } from "../../static/common";
// Components
import Test from "../../components/UI/Test";
import SetTime from "../../components/Popup/user/set_time";
import Close from "../../components/UI/Close";
// Redux
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { set_content } from "../../store/actions/content_actions";

const test_page = (props) => {
  const { current_directory, onContentChange } = props;
  const {
    topic_id,
    topic_name,
    content,
    chapter_name,
    subject_name,
  } = current_directory;

  const change_handler = (str) => {
    onContentChange(str);
  };
  // States
  const [open, setOpen] = useState(true);
  const [time, setTime] = useState(null);

  // Handles
  const toggle = (min) => {
    setOpen((prevState) => !prevState);
    setTime(min * 60);
  };

  return content.length > 0 ? (
    <div>
      {/* Popup */}
      <SetTime open={open} trigger={toggle} />
      <Close open={open} />

      <Message></Message>
      <Test
        to_results_page={() => change_handler("resu")}
        topic_name={topic_name}
        topic_id={topic_id}
        chapter_name={chapter_name}
        subject_name={subject_name}
        questions={content}
        time={time}
        setTime={setTime}
        current_directory={current_directory}
      />
    </div>
  ) : (
    <Message>Sorry, but topic has no questions yet.</Message>
  );
};

test_page.propTypes = {
  current_directory: PropTypes.object.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  onContentChange: (str) => dispatch(set_content(str)),
});

const mapStateToProps = (state) => ({
  current_directory: state.data.current_directory,
});

export default connect(mapStateToProps, mapDispatchToProps)(test_page);
