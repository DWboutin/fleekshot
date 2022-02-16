import React, { ReactNode } from "react";
import styled from "styled-components";
import { ThemeContainer } from "../../styles/styles";
import { fonts, fontSizes } from "../../styles/typography";

interface ContainerProps {}

const Container = styled.h1<ContainerProps>`
  margin-top: 0;
  font-size: ${fontSizes.h1};
  font-family: ${fonts.text};
  font-weight: 600;
  color: ${({ theme }: ThemeContainer) => theme.typography.h1.color};
`;

interface Props {
  children: ReactNode;
}

const Title: React.FunctionComponent<Props> = ({ children }) => {
  return <Container>{children}</Container>;
};

export default Title;
