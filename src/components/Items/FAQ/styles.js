import styled from "styled-components";
import { colors } from "../../../static/colors";

export const FAQ = styled.div`
  position: relative;
  margin-bottom: 15px;
  width: 100%;
  border-radius: 5px;
  overflow: hidden;
  border: 1px solid #333333;
`;

export const Question = styled.div`
  padding: 5px 10px;
  font-size: 20px;
  font-weight: 300;
  color: #faf9f9;
  background: #333333
`;

export const Answer = styled.div`
  padding: 5px 10px;
  font-weight: 400;
  font-size: 17px;
  color: #333333;
`;

export const DeleteBtn = styled.div`
  cursor: pointer;
  position: absolute;
  top: 5px;
  right: 15px;
  width: 25px;
  height: 25px;
  background: none;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${colors.primary};
  transition: 0.2s all;
  opacity: 0.7;
  &:hover {
    opacity: 1;
  }
`;
