import React from "react";
import { Message3 } from "../../../static/common";
import { Form, PLink2, Close } from "../styles";
// Redux

const bookmark_popup = (props) => {
  const { trigger, open, book } = props;

  return open ? (
    <Form>
      <Message3>Question</Message3>
      <p className="bookmark-pop-heading">{book.question_title}</p>
      <Close onClick={trigger}>&times;</Close>
      {book.question.file_url ? (
        book.question.file_url.split(".")[1] === "jpg" ||
        book.question.file_url.split(".")[1] === "jpeg" ||
        book.question.file_url.split(".")[1] === "png" ? (
          <img
            alt="img"
            src={book.question.file_url}
            width="200px"
            height="auto"
            style={{
              margin: "0 auto 20px auto",
              borderRadius: "15px",
              boxShadow: "0 1.5rem 4rem rgba(0,0,0,.15)",
            }}
          />
        ) : book.question.file_url.split(".")[1] === "mp3" ? (
          <audio controls>
            <source
              src={book.question.file_url}
              type="audio/mpeg"
              style={{
                margin: "0 auto 20px auto",
                borderRadius: "15px",
                boxShadow: "0 1.5rem 4rem rgba(0,0,0,.15)",
              }}
            />
          </audio>
        ) : (
          <video
            width="240"
            height="180"
            controls
            style={{
              margin: "0 auto 20px auto",
              borderRadius: "15px",
              boxShadow: "0 1.5rem 4rem rgba(0,0,0,.15)",
            }}
          >
            <source src={book.question.file_url} type="video/mp4" />
          </video>
        )
      ) : null}
      <div className="subject-link">
        <PLink2 style={{ cursor: "context-menu" }}>
          {book.question.correct_option}
        </PLink2>
      </div>
      <div
        className="subject-link"
        onClick={() => {
          change_handler("bookmark_test");
        }}
      ></div>
    </Form>
  ) : null;
};

export default bookmark_popup;
