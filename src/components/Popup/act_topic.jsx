import React, { useState, useEffect } from "react";
import { Message } from "../../static/common";
import Select from "react-select";
import { Form, Label, Input, Text, Button, Close } from "./styles";
// Redux
import {
  add_topic,
  edit_topic,
  move_topic,
} from "../../store/actions/data_actions";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const ActTopic = (props) => {
  const {
    open,
    trigger,
    act,
    current_directory,
    add_topic,
    edit_topic,
    move_topic,
    subjects,
    chapters,
  } = props;

  // States
  const [name, setName] = useState("");
  const [new_topic_name, setNew_topic_name] = useState("");
  const [image, setImage] = useState(null);

  // Handles
  const nameHandle = (e) => setName(e.target.value);
  const newNameHandle = (e) => setNew_topic_name(e.target.value);
  const imageHandle = (e) => setImage(e.target.files[0]);

  // Submits
  const submitHandle = (e) => {
    e.preventDefault();
    name !== ""
      ? add_topic({ ...current_directory, topic_name: name }).then(() =>
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
    formData.append("topic_name", current_directory.topic_name);
    formData.append("new_topic_name", new_topic_name);
    image && formData.append("image_url", image, image.name);
    new_topic_name !== ""
      ? edit_topic(formData).then(() => setNew_topic_name(""))
      : null;
    trigger();
  };

  // Select options
  const [subject_option, setSubject_option] = useState({
    label: "Subjects",
    value: "",
  });
  const filtered_subjects = subjects.filter(
    (subject) => subject.class_name === current_directory.class_name
  );
  const subject_options = filtered_subjects.map((subject) => ({
    label: subject.subject_name,
    value: subject.subject_name,
  }));
  const subjectOptionHandle = (e) => setSubject_option(e);

  // Chapter options
  const [chapter_option, setChapter_option] = useState({
    label: "Chapters",
    value: "",
  });
  let filtered_chapters = chapters.filter(
    (chapter) => subject_option.value === chapter.subject_name
  );
  const chapter_options = filtered_chapters.map((c) => ({
    label: c.chapter_name,
    value: c.chapter_name,
  }));
  const chapterOptionHandle = (e) => setChapter_option(e);
  // Move topic
  const submitHandleMove = (e) => {
    e.preventDefault();
    if (
      current_directory.class_name !== "" &&
      subject_option.value !== "" &&
      chapter_option.value !== ""
    )
      move_topic({
        topic_id: current_directory.topic_id,
        topic_name: current_directory.topic_name,
        new_class_name: current_directory.class_name,
        new_subject_name: subject_option.value,
        new_chapter_name: chapter_option.value,
      });
    trigger();
  };

  const styles = {
    control: (provided, state) => ({
      ...provided,
      height: "40px",
      border: "1px solid #aaa",
      boxShadow: "0 !important",
      "&:hover": { boxShadow: "0 !important" },
    }),
    option: (provided, state) => ({
      ...provided,
      background: "#fff",
      color: "#37474f",
      "&:hover": { background: "#eee" },
    }),
  };

  useEffect(() => {
    if (current_directory.topic_name !== undefined)
      setNew_topic_name(current_directory.topic_name);
  }, [current_directory]);

  return open ? (
    act === "ADD_TOPIC" ? (
      <Form onSubmit={submitHandle}>
        <Message>New topic</Message>
        <Close onClick={trigger}>&times;</Close>
        <Label>
          Topic name:
          <Input
            placeholder="Write here ..."
            value={name}
            onChange={nameHandle}
          />
        </Label>
        <Button type="submit">Add topic</Button>
      </Form>
    ) : act === "EDIT_TOPIC" ? (
      <Form onSubmit={submitHandleUpdate}>
        <Message>Edit topic</Message>
        <Close onClick={trigger}>&times;</Close>
        <Label>
          Topic name:
          <Input
            placeholder="New topic name"
            value={new_topic_name}
            onChange={newNameHandle}
          />
        </Label>
        <Label>
          Attached image:
          <Input type="file" name="image_url" onChange={imageHandle} />
        </Label>
        <Button type="submit">Edit topic</Button>
      </Form>
    ) : (
      <Form onSubmit={submitHandleMove}>
        <Message>Move topic</Message>
        <Close onClick={trigger}>&times;</Close>
        <Select
          styles={styles}
          value={subject_option}
          onChange={subjectOptionHandle}
          options={subject_options}
          isSearchable={false}
          placeholder="To subject ..."
        />
        <Select
          styles={styles}
          value={chapter_option}
          onChange={chapterOptionHandle}
          options={chapter_options}
          isSearchable={false}
          placeholder="To chapter ..."
        />
        <Button type="submit">Move topic</Button>
      </Form>
    )
  ) : null;
};

ActTopic.propTypes = {
  current_directory: PropTypes.object.isRequired,
  add_topic: PropTypes.func.isRequired,
  edit_topic: PropTypes.func.isRequired,
  move_topic: PropTypes.func.isRequired,
  subjects: PropTypes.array.isRequired,
  chapters: PropTypes.array.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  add_topic: (details) => dispatch(add_topic(details)),
  edit_topic: (details) => dispatch(edit_topic(details)),
  move_topic: (details) => dispatch(move_topic(details)),
});

const mapStateToProps = (state) => ({
  current_directory: state.data.current_directory,
  subjects: state.data.subjects,
  chapters: state.data.chapters,
});

export default connect(mapStateToProps, mapDispatchToProps)(ActTopic);
