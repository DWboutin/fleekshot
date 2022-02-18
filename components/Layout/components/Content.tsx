import type { NextPage } from "next";
import styled from "styled-components";
import { ThemeContainer } from "../../../styles/styles";

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  min-height: 100vh;
  background-color: ${({ theme }: ThemeContainer) => theme.content.bg};
`;

const Centered = styled.div`
  display: flex;
  flex-direction: column;
  width: ${({ theme }: ThemeContainer) => theme.layout.page.width};
  padding: ${({ theme }: ThemeContainer) => theme.layout.signup.padding};
`;

const Content: NextPage = ({ children }) => {
  return (
    <Container>
      <Centered>{children}</Centered>
    </Container>
  );
};

export default Content;
