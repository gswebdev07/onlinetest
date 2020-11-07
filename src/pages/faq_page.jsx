import React, { useState, useEffect } from "react";
import { Message, AddButton } from "../static/common";
// Containers
import Container from "../containers/Container";
// Components
import FAQ from "../components/Items/FAQ";
import Close from "../components/UI/Close";
import ActFAQ from "../components/Popup/act_faq";
// Redux
import { get_faqs } from "../store/actions/data_actions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// Icons
import add from "../static/icons/buttons/add.png";

const FAQs = ({ faqs }) =>
  faqs.map((faq, index) => <FAQ key={index} faq={faq} />);

const faq_page = (props) => {
  const { admin, faqs, get_faqs } = props;

  // Toggling
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen((prevState) => !prevState);

  useEffect(() => {
    get_faqs();
  }, []);

  return (
    <div>
      <Message></Message>
      {/* Popup */}
      <ActFAQ open={open} trigger={toggle} />
      <Close open={open} trigger={toggle} />

      <Container>
        <FAQs faqs={faqs} />
      </Container>
      {admin === "Admin" ? (
        <AddButton onClick={() => toggle("ADD_CLASS")}>
          FAQ
          <img alt="add" src={add} width="35px" height="auto" />
        </AddButton>
      ) : null}
    </div>
  );
};

faq_page.propTypes = {
  admin: PropTypes.string.isRequired,
  faqs: PropTypes.array.isRequired,
  get_faqs: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  get_faqs: () => dispatch(get_faqs()),
});

const mapStateToProps = (state) => ({
  admin: state.user.user,
  faqs: state.data.faqs,
});

export default connect(mapStateToProps, mapDispatchToProps)(faq_page);
