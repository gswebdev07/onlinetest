import styled from "styled-components";
import { colors } from "../../static/colors";

export const Form = styled.form`
  position: absolute;
  top: 150px;
  left: 50%;
  margin: 2rem 0;
  transform: translateX(-50%);
  max-width: 500px;
  width: 100%;
  height: auto;
  background: #fff;

  display: flex;
  flex-direction: column;

  z-index: 1000;
  animation: float 0.4s ease;
  @keyframes float {
    from {
      transform: translate(-50%, 100%);
    }
    to {
      transform: translateX(-50%);
    }
  }
`;

export const LoginToggle = styled.form`
  position: absolute;
  top: 150px;
  left: 50%;
  margin: 2rem 0;
  transform: translateX(-50%);
  max-width: 500px;
  width: 100%;
  height: auto;
  background: #fff;
  padding: 30px;
  border-radius: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;

  z-index: 1000;
  animation: float 0.4s ease;
  @keyframes float {
    from {
      transform: translate(-50%, 100%);
    }
    to {
      transform: translateX(-50%);
    }
  }
`;

export const Close = styled.div`
  cursor: pointer;
  padding: 5px;
  position: absolute;
  top: 10px;
  right: 15px;
  font-size: 23px;
  font-weight: 900;
  color: ${colors.dark};
  &:hover {
    opacity: 0.7;
  }
`;
export const Close2 = styled.div`
  cursor: pointer;
  padding: 5px;
  position: absolute;
  top: 10px;
  right: 15px;
  font-size: 30px;
  font-weight: 300;
  color: #444;
  &:hover {
    opacity: 0.7;
  }
`;

export const Label = styled.label`
  display: flex;
  flex-direction: column;
  padding: 10px;
  margin-left: 10px;
  font-size: 14px;
  font-weight: 500;
  color: #333333;
`;
export const Input = styled.input`
  max-width: 100%;
  min-width: 100%;
  border: none;
  font-size: 19px;
  padding: 10px;
  border-bottom: 1px solid #333;
`;

export const Text = styled.textarea`
  max-width: 100%;
  min-width: 100%;
  padding: 5px;
  border: none;
  border-bottom: 1px solid ${colors.light_blue};
`;

export const Button = styled.button`
  cursor: pointer;
  border: none;
  background: ${(props) => (props.color ? props.color : "#333333")};
  padding: 20px 0;
  font-size: 20px;
  font-weigh: 300;
  color: ${colors.primary};
  transition: all 0.2s ease;
  &:hover {
    background: #4786e5;
  }
`;

export const DeleteBtnPairs = styled.div`
  display: flex;
  padding: 15px;
  align-items: center;
  justify-content: space-evenly;

  .btn:nth-child(1) {
    background: red;
  }

  .btn {
    cursor: pointer;
    display: flex;
    align-items: center;
    padding: 15px;
    height: 35px;
    border-radius: 5px;
    background: ${(props) => (props.color ? props.color : colors.light_blue)};
    font-size: 19px;
    color: ${colors.primary};
    &:hover {
      opacity: 0.7;
    }
  }
`;

export const PLink = styled.div`
  cursor: pointer;
  padding: 15px;
  background: #333;
  color: ${colors.primary};
  font-size: 1.5rem;
  transition: all 0.3s ease;
  &:hover {
    color: ${colors.primary};
    background: #4786e5;
  }
`;
export const PLink2 = styled.div`
  padding: 15px;
  background: #333;
  color: ${colors.primary};
  font-size: 1.5rem;
  transition: all 0.3s ease;
  text-align: center;
`;
