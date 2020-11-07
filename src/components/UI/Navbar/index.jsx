import React, { useState, useEffect } from "react";
// import { Navbar, StyledLink, LogoutBtn } from "./styles";
// Icons
import logout from "../../../static/icons/buttons/logout.png";
// Redux
import { log_out } from "../../../store/actions/user_actions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { set_content } from "../../../store/actions/content_actions";
import "./styles";
import "./styles.css";
import Logo from "../../../assets/logo-blue.png";
import { Link } from "react-router-dom";

const index = (props) => {
  const { authenticated, log_out, content, onContentChange } = props;
  const [heading, setHeading] = useState("Testpencil");

  useEffect(() => {
    switch (content) {
      case "faq":
        setHeading("Frequently Asked Questions");
        break;
      case "qa":
        setHeading("Q & A");
        break;
      case "resu":
        setHeading("Results");
        break;
      case "users":
        setHeading("Users");
        break;
      case "class":
        setHeading("Classes");
        break;
      case "settings":
        setHeading("Settings");
        break;
      case "bookmark":
        setHeading("Bookmarks");
        break;
      case "test":
        setHeading("Take a test");
        break;
      case "practice":
        setHeading("Take a practice");
        break;
      case "subjects":
        setHeading("Subjects");
        break;
      case "chap":
        setHeading("Chapters");
        break;
      case "userchap":
        setHeading("Chapters");
        break;
      case "topic":
        setHeading("Topics");
        break;
      case "usertopic":
        setHeading("Topics");
        break;
      case "questions":
        setHeading("Questions");
        break;
      case "test_page":
        setHeading("Test");
        break;
      case "practice_page":
        setHeading("Practice");
        break;
      case "bookmark_test":
        setHeading("Bookmarked Tests");
        break;
      case "improvement_test":
        setHeading("Imporovement Test");
        break;
      default:
        setHeading("TestPencil");
    }
  }, [content]);

  const log_outFunc = () => log_out();
  return (
    <nav className="navbar-member">
      <div className="navbar-left">
        <Link
          className="logo-member"
          to="/"
          onClick={() => onContentChange("")}
        >
          <img src={Logo} className="" alt="logo" />
        </Link>
      </div>
      <div className="navbar-right">
        <p className="nav-heading">{heading}</p>
        <button className="logout-button" onClick={log_outFunc}>
          Logout
          <img alt="Exit" src={logout} width="25px" height="auto" />
        </button>
      </div>
    </nav>
  );
};

index.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  log_out: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  log_out: () => dispatch(log_out()),
  onContentChange: (str) => dispatch(set_content(str)),
});

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
  content: state.content.content,
});

export default connect(mapStateToProps, mapDispatchToProps)(index);
