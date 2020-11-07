import React from "react";
import { User, Item, DeleteBtn } from "./styles";
// Redux
import { delete_user } from "../../../store/actions/data_actions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import bin from "../../../static/icons/buttons/bin - copy.png";

const index = (props) => {
  const { user, delete_user } = props;
  const {
    _id,
    full_name,
    email,
    state,
    city,
    mobile_number,
    gender,
    age,
  } = user;

  const delete_userFunc = () => delete_user(_id);

  return (
    <User>
      <Item>{full_name}</Item>
      <Item>{email}</Item>
      <Item>{user.class}</Item>
      <Item>{state}</Item>
      <Item>{city}</Item>
      <Item>{mobile_number}</Item>
      <Item>{gender}</Item>
      <Item>{age}</Item>
      {user.class === "Admin" ? null : (
        <Item>
          <button className="class-button" onClick={delete_userFunc}>
            <img alt="delete" src={bin} width="20px" height="auto" />
          </button>
        </Item>
      )}
    </User>
  );
};

index.propTypes = {
  delete_user: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  delete_user: (user_id) => dispatch(delete_user(user_id)),
});

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(index);
