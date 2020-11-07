import styled from "styled-components";
import { colors } from "../../../static/colors";

export const Chapter = styled.div`
  position: relative;
  margin: 15px;
  width: 200px;
  height: 250px;
  background-image: linear-gradient(to right bottom, #777, #333);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 5px 5px 10px ${colors.dark};
  transition: all 0.1s ease;
  border-radius: 10px;
  &::after {
    content: "";
    width: 100%;
    height: 100%;
    opacity: 0;
    background-image: linear-gradient(
      to right bottom,
      rgba(17, 65, 124, 1),
      rgba(72, 137, 235, 1)
    );
    position: absolute;
    z-index: 0;
    transition: 0.3s all;
  }
  &:hover {
    &::after {
      opacity: 1;
    }
    box-shadow: 1px 1px 10px ${colors.dark};
  }
`;

export const Content = styled.div`
  padding-left: 15px;
  position: relative;
  z-index: 10;
  height: 80%;
`;

export const ChapterName = styled.h2`
  color: #faf9f9;
  font-weight: 300;
  font-size: ${({ long }) => (long ? "15px" : "20px")};
  position: relative;
  z-index: 10;
  padding-top: 10px;
  padding-right:10px;
`;

export const ImageContainer = styled.div`
  position: relative;
  margin-top: 50px;
  width: 170px;
  height: 100px;
  background: ${colors.dark_gray};
  border-radius: 5px;
  overflow: hidden;
  z-index: 10;
`;

export const Displayers = styled.div`
  position: absolute;
  left: 0;
  bottom: 10px;
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  font-size: 12px;
  font-weight: 300;
  color: #faf9f9;
  z-index: 10;
  padding-bottom: 5px;
`;

export const Displayer = styled.div``;

export const Line = styled.div`
  position: absolute;
  right: -10px;
  bottom: 10px;
  width: 60px;
  height: 5px;
  transform: rotate(-45deg);
  background: ${colors.red};
`;
