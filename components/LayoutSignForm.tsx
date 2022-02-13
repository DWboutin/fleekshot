import type { NextPage } from "next";
import styled from "styled-components";
import { ThemeContainer } from "../styles/styles";

const Container = styled.div`
  display: flex;
  justify-content: space-around;
`;

const Content = styled.div`
  display: flex;
  width: ${({ theme }: ThemeContainer) => theme.layout.signup.width};
  padding: ${({ theme }: ThemeContainer) => theme.layout.signup.padding};
  justify-content: space-around;
`;

const LayoutSignForm: NextPage = ({ children }) => {
  return (
    <Container>
      <Content>{children}</Content>
    </Container>
  );
};

export default LayoutSignForm;
