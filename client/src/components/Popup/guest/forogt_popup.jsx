import React from "react";
import { LoginToggle, Close2 } from "../styles";
import { NavLink } from "react-router-dom";

const index = (props) => {
  const { open, trigger } = props;

  return open ? (
    <div>
      <LoginToggle>
        <NavLink
          to={{
            pathname: "/register",
            login: true,
            toLogin: true,
          }}
          onClick={trigger}
        >
          <Close2>x</Close2>
        </NavLink>

        <div className="toggle-box-2" style={{ opacity: "1" }}>
          <p className="h-description">
            Your password has been sent to your email.
          </p>
        </div>
      </LoginToggle>
    </div>
  ) : null;
};

export default index;
