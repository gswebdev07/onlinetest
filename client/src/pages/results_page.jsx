import React, { useEffect, useState } from "react";
import { Message } from "../static/common";
// import { colors } from "../static/colors";
// Components

import TestOptionsRes from "../components/Popup/user/test_options_res";
import Close from "../components/UI/Close";
import Result from "../components/Items/Result/index";
import UserResult from "../components/Items/Result/UserResult";
import OverallScore from "../components/UI/PieChart";
// Containers
import Container from "../containers/Container";
// Redux

import { get_results, get_all_results } from "../store/actions/data_actions";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const Results = ({ results }) => {
  const style = {
    width: "100%",
    border: `1px solid #777`,
    fontSize: "1.5rem",
    margin: "20px 10px",
  };

  return (
    <table style={style}>
      <tbody>
        <tr className="main-table-row">
          <td>Email</td>
          <td>Topic</td>
          <td>Scores c/q</td>
        </tr>
        {results.map((result, index) => (
          <Result key={index} result={result} />
        ))}
      </tbody>
    </table>
  );
};
const UserResults = ({ results }) => {
  const [act, setAct] = useState("");
  const [open, setOpen] = useState(false);
  const toggle = (act) => {
    setAct(act);
    setOpen((prevState) => !prevState);
  };

  const style = {
    width: "100%",
    border: `1px solid #777`,
    fontSize: "1.5rem",
    margin: "20px 10px",
  };

  return (
    <div>
      <TestOptionsRes open={open} trigger={toggle} act={act} />
      <Close open={open} trigger={toggle} />
      <table style={style}>
        <tbody>
          <tr className="main-table-row">
            <td>Subject</td>
            <td>Chapter</td>
            <td>Topic</td>

            <td>Scores c/q</td>
            <td>Date</td>
          </tr>
          {results.map((result, index) => (
            <UserResult key={index} result={result} trigger={toggle} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

const results_page = (props) => {
  const { admin, results, get_results, get_all_results } = props;

  useEffect(() => {
    admin === "Admin" ? get_all_results() : get_results();
  }, []);

  return (
    <div>
      <Message></Message>
      <OverallScore results={results} />
      <Container>
        {admin === "Admin" ? (
          <Results results={results} />
        ) : (
          <UserResults results={results} />
        )}
      </Container>
    </div>
  );
};

results_page.propTypes = {
  admin: PropTypes.string.isRequired,
  results: PropTypes.array.isRequired,
  get_results: PropTypes.func.isRequired,
  get_all_results: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  get_results: () => dispatch(get_results()),
  get_all_results: () => dispatch(get_all_results()),
});

const mapStateToProps = (state) => ({
  admin: state.user.user,
  results: state.data.results,
});

export default connect(mapStateToProps, mapDispatchToProps)(results_page);
