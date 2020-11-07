import React, { useState, useEffect } from "react";
import { StyledLink, Message } from "../../../static/common";
import {
  PracticeContainer,
  TopicName,
  Question,
  Polygon,
  Bookmark,
  Option,
  Ball,
  Result,
  Buttons,
  TriggerBtn,
  TopicNameAndNumber,
} from "./styles";
// Icons
import icon from "../../../static/icons/png/015-test-1.png";
import { set_content } from "../../../store/actions/content_actions";

// Redux
import { add_bookmark } from "../../../store/actions/user_actions";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const Answers = ({ correct_option, answers, pick, pickHandle }) => {
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

  console.log(pick);
  if (pick === "") {
    return answers.map((o, index) =>
      o === "" ? null : (
        <Option key={index} onClick={() => pickHandle(o)}>
          <Ball />
          {o}
        </Option>
      )
    );
  } else {
    return answers.map((o, index) =>
      o === "" ? null : o === correct_option ? (
        <Option key={index} color="#4786e5">
          <Ball color="#4786e5" />
          {o}
        </Option>
      ) : o === pick ? (
        <Option key={index} color="red">
          <Ball color="red" />
          {o}
        </Option>
      ) : (
        <Option key={index}>
          <Ball />
          {o}
        </Option>
      )
    );
  }
  // return <div>Answers...</div>;
};

const index = (props) => {
  const {
    topic_name,
    questions,
    current_directory,
    add_bookmark,
    bookmarks,
  } = props;

  // States
  const [number, setNumber] = useState(0);
  const [pick, setPick] = useState("");
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

  let book = false;

  bookmarks.map((el) => {
    if (el.question.created_at === questions[number].created_at) {
      book = true;
    }
  });

  // Handles
  const increment = () => {
    if (number < questions.length - 1) {
      setNumber((prevState) => prevState + 1);
      setPick("");
    }
  };
  const decrement = () => {
    if (number > 0) {
      setNumber((prevState) => prevState - 1);
      setPick("");
    }
  };
  const pickHandle = (option) => setPick(option);

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
  // Submits

  const current_question = questions[number];
  const add_bookmarkFunc = () => {
    const question = {
      topic_id: current_directory.topic_id,
      topic_name: current_directory.topic_name,
      question_title: current_question.question_title,
      question: current_question,
    };
    add_bookmark({ bookmark: question });
  };

  return current_question !== undefined ? (
    <PracticeContainer>
      <TopicNameAndNumber>
        <TopicName style={{ margin: "0 auto" }}>
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
      </TopicNameAndNumber>

      {/* Question */}
      <Question>Question: {current_question.question_title}</Question>
      <Polygon>
        <Bookmark onClick={add_bookmarkFunc} color={book ? "#4786e5" : null} />
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
              <source
                src={current_question.file_url}
                type="audio/mpeg"
                style={{
                  margin: "20px",
                  borderRadius: "15px",
                  boxShadow: "0 1.5rem 4rem rgba(0,0,0,.15)",
                }}
              />
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
          correct_option={current_question.correct_option}
          answers={shuffled}
          pick={pick}
          pickHandle={pickHandle}
        />
      </Polygon>

      <Buttons>
        {number === 0 ? null : (
          <TriggerBtn onClick={decrement}>Previous</TriggerBtn>
        )}

        {number === questions.length - 1 ? (
          <StyledLink
            to={"/"}
            onClick={() => props.onContentChange("practice")}
          >
            <TriggerBtn>Finish</TriggerBtn>
          </StyledLink>
        ) : (
          <TriggerBtn onClick={increment}>Next</TriggerBtn>
        )}
      </Buttons>
    </PracticeContainer>
  ) : (
    <Message>Sorry, but topic has no questions yet.</Message>
  );
};

index.propTypes = {
  current_directory: PropTypes.object.isRequired,
  add_bookmark: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  add_bookmark: (question) => dispatch(add_bookmark(question)),
  onContentChange: (str) => dispatch(set_content(str)),
});

const mapStateToProps = (state) => ({
  current_directory: state.data.current_directory,
  bookmarks: state.user.user_credentials.bookmarks,
});

export default connect(mapStateToProps, mapDispatchToProps)(index);
