import React from "react";
import { FAQ, Question, Answer, DeleteBtn } from "./styles";
// Redux
import { delete_faq } from "../../../store/actions/data_actions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import bin from "../../../static/icons/buttons/bin-white.png";

const index = (props) => {
  const { faq, admin, delete_faq } = props;
  const { _id, question, answer } = faq;

  return (
    <FAQ>
      {admin === "Admin" ? (
        <DeleteBtn onClick={() => delete_faq(_id)}>
          {" "}
          
            <img alt="delete" src={bin} width="20px" height="20px" />
          
        </DeleteBtn>
      ) : null}

      <Question>{question}</Question>
      <Answer>{answer}</Answer>
    </FAQ>
  );
};

index.propTypes = {
  admin: PropTypes.string.isRequired,
  delete_faq: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  delete_faq: (id) => dispatch(delete_faq(id)),
});

const mapStateToProps = (state) => ({
  admin: state.user.user,
});

export default connect(mapStateToProps, mapDispatchToProps)(index);
