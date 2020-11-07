import React from "react";
import { NavigationLinks, NavigationLink } from "./styles";
import { connect } from "react-redux";
import { set_content } from "../../../store/actions/content_actions";

const index = (props) => {
  const { links, onContentChange } = props;

  const change_handler = (str) => {
    onContentChange(str);
  };
  return (
    <NavigationLinks>
      {links.map((link, index) => (
        <NavigationLink key={index} onClick={() => change_handler(link.dir)}>
          {link.name.length > 20 ? link.name.slice(0, 19) + "..." : link.name}{" "}
          &gt;
        </NavigationLink>
      ))}
    </NavigationLinks>
  );
};

const mapDispatchToProps = (dispatch) => ({
  onContentChange: (str) => dispatch(set_content(str)),
});

export default connect(null, mapDispatchToProps)(index);
