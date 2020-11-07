import styled from "styled-components";
import { colors } from "../../../static/colors";

export const Result = styled.tr`
  cursor: default;
  color: ${colors.dark};
  height: 35px;
  &:hover {
    color: ${colors.primary};
    background: ${colors.light_blue};
  }
  transition: all 0.1s ease;

  & td {
    overflow: hidden;
  }
`;
