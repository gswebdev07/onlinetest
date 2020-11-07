import React from "react";
import { UserLoading, Background } from "./styles";
import lock from "../../../static/icons/png/lock.png";
// Redux
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "./loader.css";

const user_loading = (props) => {
  const { loading } = props;

  return loading ? (
    <React.Fragment>
      <UserLoading>
        <div className="loader1"></div>
      </UserLoading>
      <Background />
    </React.Fragment>
  ) : null;
};

user_loading.propTypes = {
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  loading: state.user.loading,
  loading2:state.data.loading
});

export default connect(mapStateToProps)(user_loading);
