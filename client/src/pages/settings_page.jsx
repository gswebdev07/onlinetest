import React, { useState, useEffect } from "react";
import { Message, Form, Label, SubForm, FormBtn } from "../static/common";
// Components
import Input from "../components/UI/Input";
import DeleteAccount from "../components/Popup/user/delete_account";
import Close from "../components/UI/Close";
// Icons
import login from "../static/icons/png/user - Copy.png";
import lock from "../static/icons/png/padlock.png";
// Redux
import { get_generals, update_general } from "../store/actions/data_actions";
import { update_credentials } from "../store/actions/user_actions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "./Styles/content_page_styles.css";

const AdminSettings = (props) => {
  const {
    about,
    aboutHandle,
    disclaimer,
    disclaimerHandle,
    terms,
    termsHandle,
    submitHandle,
  } = props;

  return (
    <Form onSubmit={submitHandle}>
      <Label>
        About us:
        <textarea
          className="set-textbox"
          name="about"
          type="text"
          placeholder="About us info ..."
          value={about}
          onChange={aboutHandle}
        />
      </Label>
      <Label>
        Disclaimer:
        <textarea
          className="set-textbox"
          name="disclaimer"
          type="text"
          placeholder="Disclaimer ..."
          value={disclaimer}
          onChange={disclaimerHandle}
        />
      </Label>
      <Label>
        Terms of use:
        <textarea
          className="set-textbox"
          name="terms"
          type="text"
          placeholder="Terms of use ..."
          value={terms}
          onChange={termsHandle}
        />
      </Label>
      <FormBtn type="submit">Edit</FormBtn>
    </Form>
  );
};

const UserSettings = (props) => {
  const {
    full_name,
    full_nameHandle,
    old_password,
    old_passwordHandle,
    password,
    passwordHandle,
    confirm_password,
    comfirmPasswordHandle,
    submitHandle,
    trigger,
    incorrect,
  } = props;

  return (
    <Form onSubmit={submitHandle}>
      <SubForm>
        <Input
          icon={login}
          name="full_name"
          type="text"
          placeholder="Full name"
          value={full_name}
          onChange={full_nameHandle}
        />
        <Input
          icon={lock}
          name="old_password"
          type="password"
          placeholder="Your old password"
          value={old_password}
          onChange={old_passwordHandle}
        />
        <Input
          icon={lock}
          name="password"
          type="password"
          placeholder="Your new password"
          value={password}
          onChange={passwordHandle}
        />
        <Input
          icon={lock}
          name="confirm_password"
          type="password"
          placeholder="Confirm your new password"
          value={confirm_password}
          onChange={comfirmPasswordHandle}
        />
        {incorrect === "Password Changed Successfully" ? (
          <p
            className="incorrect"
            style={{ opacity: "1", marginBottom: "0", color: "#4786e5" }}
          >
            {incorrect}
          </p>
        ) : (
          <p
            className="incorrect"
            style={
              incorrect
                ? { opacity: "1", marginBottom: "0" }
                : { marginBottom: "0" }
            }
          >
            {incorrect}
          </p>
        )}

        <FormBtn type="submit">Edit</FormBtn>
        <FormBtn color="red" onClick={trigger}>
          Delete account
        </FormBtn>
      </SubForm>
    </Form>
  );
};

const settings_page = (props) => {
  const {
    admin,
    user_credentials,
    general,
    get_generals,
    update_general,
    update_credentials,
  } = props;

  // Check for admin
  const isAdmin = admin === "Admin" ? true : false;

  // States (Admin)
  const [about, setAbout] = useState("");
  const [disclaimer, setDisclaimer] = useState("");
  const [terms, setTerms] = useState("");
  // States (User)
  const [full_name, setFull_name] = useState("");
  const [old_password, setOld_password] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirm_password] = useState("");
  const [open, setOpen] = useState(false);
  const [incorrect, setIncorrect] = useState(null);

  // Handles (Admin)
  const aboutHandle = (e) => setAbout(e.target.value);
  const disclaimerHandle = (e) => setDisclaimer(e.target.value);
  const termsHandle = (e) => setTerms(e.target.value);
  // Handles (User)
  const full_nameHandle = (e) => setFull_name(e.target.value);
  const old_passwordHandle = (e) => setOld_password(e.target.value);
  const passwordHandle = (e) => setPassword(e.target.value);
  const comfirmPasswordHandle = (e) => setConfirm_password(e.target.value);
  const toggle = () => setOpen((prevState) => !prevState);

  // Submits
  const submitHandle = (e) => {
    e.preventDefault();
    if (isAdmin) {
      const details = {
        ...general,
        about,
        disclaimer,
        terms,
      };
      update_general({ details });
    } else {
      if (old_password !== user_credentials.password) {
        setIncorrect("Wrong Password");
      }
      if (
        old_password === user_credentials.password &&
        password !== confirm_password
      ) {
        setIncorrect("New password don't match");
      }
      if (
        old_password === user_credentials.password &&
        password === confirm_password
      ) {
        setIncorrect("Password Changed Successfully");
        const new_credentials = {
          _id: user_credentials._id,
          full_name,
          password,
        };
        update_credentials({ user_credentials: new_credentials });
      } else if (full_name !== "") {
        const new_credentials = {
          _id: user_credentials._id,
          full_name,
        };
        update_credentials({ user_credentials: new_credentials }).then(() => {
          setOld_password("");
          setPassword("");
          setConfirm_password("");
        });
      }
    }
  };

  useEffect(() => {
    if (isAdmin) {
      if (general) {
        get_generals();
        setAbout(general.about);
        setDisclaimer(general.disclaimer);
        setTerms(general.terms);
      }
    } else {
      setFull_name(user_credentials.full_name);
    }
  }, []);

  return (
    <div>
      <Message></Message>
      {isAdmin ? (
        <AdminSettings
          about={about}
          aboutHandle={aboutHandle}
          disclaimer={disclaimer}
          disclaimerHandle={disclaimerHandle}
          terms={terms}
          termsHandle={termsHandle}
          submitHandle={submitHandle}
        />
      ) : (
        <React.Fragment>
          <DeleteAccount
            open={open}
            trigger={toggle}
            old_password={user_credentials.password}
          />
          <Close open={open} trigger={toggle} />
          <UserSettings
            full_name={full_name}
            full_nameHandle={full_nameHandle}
            old_password={old_password}
            old_passwordHandle={old_passwordHandle}
            password={password}
            passwordHandle={passwordHandle}
            confirm_password={confirm_password}
            comfirmPasswordHandle={comfirmPasswordHandle}
            submitHandle={submitHandle}
            trigger={toggle}
            incorrect={incorrect}
          />
        </React.Fragment>
      )}
    </div>
  );
};

settings_page.propTypes = {
  admin: PropTypes.string,
  user_credentials: PropTypes.object,
  general: PropTypes.object,
  get_generals: PropTypes.func.isRequired,
  update_general: PropTypes.func.isRequired,
  update_credentials: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  get_generals: () => dispatch(get_generals()),
  update_general: (details) => dispatch(update_general(details)),
  update_credentials: (user_credentials) =>
    dispatch(update_credentials(user_credentials)),
});

const mapStateToProps = (state) => ({
  admin: state.user.user,
  user_credentials: state.user.user_credentials,
  general: state.data.general,
});

export default connect(mapStateToProps, mapDispatchToProps)(settings_page);
