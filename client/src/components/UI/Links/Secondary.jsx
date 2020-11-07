import React from "react";

// Icons
import { connect } from "react-redux";
import { set_content } from "../../../store/actions/content_actions";
import mouse from "../../../static/icons/png/user.png";
import clas from "../../../static/icons/png/presentation.png";
import "./Styles.css";

const Secondary = (props) => {
  const { content, onContentChange } = props;
  const change_handler = (str) => {
    onContentChange(str);
  };

  return (
    <ul className="side-nav">
      <li
        className={
          content === "user" ? "side-nav__item--active" : "side-nav__item"
        }
        onClick={() => change_handler("users")}
      >
        <a href="#" className="side-nav__link">
          <img alt="icon" src={mouse} className="side-nav__icon" />
          <span>Users</span>
        </a>
      </li>
      <li
        className={
          content === "class" ? "side-nav__item--active" : "side-nav__item"
        }
        onClick={() => change_handler("class")}
      >
        <a href="#" className="side-nav__link">
          <img alt="icon" src={clas} className="side-nav__icon" />
          <span>Classes</span>
        </a>
      </li>
    </ul>
    // <Links>
    //   <StyledLink to="/users">
    //     <NavLink>
    //       <img alt="icon" src={mouse} width="25px" height="auto" />
    //       Users
    //     </NavLink>
    //   </StyledLink>
    //   <StyledLink to="/classes">
    //     <NavLink>
    //       <img alt="icon" src={clas} width="25px" height="auto" />
    //       Classes
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

export default connect(mapStateToProps, mapDispatchToProps)(Secondary);
