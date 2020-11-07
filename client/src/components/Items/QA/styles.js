import styled from "styled-components";
import { colors } from "../../../static/colors";

export const QA = styled.form`
  position: relative;
  margin-bottom: 2rem;
  width: 100%;
  background: ${colors.primary};
  border: 1px solid #333333;
  border-bottom: 5px solid ${({ color }) => color};
  border-radius: 15px;
`;

export const Author = styled.div`
  position: absolute;
  padding-top: 10px;
  top: 2px;
  right: 30px;
  color: #faf9f9;
  opacity: 1;
  font-size: 13px;
  font-weight: 400;
`;

export const Asked = styled.div`
  padding: 10px 15px;
  font-size: 1.6rem;
  font-weight: 300;
  color: white;
  background: #333333;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
`;

export const Answer = styled.div`
  color: #333333;
  font-size: 1.6rem;
  font-weight: 500;
  padding: 10px 15px;
`;

export const AnswerArea = styled.textarea`
  max-width: 100%;
  min-width: 100%;
  font-size: 15px;
  font-weight: 500;
  padding: 5px;
  border: none;
  border-bottom: 1px solid #333333;
  color: #333333;
`;

export const SendBtn = styled.button`
  cursor: pointer;
  padding: 12px 25px;
  border: none;
  background: #333333;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 300;
  font-size: 1.6rem;
  transition: all 0.3s ease;
  text-transform: uppercase;
  color: #faf9f9;
  border-radius: 5px;
  margin: 5px auto;
  &:hover {
    background: #4786e5;
  }
`;
export const DeleteBtn = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  width: 25px;
  height: 25px;
  background: none;
  border-radius: 5px;
  color: ${colors.primary};
  transition: 0.2s all;
  opacity: 0.7;
  &:hover {
    opacity: 1;
  }
`;
