import styled from "styled-components";
import { colors } from "../../../static/colors";

export const Bookmark = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: space-between;
  background: #333;
  border-radius: 15px;
  padding: 15px;
  margin: 15px 0;
  transition: all 0.2s ease;
`;

export const BookmarkTitle = styled.div`
  font-size: 2rem;
  font-weight: 300;
  cursor: pointer;
  color: #f7f7f7;
  @media screen and (max-width: 700px) {
    & {
      font-size: 16px;
    }
  }
`;

export const DeleteBtn = styled.div`
  cursor: pointer;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${colors.primary};
  &:hover {
    transform: scale(105%);
  }
`;
