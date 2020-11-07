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

const bookmark_test_page = (props) => {
  const { current_directory, bookmarks, onContentChange } = props;
  const { topic_id, topic_name } = current_directory;

  // States
  const [open, setOpen] = useState(true);
  const [time, setTime] = useState(null);

  // Handles
  const toggle = (min) => {
    setOpen((prevState) => !prevState);
    setTime(min * 60);
  };

  const bookmark_questions = bookmarks.filter(
    (bookmark) =>
      bookmark.topic_id === current_directory.topic_id &&
      bookmark.topic_name === current_directory.topic_name
  );
  const filtered_questions = bookmark_questions.map((q) => q.question);

  return filtered_questions.length > 0 ? (
    <div>
      {/* Popup */}
      <SetTime open={open} trigger={toggle} />
      <Close open={open} />

      <Message>Bookmark test</Message>
      <Test
        to_results_page={() => onContentChange("resu")}
        topic_name={topic_name}
        topic_id={topic_id}
        questions={filtered_questions}
        time={time}
        setTime={setTime}
      />
    </div>
  ) : (
    <Message>
      You have no matched bookmark question for this topic yet :(
    </Message>
  );
};

bookmark_test_page.propTypes = {
  current_directory: PropTypes.object.isRequired,
  bookmarks: PropTypes.array.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  onContentChange: (str) => dispatch(set_content(str)),
});

const mapStateToProps = (state) => ({
  current_directory: state.data.current_directory,
  bookmarks: state.user.user_credentials.bookmarks,
});

export default connect(mapStateToProps, mapDispatchToProps)(bookmark_test_page);
