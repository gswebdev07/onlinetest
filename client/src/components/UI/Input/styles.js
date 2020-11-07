import styled from "styled-components";
import { colors } from "../../../static/colors";

export const InputContainer = styled.div`
  position: relative;
  margin: 10px 0;
  padding: 0 16px;
  width: 100%;
  height: 4.8rem;
  display: flex;
  align-items: center;
  border: 2px solid #333333;
  border-radius: 20px;
  background: ${colors.primary};
`;

export const InputField = styled.input`
  position: relative;
  padding: 12px;
  width: 100%;
  border: none;
  font-size: 1.7rem;
  font-weight: 300;
  color: #333333;
`;
