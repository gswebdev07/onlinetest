import React from "react";
import { Spinner } from "./styles";
// Redux
import PropTypes from "prop-types";
import { connect } from "react-redux";

const index = ({ loading }) => {
  return (
    <Spinner animation={loading ? "load1 1s infinite ease-in-out" : null}>
      <div className="loader1">Loading...</div>
    </Spinner>
  );
};

index.propTypes = {
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  loading: state.data.loading,
});

export default connect(mapStateToProps)(index);
