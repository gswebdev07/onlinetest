import React, { useEffect, useState } from "react";
import { AddButton, Message } from "../static/common";
// Containers
import ItemsContainer from "../containers/ItemsContainer";
// Comoponents
import Close from "../components/UI/Close";
import Class from "../components/Items/Class";
import ActClass from "../components/Popup/act_class";
// Redux
import { get_classes, get_users } from "../store/actions/data_actions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// Icons
import add from "../static/icons/buttons/add.png";

const Classes = ({ classes, trigger }) => {
  return classes.length > 0 ? (
    classes.map((item, index) => (
      <Class key={index} data={item} trigger={trigger} />
    ))
  ) : (
    <Message>No classes ...</Message>
  );
};

const classes_page = (props) => {
  const { classes, get_users, get_classes } = props;
  useEffect(() => {
    get_users();
    get_classes();
  }, []);

  const [act, setAct] = useState("");
  const [open, setOpen] = useState(false);
  const toggle = (act) => {
    setAct(act);
    setOpen((prevState) => !prevState);
  };

  return (
    <div>
      {/* Popup */}
      <ActClass open={open} trigger={toggle} act={act} />
      <Close open={open} trigger={toggle} />

      <ItemsContainer>
        <Classes classes={classes} trigger={toggle} />
      </ItemsContainer>
      <AddButton onClick={() => toggle("ADD_CLASS")}>
        ADD CLASS
        <img alt="add" src={add} width="35px" height="auto" />
      </AddButton>
    </div>
  );
};

classes_page.propTypes = {
  classes: PropTypes.array.isRequired,
  get_users: PropTypes.func.isRequired,
  get_classes: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  get_users: () => dispatch(get_users()),
  get_classes: () => dispatch(get_classes()),
});

const mapStateToProps = (state) => ({
  classes: state.data.classes,
});

export default connect(mapStateToProps, mapDispatchToProps)(classes_page);
