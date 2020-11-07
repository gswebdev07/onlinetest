import React, { useState } from "react";
import { Message } from "../static/common";
// Containers
import Container from "../containers/Container";
// Components
import Bookmark from "../components/Items/Bookmark";
// Redux
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Bookmark_popup from "../components/Popup/user/bookmark_popup";
import Close from "../components/UI/Close";

const Bookmarks = (props) => {
  const { bookmarks, trigger, setBook } = props;

  return bookmarks.map((bookmark, index) => (
    <Bookmark
      key={index}
      bookmark={bookmark}
      setBook={(bookmark) => setBook(bookmark)}
      trigger={trigger}
    />
  ));
};

const bookmarks_page = (props) => {
  const [open, setOpen] = useState(false);
  const [book, setBook] = useState("");
  const { bookmarks } = props;
  return (
    <div>
      <Bookmark_popup open={open} book={book} trigger={() => setOpen(!open)} />
      <Close open={open} trigger={() => setOpen(!open)} />
      <Message></Message>
      <Container>
        <Bookmarks
          bookmarks={bookmarks}
          setBook={(bookmark) => setBook(bookmark)}
          trigger={() => setOpen(!open)}
        />
      </Container>
    </div>
  );
};

bookmarks_page.propTypes = {
  bookmarks: PropTypes.array.isRequired,
};

const mapDispatchToProps = (dispatch) => ({});

const mapStateToProps = (state) => ({
  bookmarks: state.user.user_credentials.bookmarks,
});

export default connect(mapStateToProps, mapDispatchToProps)(bookmarks_page);
