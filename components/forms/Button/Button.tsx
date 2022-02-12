import React, { ReactNode } from "react";
import styled from "styled-components";

import { ThemeContainer } from "../../../styles/styles";
import { toREM } from "../../../styles/typography";

interface ContainerProps {}

const Container = styled.button<ContainerProps>`
  font-size: ${toREM(14)};
  border: 0;
  padding: 5px 9px;
  font-weight: 600;

  ${({ theme }: ThemeContainer) => `
    background-color: ${theme.forms.button.bg};
    border-radius: ${theme.forms.button.borderRadius};
    color: ${theme.forms.button.color};
  `}

  &:hover {
    background-color: ${({ theme }: ThemeContainer) =>
      theme.forms.button.hoverBg};
  }
  &:active {
    background-color: ${({ theme }: ThemeContainer) =>
      theme.forms.button.activeBg};
  }
`;

export type ButtonTypes = "submit" | "button";

export interface Props {
  children: ReactNode;
  type?: ButtonTypes;
}

const Button: React.VoidFunctionComponent<Props> = ({
  children,
  type = "button",
}) => {
  return <Container type={type}>{children}</Container>;
};

export default Button;
