import styled from "styled-components";
import { colors } from "../../../static/colors";

export const Subject = styled.div`
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
`;

export const SubjeckName = styled.h2`
  padding-top: 40px;
  color: #faf9f9;
  font-size: ${({ long }) => (long ? "15px" : "25px")};
  padding-bottom: 10px;
  padding-right: 10px;
  font-weight: 300;
  position: relative;
  z-index: 10;
`;

export const ImageContainer = styled.div`
  width: 170px;
  height: 100px;
  background: ${colors.dark_gray};
  border-radius: 5px;
  overflow: hidden;
  position: relative;
  z-index: 10;
`;

export const Displayers = styled.div`
  position: absolute;
  left: 0;
  bottom: 10px;
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  font-size: 1.2rem;
  font-weight: 300;
  color: #faf9f9;
  z-index: 10;
  padding-bottom: 5px;
`;

export const Displayer = styled.div``;

export const Bookmark = styled.div`
  position: absolute;
  left: 15px;
  width: 20px;
  height: 30px;
  clip-path: polygon(0 0, 100% 0, 100% 100%, 50% 80%, 0 100%);
  background: #faf9f9;
  z-index: 10;
`;
