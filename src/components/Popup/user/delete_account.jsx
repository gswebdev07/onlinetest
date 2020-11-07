import React, { useState } from "react";
import { Message } from "../../../static/common";
import { Form, DeleteBtnPairs } from "../styles";
// Redux
import { delete_account } from "../../../store/actions/user_actions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Input from "../../UI/Input/index";
import lock from "../../../static/icons/png/padlock.png";
import "./styles.css";

const DeleteAccount = (props) => {
  const { open, trigger, delete_account, old_password } = props;
  const [password, setPassword] = useState("");
  const [wrong, setWrong] = useState(false);
  const delete_accountFunc = () => {
    if (password === old_password) {
      delete_account();
    } else {
      setWrong(true);
    }
  };
  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };
  return open ? (
    <Form>
      <Message>Are you sure?: </Message>
      <p style={{ margin: "10px", fontSize: "1.6rem", textAlign: "center" }}>
        All your data including your personal results and bookmarks will be
        deleted.
      </p>
      <Input
        icon={lock}
        name="password"
        type="password"
        placeholder="Enter Your password"
        onChange={passwordHandler}
        style={{ width: "60%", margin: "10px auto" }}
      />
      <DeleteBtnPairs>
        <div className=" BTN btn-delete" onClick={delete_accountFunc}>
          Delete account
        </div>
        <div className=" BTN btn-cancel" onClick={trigger}>
          Cancel
        </div>
      </DeleteBtnPairs>
      <p className="incorrect" style={wrong ? { opacity: "1" } : null}>
        Incorrect password
      </p>
    </Form>
  ) : null;
};

DeleteAccount.propTypes = {
  delete_account: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  delete_account: () => dispatch(delete_account()),
});

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(DeleteAccount);
