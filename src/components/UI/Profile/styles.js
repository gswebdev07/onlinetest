import styled from "styled-components";
import { colors } from "../../../static/colors";

export const Profile = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2rem 0;
`;

export const ImageContent = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: #4786e5;
  overflow: hidden;
  margin:auto 10px
`;
export const Name = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;
  font-weight: 900;
  color: white;
`;

export const CredentialsContent = styled.div`
  display: flex;
  flex-direction: column;
  font-size:1.4rem;
  padding-right:10px;
`;
export const Credential = styled.div`
  color: ${colors.secondary};
`;
