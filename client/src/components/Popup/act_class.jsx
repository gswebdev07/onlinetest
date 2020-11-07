import React, { useState, useEffect } from "react";
import { Message } from "../../static/common";
import { Form, Label, Input, Button, Close } from "./styles";
// Redux
import { add_class, edit_class } from "../../store/actions/data_actions";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const ActClass = (props) => {
  const {
    open,
    trigger,
    act,
    current_directory,
    add_class,
    edit_class,
  } = props;

  // States
  const [name, setName] = useState("");
  const [new_class_name, setNew_class_name] = useState("");

  // Handles
  const nameHandle = (e) => setName(e.target.value);
  const newNameHandle = (e) => setNew_class_name(e.target.value);

  // Submits
  const submitHandle = (e) => {
    e.preventDefault();
    name !== ""
      ? add_class({ class_name: name }).then(() => setName(""))
      : null;
    trigger();
  };
  const submitHandleUpdate = (e) => {
    e.preventDefault();
    new_class_name !== ""
      ? edit_class({ ...current_directory, new_class_name }).then(() =>
          setNew_class_name("")
        )
      : null;
    trigger();
  };

  useEffect(() => {
    if (current_directory.class_name !== undefined)
      setNew_class_name(current_directory.class_name);
  }, [current_directory]);

  return open ? (
    act === "ADD_CLASS" ? (
      <Form onSubmit={submitHandle}>
        <Message>New class</Message>
        <Close onClick={trigger}>&times;</Close>
        <Label>
          Class name:
          <Input
            placeholder="Write here ..."
            value={name}
            onChange={nameHandle}
          />
        </Label>
        <Button type="submit">Add class</Button>
      </Form>
    ) : (
      <Form onSubmit={submitHandleUpdate}>
        <Message>Edit class</Message>
        <Close onClick={trigger}>&times;</Close>
        <Label>
          Class name:
          <Input
            placeholder="Write here ..."
            value={new_class_name}
            onChange={newNameHandle}
          />
        </Label>
        <Button type="submit">Edit class</Button>
      </Form>
    )
  ) : null;
};

ActClass.propTypes = {
  current_directory: PropTypes.object.isRequired,
  add_class: PropTypes.func.isRequired,
  edit_class: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  add_class: (details) => dispatch(add_class(details)),
  edit_class: (details) => dispatch(edit_class(details)),
});

const mapStateToProps = (state) => ({
  current_directory: state.data.current_directory,
});

export default connect(mapStateToProps, mapDispatchToProps)(ActClass);
