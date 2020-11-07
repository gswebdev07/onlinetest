import React, { useState } from "react";
// import { Message, Form, SubForm, FormBtn } from "../../static/common";
// // Components
// import Input from "../../components/UI/Input";
// // Icons
// import login from "../../static/icons/form/login.png";
// Redux
import { forgot_password } from "../../store/actions/user_actions";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import ForgotPopup from "../../components/Popup/guest/forogt_popup";
import Close from "../../components/UI/Close";
import { NavLink } from "react-router-dom";

const forgot_password_page = (props) => {
  const { forgot_password } = props;

  // States
  const [email, setEmail] = useState("");
  const [open, setOpen] = useState(false);
  // Handles
  const emailHandle = (e) => setEmail(e.target.value);

  // Submits
  const submitHandle = (e) => {
    e.preventDefault();
    if (email !== "") {
      forgot_password({ email }).then(() => setOpen(true));
    }
  };

  return (
    <div className="forgot-wrapper">
      <ForgotPopup
        open={open}
        trigger={() => {
          setOpen(false);
        }}
      />

      <NavLink
        to={{
          pathname: "/register",
          login: true,
          toLogin: true,
        }}
      >
        <Close
          open={open}
          trigger={() => {
            setOpen(false);
          }}
        />
      </NavLink>
      <div>
        <h1 className="login-heading">Forgot your password?</h1>
        <p className="h-description">Lets get into your account.</p>
        <form onSubmit={submitHandle} className="login-form">
          <div className="input-wrapper">
            <input
              className="input"
              name="email"
              type="text"
              placeholder="Registerd email address"
              value={email}
              onChange={emailHandle}
            />
          </div>
          <button className="form-button" type="submit">
            Submit
          </button>
        </form>
      </div>

      {/* <Message>Forgot password?</Message>
      <Form onSubmit={submitHandle}>
        <SubForm>
          <Input
            icon={login}
            name="email"
            type="text"
            placeholder="Registerd email address"
            value={email}
            onChange={emailHandle}
          />
          <FormBtn type="submit">Submit</FormBtn>
        </SubForm>
      </Form> */}
    </div>
  );
};

forgot_password_page.propTypes = {
  forgot_password: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  forgot_password: (email) => dispatch(forgot_password(email)),
});

const mapStateToProps = (state) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(forgot_password_page);
