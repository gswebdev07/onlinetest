import React, { useEffect } from "react";
import { Message, Message2 } from "../../static/common";
// Components
import Subject from "../../components/Items/Subject";
// Containers
import ItemsContainer from "../../containers/ItemsContainer";
// Redux
import { get_subjects } from "../../store/actions/data_actions";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const Subjects = (props) => {
  const { subjects } = props;
  return subjects.length > 0 ? (
    subjects.map((item, index) => <Subject key={index} subject={item} />)
  ) : (
    <Message>No subjects ...</Message>
  );
};

const subjects_page = (props) => {
  const { class_name, subjects, method, get_subjects } = props;

  useEffect(() => {
    get_subjects(class_name);
  }, []);

  return (
    <div>
      {/* <Message2>
        Your class subjects ({method === "TEST" ? "Test" : "Practice"})
      </Message2> */}
      <ItemsContainer>
        <Subjects subjects={subjects} />
      </ItemsContainer>
    </div>
  );
};

subjects_page.propTypes = {
  method: PropTypes.string,
  class_name: PropTypes.string,
  subjects: PropTypes.array.isRequired,
  get_subjects: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  get_subjects: (class_name) => dispatch(get_subjects(class_name)),
});

const mapStateToProps = (state) => ({
  class_name: state.user.user_credentials.class,
  subjects: state.data.subjects,
  method: state.user.method,
});

export default connect(mapStateToProps, mapDispatchToProps)(subjects_page);
