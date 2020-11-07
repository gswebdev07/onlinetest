import React, { useState, useEffect } from "react";
// import {
//   StyledLink,
//   Form,
//   SubForm,
//   FormBtn,
//   Message,
// } from "../../static/common";
// Components
// import Input from "../../components/UI/Input";
// import { NavLink } from "react-router-dom";
// Redux
import Forgot from "./forgot_password_page";
import { sign_in } from "../../store/actions/user_actions";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import LoginPopup from "../../components/Popup/guest/login_popup";
import Close from "../../components/UI/Close";
import "./styles/login.css";
import gpluslogo from "../../assets/icons/gpluslogo.png";
import fblogo from "../../assets/icons/fblogo.png";
import inlogo from "../../assets/icons/inlogo.png";

const register_page = (props) => {
  const { sign_in, error, authenticated, toggle } = props;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [forget, setForget] = useState(null);
  const [wrong, setWrong] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (props.location.toLogin) {
      setForget(false);
    }
  }, [props.location.toLogin]);

  useEffect(() => {
    const str = JSON.stringify(error);
    console.log(str);
    if (str.includes("401")) {
      setOpen(true);
    }
    if (str.includes("404")) {
      setWrong("Incorrect password");
    }
  }, [error]);
  useEffect(() => {
    setOpen(false);
  }, []);

  useEffect(() => {
    if (authenticated) props.history.push("/");
  }, [authenticated]);
  const emailHandle = (e) => setEmail(e.target.value);
  const passwordHandle = (e) => setPassword(e.target.value);

  const submitHandle = (e) => {
    e.preventDefault();
    if (email !== "" && password !== "") {
      sign_in({ email, password })
        .then((res) => {
          setEmail("");
          setPassword("");
        })
        .catch((err) => console.log(err));
    }
  };

  const page = forget ? (
    <Forgot {...props} />
  ) : (
    <div className="login-wrapper">
      <LoginPopup
        toggle={() => {
          toggle(), setOpen(false);
        }}
        open={open}
        trigger={() => setOpen(false)}
      />
      <Close open={open} trigger={() => setOpen(false)} />

      <h1 className="login-heading">Login to Your Account</h1>
      <p className="h-description">Login using social network</p>
      <div className="social">
        <a href="#">
          <img className="social-link" src={fblogo} alt="socilalink" />
        </a>
        <a href="#">
          <img className="social-link" src={gpluslogo} alt="socilalink" />
        </a>
        <a href="#">
          <img className="social-link" src={inlogo} alt="socilalink" />
        </a>
      </div>

      <form onSubmit={submitHandle} className="login-form">
        <div className="linebreak">
          <div className="line"></div>
          <p>OR</p>
          <div className="line"></div>
        </div>
        <div className="input-wrapper">
          <input
            className="input"
            name="email"
            type="text"
            placeholder="Email"
            value={email}
            onChange={emailHandle}
          />
          <input
            className="input"
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={passwordHandle}
          />
        </div>
        <button className="form-button" type="submit">
          Sign In
        </button>
      </form>
      <button className="forgotLink" onClick={() => setForget("true")}>
        Forgot password
      </button>
      <p
        className="incorrect"
        style={
          wrong
            ? { opacity: "1", paddingTop: "10px", fontSize: "13px" }
            : { marginBottom: "0" }
        }
      >
        {wrong}
      </p>
    </div>
  );

  return (
    <div className="flex-login">
      {page}

      {/* <Message>Login</Message>
      <Form className="login-form" onSubmit={submitHandle}>
        <SubForm>
          <Input
            name="email"
            type="text"
            placeholder="Email"
            value={email}
            onChange={emailHandle}
          />
          <Input
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={passwordHandle}
          />
          <FormBtn type="submit">Sign in</FormBtn>
          <StyledLink to="forgot_password">Forgot password</StyledLink>
        </SubForm>
      </Form> */}
    </div>
  );
};

register_page.propTypes = {
  sign_in: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  sign_in: (user_credentials) => dispatch(sign_in(user_credentials)),
});

const mapStateToProps = (state) => ({
  error: state.user.error,
  authenticated: state.user.authenticated,
});

export default connect(mapStateToProps, mapDispatchToProps)(register_page);
