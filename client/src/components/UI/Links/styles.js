import styled from "styled-components";
import { colors } from "../../../static/colors";
import { Link } from "react-router-dom";

export const Links = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  outline: none;
  font-size: 1.4rem;
  /* padding: 5px 0; */
  color: ${colors.secondary};
  display: flex;
  align-items: center;
  /* &:hover {
    color: ${colors.light_blue};
  } */
  img {
    margin-right: 5px;
  }
`;

export const NavLink = styled.div`
  display: flex;
  padding-left: 15px;
  padding: 15px;
  width: 100%;
  height: 100%;
  &:hover {
    background: ${colors.dark};
    transition: all 0.3s ease;
  }
`;
