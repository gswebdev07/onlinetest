import React from "react";
import { Links, StyledLink, NavLink } from "./styles";
// Icons
import test from "../../../static/icons/png/notepad.png";
import practice from "../../../static/icons/png/sketch.png";
// Redux
import { set_method } from "../../../store/actions/user_actions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { set_content } from "../../../store/actions/content_actions";
const TestAndPractice = (props) => {
  const { set_method, onContentChange, content } = props;
  const change_handler = (str) => {
    onContentChange(str);
  };
  return (
    <div>
      <ul className="side-nav">
        <li
          className={
            content === "test" ? "side-nav__item--active" : "side-nav__item"
          }
          onClick={() => {change_handler("test");set_method("TEST");}}
        >
          <a href="#" className="side-nav__link">
            <img alt="icon" src={test} className="side-nav__icon" />
            <span>Take a test</span>
          </a>
        </li>
        <li
          className={
            content === "practice" ? "side-nav__item--active" : "side-nav__item"
          }
          onClick={() => {
            change_handler("practice");
            set_method("PRACTICE");
          }}
        >
          <a href="#" className="side-nav__link">
            <img alt="icon" src={practice} className="side-nav__icon" />
            <span>Practice</span>
          </a>
        </li>
      </ul>
    </div>
    // <Links>
    //   <StyledLink to="/user_subjects" onClick={() => set_method("TEST")}>
    //     <NavLink>
    //       <img alt="icon" src={test} width="25px" height="auto" />
    //       Take a test
    //     </NavLink>
    //   </StyledLink>
    //   <StyledLink to="/user_subjects" onClick={() => set_method("PRACTICE")}>
    //     <NavLink>
    //       <img alt="icon" src={practice} width="25px" height="auto" />
    //       Take a practice
    //     </NavLink>
    //   </StyledLink>
    // </Links>
  );
};

TestAndPractice.propTypes = {
  set_method: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  set_method: (method) => dispatch(set_method(method)),
  onContentChange: (str) => dispatch(set_content(str)),
});
const mapStateToProps = (state) => ({
  content: state.content.content,
});

export default connect(mapStateToProps, mapDispatchToProps)(TestAndPractice);
