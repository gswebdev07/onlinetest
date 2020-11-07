import React, { useState, useEffect } from "react";
import {
  TestContainer,
  TimerAndTopicName,
  TopicName,
  Question,
  Polygon,
  Option,
  Ball,
  Buttons,
  TriggerBtn,
} from "./styles";

// Icons
import icon from "../../../static/icons/png/015-test-1.png";

import Timer from "../Timer";

// Redux
import {
  pass_question,
  send_results,
  clean_tests,
} from "../../../store/actions/test_actions";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const Answers = ({ answers, pick, pickHandle, number }) => {
  // const shuffle = (a) => {
  //   const b = a;
  //   const c = [];
  //   for (let i = 0; i < a.length; i++) {
  //     for (let j = b.length - 1; j >= 0; j--) {
  //       const rand = Math.floor(Math.random() * j);
  //       c.push(b[rand]);
  //       b.splice(rand, 1);
  //     }
  //   }
  //   return c;
  // };
  return answers.map((o, index) => {
    return o === "" ? null : o === pick ? (
      <Option key={index} onClick={() => pickHandle(o)}>
        <Ball color="blue" />
        {o}
      </Option>
    ) : (
      <Option key={index} onClick={() => pickHandle(o)}>
        <Ball />
        {o}
      </Option>
    );
  });
};
const date = new Date();
const index = (props) => {
  const {
    test,
    time,
    setTime,
    topic_id,
    questions,
    topic_name,
    chapter_name,
    subject_name,
    clean_tests,
    send_results,
    pass_question,
    to_results_page,
    user_credentials,
  } = props;

  // States
  const [number, setNumber] = useState(0);
  const [pick, setPick] = useState("");
  const [finish, setFinish] = useState(false);

  const [shuffled, setShuffled] = useState([]);
  useEffect(() => {
    setShuffled(
      shuffle([
        current_question.correct_option,
        current_question.option_1,
        current_question.option_2,
        current_question.option_3,
      ])
    );
  }, [number]);

  // Tracker
  const current_question =
    number < questions.length ? questions[number] : questions[number - 1];

  const shuffle = (a) => {
    const b = a;
    const c = [];
    for (let i = 0; i < a.length; i++) {
      for (let j = b.length - 1; j >= 0; j--) {
        const rand = Math.floor(Math.random() * j);
        c.push(b[rand]);
        b.splice(rand, 1);
      }
    }
    return c;
  };

  let answers = questions.some((q) => q.picked_option)
    ? [current_question.correct_option, current_question.picked_option]
    : shuffled;

  // Handles
  const decrement = () => {
    if (number > 0) {
      setNumber((prevState) => prevState - 1);
      setPick("");
    }
  };

  const increment = () => {
    const question = {
      question_title: current_question.question_title,
      picked_option: pick,
      correct_option: current_question.correct_option,
    };
    pass_question(question).then(() => {
      if (number === questions.length - 1) {
        setPick("");
        submitHandle();
      }
    });
    if (number < questions.length) {
      setNumber((prevState) => prevState + 1);
      setPick("");
    }
  };
  const pickHandle = (option) => setPick(option);

  // Submits
  const result = {
    topic_id,
    topic_name,
    chapter_name,
    subject_name,
    date,
    user_id: user_credentials._id,
    user_email: user_credentials.email,
    results: test,
    amount_of_questions: questions.length,
    content: questions,
  };
  const submitHandle = () => {
    send_results(result);
    clean_tests();
    to_results_page();
  };

  useEffect(() => {
    if (finish) {
      submitHandle();
    }

    console.log("Test Component render: ", finish);
  }, [finish]);

  return (
    <TestContainer>
      <TimerAndTopicName>
        <Timer time={time} finish={finish} setFinish={setFinish} />
        <TopicName>
          Q{questions.indexOf(current_question) + 1}/{questions.length}
        </TopicName>
        <TopicName>
          <img
            alt="icon"
            src={icon}
            width="25px"
            height="auto"
            style={{ marginRight: "10px" }}
          />
          {topic_name}
        </TopicName>
      </TimerAndTopicName>

      {/* Question */}
      <Question>Question: {current_question.question_title}</Question>

      <Polygon>
        {current_question.file_url ? (
          current_question.file_url.split(".")[1] === "jpg" ||
          current_question.file_url.split(".")[1] === "jpeg" ||
          current_question.file_url.split(".")[1] === "png" ? (
            <img
              alt="img"
              src={current_question.file_url}
              width="250px"
              height="auto"
              style={{
                margin: "20px",
                borderRadius: "15px",
                boxShadow: "0 1.5rem 4rem rgba(0,0,0,.15)",
              }}
            />
          ) : current_question.file_url.split(".")[1] === "mp3" ? (
            <audio controls>
              <source src={current_question.file_url} type="audio/mpeg" />
            </audio>
          ) : (
            <video
              width="320"
              height="240"
              controls
              style={{
                margin: "20px",
                borderRadius: "15px",
                boxShadow: "0 1.5rem 4rem rgba(0,0,0,.15)",
              }}
            >
              <source src={current_question.file_url} type="video/mp4" />
            </video>
          )
        ) : null}
        <Answers
          answers={answers}
          pick={pick}
          pickHandle={pickHandle}
          number={number}
        />
      </Polygon>

      <Buttons>
        {number === 0 ? null : (
          <TriggerBtn onClick={decrement}>Previous</TriggerBtn>
        )}
        <TriggerBtn onClick={increment}>
          {number === questions.length - 1 ? "Finish" : "Next"}
        </TriggerBtn>
      </Buttons>
    </TestContainer>
  );
};

index.propTypes = {
  user_credentials: PropTypes.object.isRequired,
  test: PropTypes.array.isRequired,
  pass_question: PropTypes.func.isRequired,
  send_results: PropTypes.func.isRequired,
  clean_tests: PropTypes.func.isRequired,
};

export const mapDispatchToProps = (dispatch) => ({
  pass_question: (question) => dispatch(pass_question(question)),
  send_results: (result) => dispatch(send_results(result)),
  clean_tests: () => dispatch(clean_tests()),
});

export const mapStateToProps = (state) => ({
  user_credentials: state.user.user_credentials,
  test: state.test.test,
});

export default connect(mapStateToProps, mapDispatchToProps)(index);
