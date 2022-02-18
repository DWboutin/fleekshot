import type { NextPage } from "next";
import styled from "styled-components";
import { ThemeContainer } from "../styles/styles";

const Container = styled.div`
  display: flex;
  min-height: 100vh;
  justify-content: space-around;
  background-color: ${({ theme }: ThemeContainer) => theme.content.bg};
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: ${({ theme }: ThemeContainer) => theme.layout.signup.width};
  padding: ${({ theme }: ThemeContainer) => theme.layout.signup.padding};
`;

const LayoutSignForm: NextPage = ({ children }) => {
  return (
    <Container>
      <Content>{children}</Content>
    </Container>
  );
};

export default LayoutSignForm;
