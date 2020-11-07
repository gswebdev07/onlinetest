import React from "react";
import { Message } from "../../static/common";
// Components
import Practice from "../../components/UI/Practice";
// Redux
import PropTypes from "prop-types";
import { connect } from "react-redux";

const practice_page = (props) => {
  const { current_directory } = props;
  const { topic_name, content } = current_directory;

  return (
    <div>
      <Message></Message>
      <Practice topic_name={topic_name} questions={content} />
    </div>
  );
};

practice_page.propTypes = {
  current_directory: PropTypes.object.isRequired,
};

const mapDispatchToProps = (dispatch) => ({});

const mapStateToProps = (state) => ({
  current_directory: state.data.current_directory,
  
});

export default connect(mapStateToProps, mapDispatchToProps)(practice_page);
