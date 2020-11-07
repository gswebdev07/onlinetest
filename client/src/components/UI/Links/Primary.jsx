import React from "react";
// import { Links, StyledLink, NavLink } from "./styles";
// Icons
import faq from "../../../static/icons/png/magnifiying-glass.png";
import qa from "../../../static/icons/png/ques.png";
import resu from "../../../static/icons/png/test (1).png";
import bookmark from "../../../static/icons/png/bookmark-white.png";
// Redux
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { set_content } from "../../../store/actions/content_actions";
import "./Styles.css";

const Primary = (props) => {
  const { content, user, onContentChange } = props;

  const change_handler = (str) => {
    onContentChange(str);
  };

  return (
    <div>
      <ul className="side-nav">
        <li
          className={
            content === "faq" ? "side-nav__item--active" : "side-nav__item"
          }
          onClick={() => change_handler("faq")}
        >
          <a href="#" className="side-nav__link">
            <img alt="icon" src={faq} className="side-nav__icon" />
            <span>FAQ</span>
          </a>
        </li>
        <li
          className={
            content === "qa" ? "side-nav__item--active" : "side-nav__item"
          }
          onClick={() => change_handler("qa")}
        >
          <a href="#" className="side-nav__link">
            <img alt="icon" src={qa} className="side-nav__icon" />
            <span>Q&A</span>
          </a>
        </li>
        <li
          className={
            content === "resu" ? "side-nav__item--active" : "side-nav__item"
          }
          onClick={() => change_handler("resu")}
        >
          <a href="#" className="side-nav__link">
            <img alt="icon" src={resu} className="side-nav__icon" />
            <span>Results</span>
          </a>
        </li>
        {user === "User" ? (
          <li
            className={
              content === "bookmark"
                ? "side-nav__item--active"
                : "side-nav__item"
            }
            onClick={() => change_handler("bookmark")}
          >
            <a href="#" className="side-nav__link">
              <img alt="icon" src={bookmark} className="side-nav__icon" />
              <span>Bookmarks</span>
            </a>
          </li>
        ) : null}
      </ul>
      {/* <Links>
        <StyledLink to="/faq">
          <NavLink>
            <img alt="icon" src={faq} width="1.75rem" height="1.75rem" />
            FAQ
          </NavLink>
        </StyledLink>
        <StyledLink to="/qa">
          <NavLink>
            <img alt="icon" src={qa} width="1.75rem" height="1.75rem" />
            Q&A
          </NavLink>
        </StyledLink>
        <StyledLink to="/results">
          <NavLink>
            <img alt="icon" src={resu} width="1.75rem" height="1.75rem" />
            Results
          </NavLink>
        </StyledLink>
        {user === "User" ? (
          <StyledLink to="/bookmarks">
            <NavLink>
              <img alt="icon" src={bookrmark} width="25px" height="auto" />
              Bookmarks
            </NavLink>
          </StyledLink>
        ) : null}
      </Links> */}
    </div>
  );
};

Primary.propTypes = {
  user: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user.user,
  content: state.content.content,
});

const mapDispatchToProps = (dispatch) => {
  return {
    onContentChange: (str) => dispatch(set_content(str)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Primary);
