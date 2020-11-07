import React, { useState } from "react";
import { AddButton, Message } from "../static/common";
// Containers
import ItemsContainer from "../containers/ItemsContainer";
// Components
import Close from "../components/UI/Close";
import Chapter from "../components/Items/Chapter";
import ActChapter from "../components/Popup/act_chapter";
import NavigationLinks from "../components/UI/NavigationLinks";
// Redux
import { get_topics } from "../store/actions/data_actions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// Icons
import add from "../static/icons/buttons/add.png";

const Chapters = (props) => {
  const { chapters, current_directory, trigger } = props;
  return chapters.length > 0 ? (
    chapters.map((chapter, index) =>
      chapter.class_name === current_directory.class_name &&
      chapter.subject_name === current_directory.subject_name ? (
        <Chapter key={index} chapter={chapter} trigger={trigger} />
      ) : null
    )
  ) : (
    <Message>No chapters ...</Message>
  );
};

const chapters_page = (props) => {
  const { chapters, current_directory, get_topics } = props;

  const [act, setAct] = useState("");
  const [open, setOpen] = useState(false);
  const toggle = (act) => {
    setAct(act);
    setOpen((prevState) => !prevState);
  };

  return (
    <div>
      {/* Popup */}
      <ActChapter open={open} trigger={toggle} act={act} />
      <Close open={open} trigger={toggle} />

      <NavigationLinks
        links={[
          { dir: "class", name: current_directory.class_name },
          { dir: "subjects", name: current_directory.subject_name },
        ]}
      />
      <ItemsContainer>
        <Chapters
          chapters={chapters}
          current_directory={current_directory}
          trigger={toggle}
        />
      </ItemsContainer>
      <AddButton onClick={() => toggle("ADD_CHAPTER")}>
        Chapter
        <img alt="add" src={add} width="35px" height="auto" />
      </AddButton>
    </div>
  );
};

chapters_page.propTypes = {
  chapters: PropTypes.array.isRequired,
  current_directory: PropTypes.object.isRequired,
  get_topics: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  get_topics: () => dispatch(get_topics()),
});

const mapStateToProps = (state) => ({
  chapters: state.data.chapters,
  current_directory: state.data.current_directory,
});

export default connect(mapStateToProps, mapDispatchToProps)(chapters_page);
