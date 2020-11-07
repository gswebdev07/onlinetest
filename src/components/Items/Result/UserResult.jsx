import React from "react";
import { Result } from "./styles";

import { set_directory } from "../../../store/actions/data_actions";
import { connect } from "react-redux";

const index = (props) => {
  const { result, trigger, set_directory, class_name } = props;

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const {
    date,
    topic_name,
    topic_id,
    chapter_name,
    subject_name,
    amount_of_corrects,
    amount_of_questions,
    content,
  } = result;
  const set_directoryFunc = () =>
    set_directory({
      class_name,
      subject_name,
      chapter_name,
      content,
      topic_name,
      topic_id,
    });

  const d = new Date(date);

  const dated = d.getDate();
  const month = monthNames[d.getMonth()]; // Since getMonth() returns month from 0-11 not 1-12
  const year = d.getFullYear();

  const dateStr = month + " " + dated + ", " + year;
  return (
    <Result
      onClick={() => {
        set_directoryFunc();
        trigger();
      }}
    >
      <td>{subject_name}</td>
      <td>{chapter_name}</td>

      <td>{topic_name}</td>
      <td>
        {amount_of_corrects}/{amount_of_questions}
      </td>
      <td>{dateStr}</td>
    </Result>
  );
};
const mapDispatchToProps = (dispatch) => ({
  set_directory: (directory) => dispatch(set_directory(directory)),
});
const mapStateToProps = (state) => ({
  class_name: state.user.user_credentials.class,
});

export default connect(mapStateToProps, mapDispatchToProps)(index);
