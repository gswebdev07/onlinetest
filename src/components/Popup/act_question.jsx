import React, { useState, useEffect } from "react";
import Select from "react-select";
import { Message } from "../../static/common";
import { Form, Label, Input, Button, Close } from "./styles";
// Redux
import {
  add_question,
  update_question,
  update_question_file,
  move_question,
} from "../../store/actions/data_actions";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const ActQuestion = (props) => {
  const {
    open,
    trigger,
    act,
    subjects,
    chapters,
    topics,
    current_directory,
    add_question,
    update_question,
    update_question_file,
    move_question,
    toTopicsPage,
  } = props;

  // States
  const [question_title, setQuestion_title] = useState("");
  const [correct_option, setCorrect_option] = useState("");
  const [option_1, setOption_1] = useState("");
  const [option_2, setOption_2] = useState("");
  const [option_3, setOption_3] = useState("");

  // Add question (Handles)
  const titleHandle = (e) => setQuestion_title(e.target.value);
  const answerHandle = (e) => setCorrect_option(e.target.value);
  const option_1Handle = (e) => setOption_1(e.target.value);
  const option_2Handle = (e) => setOption_2(e.target.value);
  const option_3Handle = (e) => setOption_3(e.target.value);
  // Update handles
  const fileHandle = (e) => {
    const file = e.target.files[0];
    const { question } = act;
    const formData = new FormData();
    formData.append("topic_id", current_directory.topic_id);
    formData.append("question", question.question_title);
    formData.append("question_title", question_title);
    formData.append("correct_option", correct_option);
    formData.append("option_1", option_1);
    formData.append("option_2", option_2);
    formData.append("option_3", option_3);
    file && formData.append("file_url", file, file.name);

    update_question_file(formData);
    trigger();
    toTopicsPage();
  };

  // Submits
  const submitHandle = (e) => {
    e.preventDefault();
    if (question_title !== "" && correct_option !== "" && option_1 !== "")
      add_question({
        ...current_directory,
        question_title,
        correct_option,
        option_1,
        option_2,
        option_3,
      });
    setQuestion_title("");
    setCorrect_option("");
    setOption_1("");
    setOption_2("");
    setOption_3("");
    trigger();
    toTopicsPage();
  };
  const submitHandleUpdate = (e) => {
    e.preventDefault();
    update_question({
      topic_id: current_directory.topic_id,
      question: act.question,
      question_title:
        question_title === "" ? act.question.question_title : question_title,
      correct_option:
        correct_option === "" ? act.question.correct_option : correct_option,
      option_1: option_1 === "" ? act.question.option_1 : option_1,
      option_2: option_2 === "" ? act.question.option_2 : option_2,
      option_3: option_3 === "" ? act.question.option_3 : option_3,
    });
    trigger();
    toTopicsPage();
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

  // Topic options
  const [topic_option, setTopic_option] = useState({
    label: "Topics",
    value: "",
  });
  let filtered_topics = topics.filter(
    (topic) =>
      topic.subject_name === subject_option.value &&
      topic.chapter_name === chapter_option.value
  );
  const topic_options = filtered_topics.map((topic) => ({
    ...topic,
    label: topic.topic_name,
    value: topic.topic_name,
  }));
  const topicOptionHandle = (e) => setTopic_option(e);

  // Move question
  const submitHandleMove = (e) => {
    e.preventDefault();
    if (topic_option._id !== undefined)
      move_question({
        topic_id: current_directory.topic_id,
        question: act.question,
        new_topic_id: topic_option._id,
      });
    trigger();
    toTopicsPage();
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
    if (act.question !== null) {
      setQuestion_title(act.question.question_title);
      setCorrect_option(act.question.correct_option);
      setOption_1(act.question.option_1);
      setOption_2(act.question.option_2);
      setOption_3(act.question.option_3);
    }
  }, [act]);

  return open ? (
    act.act === "ADD_QUESTION" ? (
      <Form onSubmit={submitHandle}>
        <Message>New question</Message>
        <Close onClick={trigger}>&times;</Close>
        <Label>
          Question:
          <Input
            placeholder="Question title"
            value={question_title}
            onChange={titleHandle}
          />
        </Label>
        <Label>
          Correct option:
          <Input
            placeholder="Correct option"
            value={correct_option}
            onChange={answerHandle}
          />
        </Label>
        <Label>
          Option 2:
          <Input
            placeholder="Option 2"
            value={option_1}
            onChange={option_1Handle}
          />
        </Label>
        <Label>
          Option 3:
          <Input
            placeholder="Optional"
            value={option_2}
            onChange={option_2Handle}
          />
        </Label>
        <Label>
          Option 4:
          <Input
            placeholder="Optional"
            value={option_3}
            onChange={option_3Handle}
          />
        </Label>
        <Button type="submit">Add question</Button>
      </Form>
    ) : act.act === "EDIT_QUESTION" ? (
      <Form onSubmit={submitHandleUpdate}>
        <Message>Edit question</Message>
        <Close onClick={trigger}>&times;</Close>
        <Label>
          Question:
          <Input
            placeholder="New question title"
            value={question_title}
            onChange={titleHandle}
          />
        </Label>
        <Label>
          Correct option:
          <Input
            placeholder="New correct option"
            value={correct_option}
            onChange={answerHandle}
          />
        </Label>
        <Label>
          Option 2:
          <Input
            placeholder="New option 2"
            value={option_1}
            onChange={option_1Handle}
          />
        </Label>
        <Label>
          Option 3:
          <Input
            placeholder="Optional"
            value={option_2}
            onChange={option_2Handle}
          />
        </Label>
        <Label>
          Option 4:
          <Input
            placeholder="Optional"
            value={option_3}
            onChange={option_3Handle}
          />
        </Label>
        <Label>
          Attached file:
          {act.question.file_url ? (
            act.question.file_url.split(".")[1] === "jpg" ||
            act.question.file_url.split(".")[1] === "jpeg" ||
            act.question.file_url.split(".")[1] === "png" ? (
              <img
                alt="img"
                src={act.question.file_url}
                width="300px"
                height="auto"
              />
            ) : act.question.file_url.split(".")[1] === "mp3" ? (
              <audio controls>
                <source src={act.question.file_url} type="audio/mpeg" />
              </audio>
            ) : (
              <video width="320" height="240" controls>
                <source src={act.question.file_url} type="video/mp4" />
              </video>
            )
          ) : null}
          <Input type="file" name="file_url" onChange={fileHandle} />
        </Label>
        <Button type="submit">Edit question</Button>
      </Form>
    ) : (
      <Form onSubmit={submitHandleMove}>
        <Message>Move question</Message>
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
        <Select
          styles={styles}
          value={topic_option}
          onChange={topicOptionHandle}
          options={topic_options}
          isSearchable={false}
          placeholder="To topic ..."
        />
        <Button type="submit">Move question</Button>
      </Form>
    )
  ) : null;
};

ActQuestion.propTypes = {
  subjects: PropTypes.array.isRequired,
  chapters: PropTypes.array.isRequired,
  topics: PropTypes.array.isRequired,
  current_directory: PropTypes.object.isRequired,
  add_question: PropTypes.func.isRequired,
  update_question: PropTypes.func.isRequired,
  update_question_file: PropTypes.func.isRequired,
  move_question: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  add_question: (details) => dispatch(add_question(details)),
  update_question: (details) => dispatch(update_question(details)),
  update_question_file: (details) => dispatch(update_question_file(details)),
  move_question: (details) => dispatch(move_question(details)),
});

const mapStateToProps = (state) => ({
  subjects: state.data.subjects,
  chapters: state.data.chapters,
  topics: state.data.topics,
  current_directory: state.data.current_directory,
});

export default connect(mapStateToProps, mapDispatchToProps)(ActQuestion);
