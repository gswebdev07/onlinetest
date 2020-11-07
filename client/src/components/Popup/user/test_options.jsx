import React, { useEffect } from "react";
import { StyledLink, Message } from "../../../static/common";
import { Form, PLink, Close } from "../styles";
// Redux
import { get_results } from "../../../store/actions/data_actions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { set_content } from "../../../store/actions/content_actions";

const test_options = (props) => {
  const {
    trigger,
    open,
    results,
    current_directory,
    get_results,
    onContentChange,
  } = props;
  const change_handler = (str) => {
    onContentChange(str);
  };
  useEffect(() => {
    get_results();
  }, []);

  return open ? (
    <Form>
      <Message>Test options:</Message>
      <Close onClick={trigger}>&times;</Close>
      <div
        className="subject-link"
        onClick={() => {
          change_handler("test_page");
        }}
      >
        <PLink>Take a test</PLink>
      </div>
      <div
        className="subject-link"
        onClick={() => {
          change_handler("bookmark_test");
        }}
      >
        <PLink>Take a bookmark test</PLink>
      </div>
      {/* {results.map((result, index) =>
        result.topic_id === current_directory.topic_id ? (
          <div
            className="subject-link"
            key={index}
            onClick={() => {
              change_handler("improvement_test");
            }}
          >
            <PLink>Take an improvement test</PLink>
          </div>
        ) : null
      )} */}
    </Form>
  ) : null;
};

test_options.propTypes = {
  results: PropTypes.array.isRequired,
  current_directory: PropTypes.object.isRequired,
  get_results: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  get_results: () => dispatch(get_results()),
  onContentChange: (str) => dispatch(set_content(str)),
});

const mapStateToProps = (state) => ({
  results: state.data.results,
  current_directory: state.data.current_directory,
});

export default connect(mapStateToProps, mapDispatchToProps)(test_options);
