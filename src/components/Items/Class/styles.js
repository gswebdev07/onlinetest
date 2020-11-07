import styled from "styled-components";
import { colors } from "../../../static/colors";

export const Class = styled.div`
  position: relative;
  margin: 2rem 0 2rem 2rem;
  border-radius: 5px;
  min-width: 320px;
  height: 150px;
  background: #ffffff;
  box-shadow: 5px 5px 10px ${colors.dark};
  transition: all 0.1s ease;
  &:hover {
    box-shadow: 1px 1px 10px ${colors.dark};
  }
  display: flex;
  flex-direction: column;
`;

export const ClassName = styled.p`
  font-size: 2rem;
  font-weight: 500;
  width: 80%;
  overflow: hidden;
  position: relative;
  height: 50%;
  display: flex;
  align-items: center;
  padding-left: 15px;
  color: #4786e5;
`;

export const Stick = styled.div`
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  width: 85%;
  height: 1px;
  background: ${colors.dark};
`;

export const Content = styled.div`
  width: 100%;
  height: 50%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;

export const Displayer = styled.div`
  font-size: 1.2rem;
  font-weight: 700;
  line-spacing: 1px;
  color: ${colors.dark};
`;
