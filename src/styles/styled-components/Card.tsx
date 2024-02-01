import { styled } from "styled-components";

export const Card = styled.div<{ $inputColor?: string }>`
  background: ${(props) => props.$inputColor || "gray"};
  color: #f7f7f7;
  border-radius: 8px;
  -webkit-box-shadow: 0 1px 2.94px 0.06px rgba(4, 26, 55, 0.16);
  box-shadow: 0 1px 2.94px 0.06px rgba(4, 26, 55, 0.16);
  border: none;
  margin-bottom: 10px;
  padding: 20px;
  -webkit-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
  text-align: center;
`;
