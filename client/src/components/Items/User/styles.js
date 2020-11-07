import styled from "styled-components";
import { colors } from "../../../static/colors";

export const User = styled.tr`
  cursor: default;
  color: ${colors.dark};
  height: 35px;
  &:hover {
    color: ${colors.primary};
    background: ${colors.light_blue};
  }
  transition: all 0.1s ease;
`;

export const Item = styled.td``;

export const DeleteBtn = styled.div`
  cursor: pointer;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  width: 25px;
  height: 25px;
  background: ${colors.red};
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${colors.primary};
  &:hover {
    color: ${colors.dark};
  }
`;
