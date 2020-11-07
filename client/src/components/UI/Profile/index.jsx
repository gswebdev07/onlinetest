import React from "react";
import {
  Profile,
  ImageContent,
  Name,
  CredentialsContent,
  Credential,
} from "./styles";
// Redux
import PropTypes from "prop-types";
import { connect } from "react-redux";

const Image = ({ img, full_name }) => {
  const first_name_letter = full_name[0];
  return (
    <ImageContent>
      {img ? (
        <img alt="Avatar" src={img} width="100%" height="auto" />
      ) : (
        <Name>{first_name_letter}</Name>
      )}
    </ImageContent>
  );
};

const Credentials = ({ credentials }) => (
  <CredentialsContent>
    {credentials.map((prop, index) => (
      <Credential key={index}>
        {prop.substring(0, 17)}
        {prop.length > 17 ? "..." : null}
      </Credential>
    ))}
  </CredentialsContent>
);

const index = (props) => {
  const { user } = props;
  const { user_credentials } = user;
  return (
    <Profile>
      <Image img={null} full_name={user_credentials.full_name} />
      <Credentials
        credentials={[user_credentials.full_name, user_credentials.class]}
      />
    </Profile>
  );
};

index.propTypes = {
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(index);
