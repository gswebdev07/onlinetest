import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Login from "./login_page";
import Signup from "./register_page";
import "./styles/guestpage.css";
import cross from "../../assets/cross.png";
import crossWhite from "../../assets/cross-white.png";
import logo from "../../assets/logo.png";
import logoWhite from "../../assets/logo-white.png";

const guest_page = (props) => {
  const [toggleSignUp, settoggleSignUp] = useState(null);
  const [toggleLogin, settoggleLogin] = useState(null);
  const [toggleButton1, setToggleButton1] = useState(null);
  const [toggleButton2, setToggleButton2] = useState(null);

  const styletoggle = () => {
    settoggleSignUp(
      toggleSignUp === null
        ? {
            width: "70%",
            opacity: "1",
            transition:
              "width 1.3s cubic-bezier(0.45, -0.53, 0.56, 1.4), opacity 1s 1s",
          }
        : null
    );
    settoggleLogin(
      toggleLogin === null
        ? {
            width: "0%",
            opacity: "0",
            transition:
              "opacity 0.5s ease-out,width 1s cubic-bezier(0.45, -0.53, 0.56, 1.4)",
          }
        : null
    );
    setToggleButton1(
      toggleButton1 === null
        ? {
            opacity: "0",
            transition: "opacity 0.5s ease-out",
          }
        : null
    );
    setToggleButton2(
      toggleButton1 === null
        ? {
            opacity: "1",
            transition:
              "width 1.3s cubic-bezier(0.45, -0.53, 0.56, 1.4), opacity 1s 1s",
          }
        : null
    );
  };

  const result = props.location.login ? (
    <div className="guest-flex">
      <Link to="/" className="logo-home">
        <img src={toggleLogin ? logoWhite : logo} />
      </Link>
      <Link to="/" className="close-page">
        <img src={toggleLogin ? cross : crossWhite} />
      </Link>
      <div className="column-1 " style={toggleLogin}>
        <Login {...props} toggle={styletoggle} />
      </div>
      <div className="column-2">
        <div>
          <div className="toggle-box-1" style={toggleButton1}>
            <h1 className="toggle-heading">New Here?</h1>
            <p className="toggle-description">Sign up and discover a great</p>
            <p className="toggle-description">amount of new opportunities!</p>
          </div>
          <div className="toggle-box-2" style={toggleButton2}>
            <h1 className="toggle-heading">One of Us?</h1>
            <p className="toggle-description">
              If you already have an account,{" "}
            </p>
            <p className="toggle-description">
              just sign in. We've missed you!
            </p>
          </div>
          <button className="toggle-button" onClick={styletoggle}>
            {!toggleLogin ? "Signup" : "Login"}
          </button>
        </div>
      </div>
      <div className="column-3 " style={toggleSignUp}>
        <Signup {...props} />
      </div>
    </div>
  ) : (
    <div className="guest-flex">
      <Link to="/" className="logo-home">
        <img src={toggleLogin ? logoWhite : logo} />
      </Link>
      <Link to="/" className="close-page">
        <img src={toggleLogin ? cross : crossWhite} />
      </Link>
      <div className="column-1 " style={toggleLogin}>
        <Signup {...props} />
      </div>
      <div className="column-2">
        <div>
          <div className="toggle-box-1" style={toggleButton1}>
            <h1 className="toggle-heading">One of Us?</h1>
            <p className="toggle-description">
              If you already have an account,{" "}
            </p>
            <p className="toggle-description">
              just sign in. We've missed you!
            </p>
          </div>
          <div className="toggle-box-2" style={toggleButton2}>
            <h1 className="toggle-heading">New Here?</h1>
            <p className="toggle-description">Sign up and discover a great</p>
            <p className="toggle-description">amount of new opportunities!</p>
          </div>
          <button className="toggle-button" onClick={styletoggle}>
            {toggleLogin ? "Signup" : "Login"}
          </button>
        </div>
      </div>
      <div className="column-3 " style={toggleSignUp}>
        <Login {...props} />
      </div>
    </div>
  );

  return <React.Fragment>{result}</React.Fragment>;
};

export default guest_page;
