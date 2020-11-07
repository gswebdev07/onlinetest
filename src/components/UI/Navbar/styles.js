import styled from "styled-components";
import { colors } from "../../../static/colors";
import { Link } from "react-router-dom";



export const StyledLink = styled(Link)`
  outline: none;
  text-decoration: none;
`;



export const LogoutBtn = styled.div`
  cursor: pointer;
  padding: 5px;
  display: flex;
  align-items: center;
  color: ${colors.primary};
  &:hover {
    color: ${colors.dark_blue};
  }
  * {
    margin: 5px;
  }
`;
