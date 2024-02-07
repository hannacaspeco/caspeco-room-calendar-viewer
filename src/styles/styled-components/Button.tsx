import { styled } from "styled-components";

export const Button = styled.button<{ $bgColor: string, $textColor: string }>`
  background: ${(props) => props.$bgColor};
  color: ${(props) => props.$textColor};
  border-radius: 30px;
  -webkit-box-shadow: 0 1px 2.94px 0.06px rgba(4, 26, 55, 0.16);
  box-shadow: 0 1px 2.94px 0.06px rgba(4, 26, 55, 0.16);
  border: none;
  padding: 12px;
  -webkit-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
  text-align: center;
  font-weight: 500;

  &:hover {
    opacity: 0.7;
  }
`;
