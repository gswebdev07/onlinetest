import React, { useState } from "react";
import { AddButton, Message } from "../static/common";
// Containers
import ItemsContainer from "../containers/ItemsContainer";
// Components
import Close from "../components/UI/Close";
import Topic from "../components/Items/Topic";
import ActTopic from "../components/Popup/act_topic";
import NavigationLinks from "../components/UI/NavigationLinks";
// Redux
import PropTypes from "prop-types";
import { connect } from "react-redux";
// Icons
import add from "../static/icons/buttons/add.png";

const Topics = (props) => {
  const { topics, current_directory, trigger } = props;
  return topics.length > 0 ? (
    topics.map((topic, index) =>
      topic.class_name === current_directory.class_name &&
      topic.subject_name === current_directory.subject_name &&
      topic.chapter_name === current_directory.chapter_name ? (
        <Topic key={index} topic={topic} trigger={trigger} />
      ) : null
    )
  ) : (
    <Message>No topics ...</Message>
  );
};

const topics_page = (props) => {
  const { topics, current_directory } = props;

  const [act, setAct] = useState("");
  const [open, setOpen] = useState(false);
  const toggle = (act) => {
    setAct(act);
    setOpen((prevState) => !prevState);
  };

  return (
    <div>
      {/* Popup */}
      <ActTopic open={open} trigger={toggle} act={act} />
      <Close open={open} trigger={toggle} />

      <NavigationLinks
        links={[
          { dir: "class", name: current_directory.class_name },
          { dir: "subjects", name: current_directory.subject_name },
          { dir: "chap", name: current_directory.chapter_name },
        ]}
      />
      <ItemsContainer>
        <Topics
          topics={topics}
          current_directory={current_directory}
          trigger={toggle}
        />
      </ItemsContainer>
      <AddButton onClick={() => toggle("ADD_TOPIC")}>
        Topic
        <img alt="add" src={add} width="35px" height="auto" />
      </AddButton>
    </div>
  );
};

topics_page.propTypes = {
  topics: PropTypes.array.isRequired,
  current_directory: PropTypes.object.isRequired,
};

const mapDispatchToProps = (dispatch) => ({});

const mapStateToProps = (state) => ({
  topics: state.data.topics,
  current_directory: state.data.current_directory,
});

export default connect(mapStateToProps, mapDispatchToProps)(topics_page);
