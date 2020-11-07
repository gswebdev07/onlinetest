import React, { useState } from "react";
import { Message } from "../../static/common";
// Components
import Topic from "../../components/Items/Topic";
import TestOptions from "../../components/Popup/user/test_options";
import Close from "../../components/UI/Close";
import NavigationLinks from "../../components/UI/NavigationLinks";
// Containers
import ItemsContainer from "../../containers/ItemsContainer";
// Redux
import PropTypes from "prop-types";
import { set_content } from "../../store/actions/content_actions";
import { connect } from "react-redux";

const Topics = (props) => {
  const { topics, current_directory, trigger, onContentChange } = props;
  return topics.length > 0 ? (
    topics.map((item, index) =>
      item.subject_name === current_directory.subject_name &&
      item.chapter_name === current_directory.chapter_name ? (
        <Topic key={index} topic={item} trigger={trigger} />
      ) : null
    )
  ) : (
    <Message>No topics ...</Message>
  );
};

const chapters_page = (props) => {
  const { topics, method, current_directory, onContentChange } = props;

  // States
  const [open, setOpen] = useState(false);

  // Handles
  const toggle = () =>
    method === "TEST"
      ? setOpen((prevState) => !prevState)
      : onContentChange("practice_page");
  const directory = method === "TEST" ? "test" : "practice";
  return (
    <div>
      {/* Popup */}
      <TestOptions trigger={toggle} open={open} />
      <Close trigger={toggle} open={open} />

      {/* <Message>Take a {method === "TEST" ? "test" : "practice"}</Message> */}
      <NavigationLinks
        links={[
          { dir: directory, name: current_directory.subject_name },
          { dir: "userchap", name: current_directory.chapter_name },
        ]}
      />

      <ItemsContainer>
        <Topics
          topics={topics}
          current_directory={current_directory}
          trigger={toggle}
        />
      </ItemsContainer>
    </div>
  );
};

chapters_page.propTypes = {
  topics: PropTypes.array.isRequired,
  method: PropTypes.string.isRequired,
  current_directory: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  topics: state.data.topics,
  method: state.user.method,
  current_directory: state.data.current_directory,
});

const mapDispatchToProps = (dispatch) => ({
  onContentChange: (str) => dispatch(set_content(str)),
});

export default connect(mapStateToProps, mapDispatchToProps)(chapters_page);
