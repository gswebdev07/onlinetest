import React from "react";
import { useState, useEffect } from "react";
import { Stick } from "./styles";
// Components
import Profile from "../../components/UI/Profile";
// Links
import Homepage from "../../pages/home_page";
import Primary from "../../components/UI/Links/Primary";
import Secondary from "../../components/UI/Links/Secondary";
import TestAndPractice from "../../components/UI/Links/TestAndPractice";
import Settings from "../../components/UI/Links/Settings";
// Redux
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { get_results } from "../../store/actions/data_actions";
import { set_content } from "../../store/actions/content_actions";

import Navbar from "../../components/UI/Navbar/index";
import "./styles.css";
import FAQ from "../../pages/faq_page";
import QA from "../../pages/qa_page";
import Results from "../../pages/results_page";
import Users from "../../pages/users_page";
import Classes from "../../pages/classes_page";
import Set from "../../pages/settings_page";
import Bookmarks from "../../pages/bookmarks_page";
import UserSubjects from "../../pages/user/subjects_page";
import Practice from "../../pages/user/subjects_page";
import Subjects from "../../pages/subjects_page";
import Chapters from "../../pages/chapters_page";
import UserChapters from "../../pages/user/chapters_page";
import UserTopics from "../../pages/user/topics_page";
import Topics from "../../pages/topics_page";
import Questions from "../../pages/questions_page";
import TestPage from "../../pages/user/test_page";
import PracticePage from "../../pages/user/practice_page";
import BookmarkTestPage from "../../pages/user/bookmark_test_page";
import ImprovementTestPage from "../../pages/user/improvement_page";

const index = (props) => {
  const { user, content, get_results, results, onContentChange } = props;
  const [div, setDiv] = useState(null);

  useEffect(() => {
    if (user.user === "User") {
      get_results();
    }
    switch (content) {
      case "faq":
        setDiv(<FAQ />);
        break;
      case "qa":
        setDiv(<QA />);
        break;
      case "resu":
        setDiv(<Results />);
        break;
      case "users":
        setDiv(<Users />);
        break;
      case "class":
        setDiv(<Classes />);
        break;
      case "settings":
        setDiv(<Set />);
        break;
      case "bookmark":
        setDiv(<Bookmarks />);
        break;
      case "test":
        setDiv(<UserSubjects />);
        break;
      case "practice":
        setDiv(<Practice />);
        break;
      case "subjects":
        setDiv(<Subjects />);
        break;
      case "chap":
        setDiv(<Chapters />);
        break;
      case "userchap":
        setDiv(<UserChapters />);
        break;
      case "topic":
        setDiv(<Topics />);
        break;
      case "usertopic":
        setDiv(<UserTopics />);
        break;
      case "questions":
        setDiv(<Questions />);
        break;
      case "test_page":
        setDiv(<TestPage />);
        break;
      case "practice_page":
        setDiv(<PracticePage />);
        break;
      case "bookmark_test":
        setDiv(<BookmarkTestPage />);
        break;
      case "improvement_test":
        setDiv(<ImprovementTestPage />);
        break;
    }
  }, [content, user.user]);

  useEffect(() => {
    if (user.user === "User") {
      get_results();
    }
    if (user.user_credentials.class === "Admin") {
      onContentChange("class");
    } else {
      onContentChange(results.length === 0 ? "test" : "resu");
    }
  }, [results.length, user.user]);

  return user.user === "Guest" ? (
    <Homepage />
  ) : user.user === "Admin" ? (
    // <React.Fragment>
    //
    // </React.Fragment>
    <React.Fragment>
      <div className="menu-wrapper">
        <div className="menu-container">
          <Navbar />
          <div className="content-wrapper">
            <div className="sidebar">
              <div className="nav-link-wrapper">
                <Profile />
                <Stick />
                <Primary />
                <Stick />
                <Secondary />
                <Stick />
                <Settings />
              </div>

              <div className="legal">
                &copy; 2020 by Testpencil. All rights reserved.
              </div>
            </div>
            <div className="content-content">{div}</div>
          </div>
        </div>
      </div>
    </React.Fragment>
  ) : (
    <div className="menu-wrapper">
      <div className="menu-container">
        <Navbar />
        <div className="content-wrapper">
          <div className="sidebar">
            <Profile />
            <Stick />
            <TestAndPractice />
            <Stick />
            <Primary />
            <Stick />
            <Settings />
            <div className="legal">
              &copy; 2020 by Testpencil. All rights reserved.
            </div>
          </div>
          <div className="content-content">{div}</div>
        </div>
      </div>
    </div>
  );
};

index.propTypes = {
  user: PropTypes.object.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  get_results: () => dispatch(get_results()),
  onContentChange: (str) => dispatch(set_content(str)),
});

const mapStateToProps = (state) => ({
  user: state.user,
  content: state.content.content,
  results: state.data.results,
});

export default connect(mapStateToProps, mapDispatchToProps)(index);
