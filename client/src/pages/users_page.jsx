import React, { useEffect } from "react";
import { colors } from "../static/colors";
import { Message } from "../static/common";
// Components
import User from "../components/Items/User";
// Containers
import Container from "../containers/Container";
// Redux
import { get_users } from "../store/actions/data_actions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "./Styles/content_page_styles.css";

const Users = ({ users }) =>
  users.map((user, index) => <User key={index} user={user} />);

const users_page = (props) => {
  const { users, get_users } = props;

  // Table style
  const style = {
    width: "100%",
    border: `1px solid #777`,
    fontSize:"1.5rem"
  };

  useEffect(() => {
    get_users();
  }, []);

  return (
    <div>
      <Message></Message>
      <Container>
        <table style={style}>
          <tbody>
            <tr className="main-table-row">
              <td>Full name</td>
              <td>Email</td>
              <td>Class</td>
              <td>State</td>
              <td>City</td>
              <td>Phone number</td>
              <td>Gender</td>
              <td>Age</td>
              <td></td>
            </tr>
            <Users users={users} />
          </tbody>
        </table>
      </Container>
    </div>
  );
};

users_page.propTypes = {
  users: PropTypes.array.isRequired,
  get_users: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  get_users: () => dispatch(get_users()),
});

const mapStateToProps = (state) => ({
  users: state.data.users,
});

export default connect(mapStateToProps, mapDispatchToProps)(users_page);
