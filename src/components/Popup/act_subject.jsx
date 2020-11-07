import React, { useState, useEffect } from "react";
import { Message } from "../../static/common";
import { Form, Label, Input, Button, Close } from "./styles";
// Redux
import { add_subject, edit_subject } from "../../store/actions/data_actions";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const ActSubject = (props) => {
  const {
    open,
    trigger,
    act,
    current_directory,
    add_subject,
    edit_subject,
  } = props;

  // States
  const [name, setName] = useState("");
  const [new_subject_name, setNew_subject_name] = useState("");
  const [image, setImage] = useState(null);

  // Handles
  const nameHandle = (e) => setName(e.target.value);
  const newNameHandle = (e) => setNew_subject_name(e.target.value);
  const imageHandle = (e) => setImage(e.target.files[0]);

  // Submits
  const submitHandle = (e) => {
    e.preventDefault();
    name !== ""
      ? add_subject({ ...current_directory, subject_name: name }).then(() =>
          setName("")
        )
      : null;
    trigger();
  };
  const submitHandleUpdate = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("class_name", current_directory.class_name);
    formData.append("subject_name", current_directory.subject_name);
    formData.append("new_subject_name", new_subject_name);
    image && formData.append("image_url", image, image.name);

    new_subject_name !== "" || image !== null
      ? edit_subject(formData).then(() => setNew_subject_name(""))
      : null;
    trigger();
  };

  useEffect(() => {
    if (current_directory.subject_name !== undefined)
      setNew_subject_name(current_directory.subject_name);
  }, [current_directory]);

  return open ? (
    act === "ADD_SUBJECT" ? (
      <Form onSubmit={submitHandle}>
        <Message>New subject</Message>
        <Close onClick={trigger}>&times;</Close>
        <Label>
          Subject name:
          <Input
            placeholder="Write here ..."
            value={name}
            onChange={nameHandle}
          />
        </Label>
        <Button type="submit">Add subject</Button>
      </Form>
    ) : (
      <Form onSubmit={submitHandleUpdate}>
        <Message>Edit subject</Message>
        <Close onClick={trigger}>&times;</Close>
        <Label>
          Subject name:
          <Input
            placeholder="Write here ..."
            value={new_subject_name}
            onChange={newNameHandle}
          />
        </Label>
        <Label>
          Attached image:
          <Input type="file" name="image_url" onChange={imageHandle} />
        </Label>
        <Button type="submit">Edit subject</Button>
      </Form>
    )
  ) : null;
};

ActSubject.propTypes = {
  current_directory: PropTypes.object.isRequired,
  add_subject: PropTypes.func.isRequired,
  edit_subject: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  add_subject: (details) => dispatch(add_subject(details)),
  edit_subject: (details) => dispatch(edit_subject(details)),
});

const mapStateToProps = (state) => ({
  current_directory: state.data.current_directory,
});

export default connect(mapStateToProps, mapDispatchToProps)(ActSubject);
