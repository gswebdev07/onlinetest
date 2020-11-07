import React from "react";
import { Bookmark, BookmarkTitle, DeleteBtn } from "./styles";
// Redux
import { add_bookmark } from "../../../store/actions/user_actions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Bin from "../../../static/icons/buttons/bin-white - Copy.png";

const index = (props) => {
  const { bookmark, add_bookmark, trigger, setBook } = props;

  const delete_bookmark = () => add_bookmark({ bookmark });
  return (
    <Bookmark>
      <BookmarkTitle
        onClick={() => {
          setBook(bookmark);
          trigger();
        }}
      >
        Question title: {bookmark.question_title}
      </BookmarkTitle>
      <DeleteBtn onClick={delete_bookmark}>
        <img src={Bin} alt="bin" width="25px" />
      </DeleteBtn>
    </Bookmark>
  );
};

index.propTypes = {
  add_bookmark: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  add_bookmark: (bookmark) => dispatch(add_bookmark(bookmark)),
});

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(index);
