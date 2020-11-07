import styled from "styled-components";
import { colors } from "../../../static/colors";

export const Topic = styled.div`
  cursor: pointer;
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
  border-radius:10px;
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
  z-index:10;
`;

export const TopicName = styled.h2`
  color: #faf9f9;
  padding-right:10px;
  font-size: ${({ long }) => (long ? "15px" : "25px")};
  font-weight: 300;
  position: relative;
  z-index: 10;
  padding-top:10px;
`;

export const ImageContainer = styled.div`
  position: relative;
  margin-top: 50px;
  width: 170px;
  height: 100px;
  color: ${colors.dark};
  background: ${colors.dark_gray};
  border-radius: 5px;
  overflow: hidden;
  z-index: 10;
`;

export const Displayer = styled.div`
  position: absolute;
  bottom: 10px;
  font-size: 1.2rem;
  font-weight: 300;
  color: #faf9f9;
  z-index: 10;
  padding-bottom:5px;
`;

export const Line = styled.div`
  position: absolute;
  right: -10px;
  bottom: 10px;
  width: 60px;
  height: 5px;
  transform: rotate(-45deg);
  background: ${colors.yellow};
`;
