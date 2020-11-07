import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// Containers
import MainContainer from "../../containers/MainContainer";
// import MenuAndWindow from "../../containers/MenuAndWindow";
// import PageContainer from "../../containers/PageContainer";
// Components
// import Navbar from "../UI/Navbar";
// import Spinner from "../UI/Spinner";
import UserLoading from "../UI/Spinner/user_loading";
// Compositions
import Menu from "../../compositions/Menu";
// Pages
import guest_page from "../../pages/guest/guest_page";
// import faq_page from "../../pages/faq_page";
// import qa_page from "../../pages/qa_page";
// import results_page from "../../pages/results_page";
// import bookmarks_page from "../../pages/bookmarks_page";
// import users_page from "../../pages/users_page";
// import classes_page from "../../pages/classes_page";
// import subjects_page from "../../pages/subjects_page";
// import chapters_page from "../../pages/chapters_page";
// import topics_page from "../../pages/topics_page";
// import settings_page from "../../pages/settings_page";
// import questions_page from "../../pages/questions_page";
// Pages (Guest)
// import register_page from "../../pages/guest/register_page";
// import login_page from "../../pages/guest/login_page";
// import forgot_password_page from "../../pages/guest/forgot_password_page";
// Pages (User)
// import user_subjects_page from "../../pages/user/subjects_page";
// import user_chapters_page from "../../pages/user/chapters_page";
// import user_topics_page from "../../pages/user/topics_page";
// import test_page from "../../pages/user/test_page";
// import bookmark_test_page from "../../pages/user/bookmark_test_page";
// import improvement_test_page from "../../pages/user/improvement_page";
// import practice_page from "../../pages/user/practice_page";
// Redux
import axios from "axios";
import { get_user } from "../../store/actions/user_actions";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const index = (props) => {
  const { get_user, user_loading } = props;

  // Checking for user authentication
  const token = localStorage.Token;
  if (token) {
    axios.defaults.headers.common["Authorization"] = token;
    get_user();
  }

  return (
    <MainContainer>
      <Router>
        <Switch>
          {/* Guest */}
          <Route exact path="/register" component={guest_page} />
          {/* 
          <Route
            exact
            path="/forgot_password"
            component={forgot_password_page}
          /> */}
          {/* User */}
          {/* <Route exact path="/user_subjects" component={user_subjects_page} />
          <Route exact path="/user_chapters" component={user_chapters_page} />
          <Route exact path="/user_topics" component={user_topics_page} />
          <Route exact path="/test" component={test_page} />
          <Route exact path="/bookmark_test" component={bookmark_test_page} /> */}
          {/* <Route
            exact
            path="/improvement_test"
            component={improvement_test_page} */}
          {/* /> */}
          {/* <Route exact path="/practice" component={practice_page} />
          <Route exact path="/bookmarks" component={bookmarks_page} /> */}
          {/* Admin */}
          <Route exact path="/" component={Menu} />
          {/* <Route exact path="/faq" component={faq_page} />
          <Route exact path="/qa" component={qa_page} />
          <Route exact path="/results" component={results_page} />
          <Route exact path="/users" component={users_page} />
          <Route exact path="/classes" component={classes_page} />
          <Route exact path="/subjects" component={subjects_page} />
          <Route exact path="/chapters" component={chapters_page} />
          <Route exact path="/topics" component={topics_page} />
          <Route exact path="/questions" component={questions_page} />
          {/* Common */}
          {/* <Route exact path="/settings" component={settings_page} /> */}
        </Switch>
        <UserLoading />
      </Router>
    </MainContainer>
  );
};

index.propTypes = {
  get_user: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  get_user: () => dispatch(get_user()),
});
const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(index);
