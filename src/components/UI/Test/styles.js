import styled from "styled-components";
import { colors } from "../../../static/colors";

export const TestContainer = styled.div`
  padding: 15px;
  margin: 20px 20px;
`;

export const TimerAndTopicName = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const TopicName = styled.div`
  font-size: 1.6rem;
  font-weight:500;
  margin-right:10px;
  display:flex;
  aligh-items:center;
  color: #21589b;
  // @media screen and (max-width: 700px) {
  //   & {
  //     font-size: 25px;
  //   }
  }
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
  cursor: cell;
  position: absolute;
  top: 0;
  right: 15px;
  width: 30px;
  height: 50px;
  clip-path: polygon(0 0, 100% 0, 100% 100%, 50% 80%, 0 100%);
  background: ${colors.dark_gray};
`;
export const Answers = styled.div`
  padding-left: 20px;
`;
export const Option = styled.div`
  cursor: pointer;
  font-size: 16px;
  margin-bottom: 7px;
  margin-left: 20px;
  display: grid;
  grid-template-columns: 25px 1fr;
  align-items: center;
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
  border: 3px solid #4786e5;
  border-radius: 50%;
  background: ${(props) => (props.color ? "#4786e5" : "none")};
`;
export const Result = styled.div`
  position: absolute;
  font-size: 60px;
  font-weight: 900;
  color: ${(props) => props.color};
  opacity: 0.4;
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%) rotate(-45deg);
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
  width:150px;
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