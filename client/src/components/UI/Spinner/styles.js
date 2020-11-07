import styled from "styled-components";
import { colors } from "../../../static/colors";

export const Spinner = styled.div`
  position: fixed;
  right: 30px;
  bottom: 15px;
  z-index: 1000;
  .loader,
  .loader:before,
  .loader:after {
    background: ${colors.light_blue};
    -webkit-animation: ${(props) => props.animation};
    animation: ${(props) => props.animation};
    width: 1em;
    height: 1rem;
  }

`;

// User loading ...
export const UserLoading = styled.div`
  position: fixed;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -30%);
  z-index: 1200;
  img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .loader,
  .loader:after {
    border-radius: 50%;
    width: 10em;
    height: 10em;
  }
  .loader {
    position: absolute;
    margin: 60px auto;
    font-size: 10px;
    position: relative;
    text-indent: -9999em;
    border-top: 1.1em solid rgba(255, 255, 255, 0.2);
    border-right: 1.1em solid rgba(255, 255, 255, 0.2);
    border-bottom: 1.1em solid rgba(255, 255, 255, 0.2);
    border-left: 1.1em solid ${colors.light_blue};
    -webkit-transform: translateZ(0);
    -ms-transform: translateZ(0);
    transform: translateZ(0);
    -webkit-animation: load8 1.1s infinite linear;
    animation: load8 1.1s infinite linear;
  }
  @-webkit-keyframes load8 {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  @keyframes load8 {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
`;

export const Background = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: #000;
  opacity: 0.7;
  z-index: 1100;
`;
