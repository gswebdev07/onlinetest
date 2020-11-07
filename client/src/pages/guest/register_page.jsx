import React, { useEffect, useState } from "react";
import Select from "react-select";
// import { Message, Form, SubForm, FormBtn, Button } from "../../static/common";
// // Components
// import Input from "../../components/UI/Input";
// // Icons
// import id from "../../static/icons/form/id.png";
// import login from "../../static/icons/form/login.png";
// import lock from "../../static/icons/form/lock.png";
// import phone from "../../static/icons/form/phone.png";
// Redux
import { get_classes_only } from "../../store/actions/data_actions";
import { sign_up } from "../../store/actions/user_actions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "./styles/login.css";
import gpluslogo from "../../assets/icons/gpluslogo.png";
import fblogo from "../../assets/icons/fblogo.png";
import inlogo from "../../assets/icons/inlogo.png";
import data from "../../static/states.json";

const register_page = (props) => {
  const { classes, get_classes_only, sign_up, sc } = props;

  // States
  const [full_name, setFull_name] = useState("");
  const [email, setEmail] = useState("");
  const [mobile_number, setMobile_number] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirm_password] = useState("");
  const [age, setAge] = useState("");
  const [state, setState] = useState(null);
  const [city, setCity] = useState(null);
  const [gender, setGender] = useState(null);

  const [classes_option, setClasses_option] = useState(null);
  const [code, setCode] = useState("");
  const [districtOptions, setDistrictOptions] = useState([]);
  // Select options
  const genders = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
  ];
  const classes_options = classes.map((c) => ({
    label: c.class_name,
    value: c.class_name,
  }));

  const states_options = data.states.map((el) => ({
    label: el.state,
    value: el.state,
  }));

  // Handles
  // "I know, I could use class based component here, and just switch between names,
  // but I prefer function based components. Don't just me. I built this app from scratch."
  // (Dany - parent developer)
  const full_nameHandle = (e) => setFull_name(e.target.value);
  const emailHandle = (e) => setEmail(e.target.value);
  const mobile_numberHandle = (e) => setMobile_number(e.target.value);
  const passwordHandle = (e) => setPassword(e.target.value);
  const confirm_passwordHandle = (e) => setConfirm_password(e.target.value);
  const ageHandle = (e) => setAge(e.target.value);
  const stateHandle = (e) => {
    setState(e);
    setCity(null);
    const districts = data.states.find((el) => el.state === e.label).districts;
    const options = districts.map((el) => ({
      label: el,
      value: el,
    }));
    setDistrictOptions(options);
  };
  const cityHandle = (e) => setCity(e);
  const genderHandle = (e) => setGender(e);
  const classes_optionHandle = (e) => setClasses_option(e);
  const codeHandle = (e) => setCode(e.target.value);

  // Class select option styles
  const styles = {
    control: (provided, state) => ({
      ...provided,
      width: "100%",
      height: "40px",
      border: "0.5px solid white",
      borderRadius: "25px",
      background: "#eef5f3",
      fontSize: "1.5rem",
      fontWeight: "500",
      marginBottom: "20px",
      lineHeight: "5rem",
      padding: "0 16px",
      transition: "all 0.2s",
      height: "50px",
      "&:focus": {
        backgroundColor: "white",
        border: "0.5px solid rgb(185, 185, 185)",
      },
      "&:active": {
        backgroundColor: "white",
        border: "0.5px solid rgb(185, 185, 185)",
      },
    }),
    option: (provided, state) => ({
      ...provided,
      width: "100%",
      background: "#fff",
      color: "#37474f",
      "&:hover": { background: "#eee" },
    }),
  };

  // Register submit handle
  const submitHandle = (e) => {
    e.preventDefault();
    const user_credentials = {
      full_name,
      email,
      mobile_number,
      password,
      age,
      state: state.value,
      city: city.value,
      gender: gender.value,
      class: classes_option.value,
    };
    const verify_email_codes = {
      user: code,
      browser: sc,
    };
    if (
      full_name !== "" &&
      email !== "" &&
      password !== "" &&
      password === confirm_password &&
      classes_option !== ""
    )
      if (sc !== "") {
        sign_up({ user_credentials, verify_email_codes }).then(() => {
          console.log("AAAAAA", { verify_email_codes });
          props.history.push("/");
        });
      } else {
        sign_up({ user_credentials });
      }
  };

  useEffect(() => {
    get_classes_only();
  }, []);

  return sc === "" ? (
    <React.Fragment>
      <div className="login-wrapper">
        <h1 className="login-heading">Create Free Account</h1>
        <p className="h-description">Sign Up using social network</p>
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
        <form className="signup-form" onSubmit={submitHandle}>
          <div className="input-wrapper">
            <div className="col-flex">
              <input
                className="input col-equal"
                name="full_name"
                type="text"
                placeholder="Full name"
                value={full_name}
                onChange={full_nameHandle}
              />
              <input
                className="input col-four"
                name="age"
                type="text"
                placeholder="Age"
                value={age}
                onChange={ageHandle}
              />
              <div className="col-four">
                <Select
                  styles={styles}
                  value={gender}
                  onChange={genderHandle}
                  options={genders}
                  isSearchable={false}
                  placeholder="Gender"
                />
              </div>
            </div>
            <div className="col-flex">
              <input
                className="input col-big"
                name="email"
                type="text"
                placeholder="Email"
                value={email}
                onChange={emailHandle}
              />
              <input
                className="input col-small"
                name="mobile_number"
                type="text"
                placeholder="Phone number"
                value={mobile_number}
                onChange={mobile_numberHandle}
              />
            </div>
            <div className="col-flex ">
              <div className="col-three">
                <Select
                  name="state"
                  styles={styles}
                  value={state}
                  onChange={stateHandle}
                  options={states_options}
                  isSearchable={false}
                  placeholder="State"
                />
              </div>
              <div className="col-three">
                <Select
                  name="city"
                  styles={styles}
                  value={city}
                  onChange={cityHandle}
                  options={districtOptions}
                  isSearchable={false}
                  placeholder="City"
                />
              </div>

              <div className="col-three">
                <Select
                  styles={styles}
                  value={classes_option}
                  onChange={classes_optionHandle}
                  options={classes_options}
                  isSearchable={false}
                  placeholder="Classes"
                />
              </div>
            </div>
            <div className="col-flex">
              <input
                className="input col-equal"
                name="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={passwordHandle}
              />
              <input
                className="input col-equal"
                name="confirm_password"
                type="password"
                placeholder="Confirm password"
                value={confirm_password}
                onChange={confirm_passwordHandle}
              />
            </div>

            {/* <Select
                styles={styles}
                value={gender}
                onChange={genderHandle}
                options={genders}
                isSearchable={false}
                placeholder="Gender"
              /> */}
          </div>
          <button className="form-button" type="submit">
            Register
          </button>
        </form>
      </div>
    </React.Fragment>
  ) : (
    // <React.Fragment>

    //   <Message>Email verification</Message>
    //   <Form onSubmit={submitHandle}>
    //     <SubForm>
    // <Input
    //   icon={lock}
    //   name="code"
    //   type="text"
    //   placeholder="Verification code"
    //   value={code}
    //   onChange={codeHandle}
    // />
    //       <FormBtn type="submit">Verify</FormBtn>
    //     </SubForm>
    //   </Form>
    // </React.Fragment>
    <div className="forgot-wrapper">
      <div>
        <h1 className="login-heading">Email Verification</h1>
        <p className="h-description">
          We have sent an OTP to your email address.
        </p>
        <form onSubmit={submitHandle} className="login-form">
          <div className="input-wrapper">
            <input
              className="input"
              name="code"
              type="text"
              placeholder="Verification code"
              value={code}
              onChange={codeHandle}
            />
          </div>
          <button className="form-button" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

register_page.propTypes = {
  classes: PropTypes.array.isRequired,
  get_classes_only: PropTypes.func.isRequired,
  sign_up: PropTypes.func.isRequired,
  sc: PropTypes.string.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  get_classes_only: () => dispatch(get_classes_only()),
  sign_up: (user_credentials) => dispatch(sign_up(user_credentials)),
});

const mapStateToProps = (state) => ({
  classes: state.data.classes,
  sc: state.user.sc,
});

export default connect(mapStateToProps, mapDispatchToProps)(register_page);
