import styled from "styled-components";
import { colors } from "../../../static/colors";

export const PracticeContainer = styled.div`
  padding: 15px;
  margin: 20px 20px;
`;

export const TopicName = styled.div`
  font-size: 1.6rem;
  font-weight: 500;
  margin: 10px;
  display: flex;
  aligh-items: center;
  color: #21589b;
`;

export const Question = styled.div`
  font-size: 2rem;
  font-weight: 500;
  color: #333333;
  margin: 10px;
  @media screen and (max-width: 700px) {
    & {
      font-size: 1.8rem;
    }
  }
`;

export const Polygon = styled.div`
  position: relative;
  border-radius: 5px;
  overflow: hidden;
  border: 1px solid #333;
  padding: 10px 0;
`;
export const Bookmark = styled.div`
  cursor: pointer;
  position: absolute;
  top: 0;
  right: 15px;
  width: 30px;
  height: 50px;
  clip-path: polygon(0 0, 100% 0, 100% 100%, 50% 80%, 0 100%);
  background-color: ${(props) => (props.color ? props.color : "#333")};
  transition: 0.2s all;
  box-shadow: 0 1.5rem 4rem rgba(0, 0, 0, 0.15);
  &:hover {
    background-color: ${(props) => (props.color ? "#333" : " #4786e5")};
    box-shadow: none;
  }
`;
export const Answers = styled.div`
  padding-left: 20px;
`;
export const Option = styled.div`
  cursor: pointer;
  font-size: 16px;
  margin-bottom: 7px;
  margin-left: 20px;
  padding-right: 50px;
  display: grid;
  grid-template-columns: 25px 1fr;
  align-items: center;
  color: ${(props) => (props.color ? props.color : "none")};
  @media screen and (max-width: 700px) {
    & {
      font-size: 14px;
    }
  }
`;
export const Ball = styled.div`
  margin-right: 15px;

  width: 16px;
  height: 16px;
  border: 3px solid ${(props) => (props.color ? props.color : "#4786e5")};
  border-radius: 50%;
  background: ${(props) => (props.color ? props.color : "none")};
`;
export const Result = styled.div`
  position: absolute;
  font-size: 80px;
  font-weight: 600;
  color: ${(props) => props.color};
  opacity: 0.4;
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
`;

export const Buttons = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin-left: auto;
`;
export const TriggerBtn = styled.button`
  margin-top: 10px;
  margin-right: 20px;
  width: 150px;
  cursor: pointer;
  border: none;
  background: #333333;
  padding: 10px 20px;
  color: #faf9f9;
  font-size: 1.8rem;
  z-index: 100;
  transition: 0.2s all;
  &:hover {
    background: #4786e5;
  }
`;
export const TopicNameAndNumber = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
`;
