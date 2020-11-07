import styled from "styled-components";
import { colors } from "../../../static/colors";

export const Timer = styled.div`
  font-size: 1.6rem;
  font-weight:500;
  color: #21589b;
  display: flex;
  align-items: center;
  margin-left:10px;
  @media screen and (max-width: 700px) {
    & {
      font-size: 1.4rem;
    }
  }
`;
