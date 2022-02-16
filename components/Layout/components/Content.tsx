import type { NextPage } from "next";
import styled from "styled-components";
import { ThemeContainer } from "../../../styles/styles";

const Container = styled.div`
  min-height: 100vh;
  background-color: ${({ theme }: ThemeContainer) => theme.content.bg};
`;

const Content: NextPage = ({ children }) => {
  return <Container>{children}</Container>;
};

export default Content;
