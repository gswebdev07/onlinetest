import React, { useEffect, useState } from "react";
import { AddButton, Message } from "../static/common";
// Containers
import ItemsContainer from "../containers/ItemsContainer";
// Components
import Close from "../components/UI/Close";
import Subject from "../components/Items/Subject";
import ActSubject from "../components/Popup/act_subject";
import NavigationLinks from "../components/UI/NavigationLinks";
// Redux
import PropTypes from "prop-types";
import { connect } from "react-redux";
// Icons
import add from "../static/icons/buttons/add.png";

const Subjects = (props) => {
  const { subjects, current_directory, trigger } = props;
  return subjects.length > 0 ? (
    subjects.map((item, index) =>
      item.class_name === current_directory.class_name ? (
        <Subject key={index} subject={item} trigger={trigger} />
      ) : null
    )
  ) : (
    <Message>No subjects ...</Message>
  );
};

const subjects_page = (props) => {
  const { subjects, current_directory } = props;

  const [act, setAct] = useState("");
  const [open, setOpen] = useState(false);
  const toggle = (act) => {
    setAct(act);
    setOpen((prevState) => !prevState);
  };

  return (
    <div>
      {/* Popup */}
      <ActSubject open={open} trigger={toggle} act={act} />
      <Close open={open} trigger={toggle} />

      <NavigationLinks
        links={[{ dir: "class", name: current_directory.class_name }]}
      />
      <ItemsContainer>
        <Subjects
          subjects={subjects}
          current_directory={current_directory}
          trigger={toggle}
        />
      </ItemsContainer>
      <AddButton onClick={() => toggle("ADD_SUBJECT")}>
        Subject
        <img alt="add" src={add} width="35px" height="auto" />
      </AddButton>
    </div>
  );
};

subjects_page.propTypes = {
  subjects: PropTypes.array.isRequired,
  current_directory: PropTypes.object.isRequired,
};

const mapDispatchToProps = (dispatch) => ({});

const mapStateToProps = (state) => ({
  subjects: state.data.subjects,
  current_directory: state.data.current_directory,
});

export default connect(mapStateToProps, mapDispatchToProps)(subjects_page);
