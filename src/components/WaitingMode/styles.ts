import styled from "styled-components";

interface MessageProps {
  isSuccess: boolean;
}

export const Message = styled.h1<MessageProps>`
  color: ${(props) => (props.isSuccess ? "green" : "red")};
`;

export const boxSx = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
};
