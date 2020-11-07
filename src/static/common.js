import styled from "styled-components";
import { colors } from "./colors";
import { Link } from "react-router-dom";

export const StyledLink = styled(Link)`
  outline: none;
  height: 100%;
  text-decoration: none;
  color: #aaaaaa;
`;

export const AddButton = styled.button`
  cursor: pointer;
  margin: 2rem;
  padding: 1.5rem 3rem;
  position: relative;
  display: flex;
  align-items: center;
  border: none;
  color: #faf9f9;
  font-size: 1.4rem;
  letter-spacing: 1.6px;
  font-weight: 300;
  background: #333333;
  transition: all 0.2s ease;
  &:hover {
    background: #4786e5;
  }
  & img {
    width: 2rem;
    height: 2rem;
    margin-left: 1rem;
  }
`;

export const Buttons = styled.div`
  position: absolute;
  padding-top: 10px;
  top: 2px;
  right: 2px;
  display: flex;
  z-index: 100;
`;

export const Button = styled.button`
  outline: none;
  margin: 2px;
  overflow: hidden;
  cursor: pointer;
  padding: 2px;
  border: none;
  border-radius: 5px;
  background: none;
  &:hover {
    transform: scale(103%);
    box-shadow: 1px 1px 2px ${colors.secondary};
  }
`;

export const Message = styled.h2`
  padding: 15px;
  text-shadow: none;
  color: #333333;
  text-align: center;
  font-size: 4rem;
  font-weight: 300;
`;
export const Message2 = styled.h2`
  padding: 15px;
  text-shadow: none;
  color: #f5f5f5;
  text-align: center;
  font-size: 2.5rem;
  font-weight: 300;
  background: linear-gradient(to right bottom, #777, #333);
  width: 400px;

  margin: auto;
`;

export const Message3 = styled.p`
  padding: 5px;
  font-size: 20px;
  text-shadow: none;
  color: #333333;
  text-align: center;
  font-size: 4rem;
  font-weight: 300;
`;

// Authenticate forms ...
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-aligh: center;
`;
export const Label = styled.label`
  padding: 15px;
  display: flex;
  flex-direction: column;
  font-size: 20px;
  font-weight: 300;
  color: #333333;
`;
export const SubForm = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: column;
`;
export const FormBtn = styled.button`
  cursor: pointer;
  margin-top: 15px;
  padding: 5px;
  width: 200px;
  height: 45px;
  border: none;

  color: #fff;
  background: #333333;
  font-size: 1.6rem;
  font-weight: 300;
  transition: 0.2s all;
  &:hover {
    background: #4786e5;
  }
`;
export const Input = styled.input``;
