import styled from "styled-components";

interface CircleContainerProps {
  isRight: boolean;
}

export const CircleContainer = styled.div<CircleContainerProps>`
  display: flex;
  width: 100vw;
  justify-content: ${(props: CircleContainerProps) =>
    props.isRight ? "flex-end" : "flex-start"};
  padding: 24px;
`;

export const Circle = styled.div`
  width: 100px;
  height: 100px;
  background-color: blue;
  border-radius: 50%;
`;
