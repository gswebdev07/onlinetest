import styled from "styled-components";
import { colors } from "../../../static/colors";

export const Burger = styled.div`
  cursor: pointer;
  position: fixed;
  top: 13px;
  left: 10px;
  width: 35px;
  height: 25px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  z-index: 1000;
  @media screen and (min-width: 700px) {
    & {
      display: none;
    }
  }
`;

export const Line = styled.div`
  position: relative;
  width: 100%;
  height: 4px;
  border-radius: 2px;
  background: ${colors.dark};
`;
