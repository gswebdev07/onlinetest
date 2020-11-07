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

const improvement_test = (props) => {
  const { current_directory, results, onContentChange } = props;
  const { topic_id, topic_name } = current_directory;

  // States
  const [open, setOpen] = useState(true);
  const [time, setTime] = useState(null);

  // Handles
  const toggle = (min) => {
    setOpen((prevState) => !prevState);
    setTime(min * 60);
  };

  const results_questions = results.filter((result) => {
    return result.topic_id === topic_id;
  });
  const filtered_questions = results_questions[0].results.filter(
    (q) => q.picked_option !== q.correct_option
  );

  return filtered_questions.length > 0 ? (
    <div>
      {/* Popup */}
      <SetTime open={open} trigger={toggle} />
      <Close open={open} />

      <Message>Improvement test</Message>
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

improvement_test.propTypes = {
  current_directory: PropTypes.object.isRequired,
  results: PropTypes.array.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  onContentChange: (str) => dispatch(set_content(str)),
});

const mapStateToProps = (state) => ({
  current_directory: state.data.current_directory,
  results: state.data.results,
});

export default connect(mapStateToProps, mapDispatchToProps)(improvement_test);
