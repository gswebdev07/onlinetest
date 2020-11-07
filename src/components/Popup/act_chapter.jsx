import React, { useState, useEffect } from "react";
import { Message } from "../../static/common";
import { Form, Label, Input, Button, Close } from "./styles";
// Redux
import { add_chapter, edit_chapter } from "../../store/actions/data_actions";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const AddChapter = (props) => {
  const {
    open,
    trigger,
    act,
    current_directory,
    add_chapter,
    edit_chapter,
  } = props;

  // States
  const [name, setName] = useState("");
  const [new_chapter_name, setNew_chapter_name] = useState("");
  const [image, setImage] = useState(null);

  // Handles
  const nameHandle = (e) => setName(e.target.value);
  const newNameHandle = (e) => setNew_chapter_name(e.target.value);
  const imageHandle = (e) => setImage(e.target.files[0]);

  // Submits
  const submitHandle = (e) => {
    e.preventDefault();
    name !== ""
      ? add_chapter({ ...current_directory, chapter_name: name }).then(() =>
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
    formData.append("chapter_name", current_directory.chapter_name);
    formData.append("new_chapter_name", new_chapter_name);
    image && formData.append("image_url", image, image.name);
    new_chapter_name !== "" || image !== null
      ? edit_chapter(formData).then(() => setNew_chapter_name(""))
      : null;
    trigger();
  };

  useEffect(() => {
    if (current_directory.chapter_name !== undefined)
      setNew_chapter_name(current_directory.chapter_name);
  }, [current_directory]);

  return open ? (
    act === "ADD_CHAPTER" ? (
      <Form onSubmit={submitHandle}>
        <Message>New chapter</Message>
        <Close onClick={trigger}>&times;</Close>
        <Label>
          Chapter name:
          <Input
            placeholder="Write here ..."
            value={name}
            onChange={nameHandle}
          />
        </Label>
        <Button type="submit">Add chapter</Button>
      </Form>
    ) : (
      <Form onSubmit={submitHandleUpdate}>
        <Message>Edit chapter</Message>
        <Close onClick={trigger}>&times;</Close>
        <Label>
          Chapter name:
          <Input
            placeholder="Write here ..."
            value={new_chapter_name}
            onChange={newNameHandle}
          />
        </Label>
        <Label>
          Attached image:
          <Input type="file" name="image_url" onChange={imageHandle} />
        </Label>
        <Button type="submit">Edit chapter</Button>
      </Form>
    )
  ) : null;
};

AddChapter.propTypes = {
  current_directory: PropTypes.object.isRequired,
  add_chapter: PropTypes.func.isRequired,
  edit_chapter: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  add_chapter: (details) => dispatch(add_chapter(details)),
  edit_chapter: (details) => dispatch(edit_chapter(details)),
});

const mapStateToProps = (state) => ({
  current_directory: state.data.current_directory,
});

export default connect(mapStateToProps, mapDispatchToProps)(AddChapter);
