import React from "react";
import { Message } from "../../../static/common";
import { LoginToggle, Close2 } from "../styles";

const index = (props) => {
  const { open, trigger, toggle } = props;

  return open ? (
    <div>
      <LoginToggle>
        <Close2 onClick={trigger}>x</Close2>
        <div className="toggle-box-2" style={{ opacity: "1" }}>
          <h1 className="login-heading">New here?</h1>
          <p className="h-description">Email address not found.</p>
          <p className="h-description">Signup to create new account.</p>
        </div>
        <button className="form-button" onClick={toggle}>
          Signup
        </button>
      </LoginToggle>
    </div>
  ) : null;
};

export default index;
