import styled from "styled-components";
import { colors } from "../../../static/colors";

export const Question = styled.div`
  cursor: pointer;
  position: relative;
  min-height: 45px;
  min-width: 300px;
  margin: 25px 0;
  display: flex;
  background: ${colors.primary};
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 0px 0px 10px ${colors.dark};
  transition: all 0.1s ease;
  &:hover {
    box-shadow: 0px 0px 5px ${colors.dark};
  }
`;

export const Content = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 50px 1fr;
  align-items: center;
  color: #333;
  transition: 0.2s all;
  &:hover {
    color: #4786e5;
  }
`;
export const QuestionTitle = styled.div`
  font-size: 20px;
  font-weight: 500;
  padding:10px;
  padding-right: 110px;
`;
export const ImageContainer = styled.div`
  padding: 5px;
  overflow: hidden;
`;
