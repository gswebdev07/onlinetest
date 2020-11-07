import React from "react";

// Icons
import { connect } from "react-redux";
import { set_content } from "../../../store/actions/content_actions";
import set from "../../../static/icons/png/settings.png";
import "./Styles.css";

const Third = (props) => {
  const { content, onContentChange } = props;
  const change_handler = (str) => {
    onContentChange(str);
  };
  return (
    <ul className="side-nav">
      <li
        className={
          content === "settings" ? "side-nav__item--active" : "side-nav__item"
        }
        onClick={() => change_handler("settings")}
      >
        <a href="#" className="side-nav__link">
          <img alt="icon" src={set} className="side-nav__icon" />
          <span>Settings</span>
        </a>
      </li>
    </ul>
    // <Links>
    //   <StyledLink to="/settings">
    //     <NavLink>
    //       <img alt="icon" src={set} width="25px" height="auto" />
    //       Settings
    //     </NavLink>
    //   </StyledLink>
    // </Links>
  );
};
const mapStateToProps = (state) => ({
  content: state.content.content,
});
const mapDispatchToProps = (dispatch) => {
  return {
    onContentChange: (str) => dispatch(set_content(str)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Third);
