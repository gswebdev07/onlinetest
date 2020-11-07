import styled from "styled-components";

export const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #000;
  padding: 15px;
  opacity: 0.4;
  z-index: 500;
  animation: appearing 0.4s ease;
  @keyframes appearing {
    from {
      opacity: 0;
    }
    to {
      opacity: 0.4;
    }
  }
`;
