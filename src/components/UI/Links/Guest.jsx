import React from "react";
import { Links, StyledLink, NavLink } from "./styles";

const Primary = () => {
  return (
    <Links>
      <StyledLink to="/register">
        <NavLink>Register</NavLink>
      </StyledLink>
      <StyledLink to="/login">
        <NavLink>Login</NavLink>
      </StyledLink>
    </Links>
  );
};

export default Primary;
