import React from "react";
import { Message } from "../../static/common";
// Components
import Chapter from "../../components/Items/Chapter";
import NavigationLinks from "../../components/UI/NavigationLinks";
// Containers
import ItemsContainer from "../../containers/ItemsContainer";
// Redux
import PropTypes from "prop-types";
import { connect } from "react-redux";

const Chapters = (props) => {
  const { chapters, current_directory } = props;
  return chapters.length > 0 ? (
    chapters.map((item, index) =>
      item.subject_name === current_directory.subject_name ? (
        <Chapter key={index} chapter={item} />
      ) : null
    )
  ) : (
    <Message>No chapters ...</Message>
  );
};

const chapters_page = (props) => {
  const { chapters, current_directory } = props;

  return (
    <div>
      {/* <Message>Your subject chapters</Message> */}
      <NavigationLinks
        links={[{ dir: "subjects", name: current_directory.subject_name }]}
      />
      <ItemsContainer>
        <Chapters chapters={chapters} current_directory={current_directory} />
      </ItemsContainer>
    </div>
  );
};

chapters_page.propTypes = {
  chapters: PropTypes.array.isRequired,
  current_directory: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  chapters: state.data.chapters,
  current_directory: state.data.current_directory,
});

export default connect(mapStateToProps)(chapters_page);
