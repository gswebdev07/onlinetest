import styled from "styled-components";
import { Link } from "react-router-dom";
import { colors } from "../../../static/colors";

export const NavigationLinks = styled.div`
  display: flex;
  margin: 0 15px;
  margin: 20px;
`;

export const NavigationLink = styled.div`
  text-decoration: none;
  disolay: flex;
  margin: 0 2px;
  font-size: 19px;
  color: #333333;
  &:hover {
    color: ${colors.light_blue};
  }
`;
