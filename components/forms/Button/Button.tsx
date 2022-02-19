import React, { ReactNode, SyntheticEvent } from "react";
import styled from "styled-components";

import { ThemeContainer } from "../../../styles/styles";
import { toREM } from "../../../styles/typography";
import Boxicon from "../../BoxIcons/BoxIcons";

interface ContainerProps {}

const Container = styled.button<ContainerProps>`
  position: relative;
  font-size: ${toREM(14)};
  border: 0;
  padding: 5px 9px;
  font-weight: 600;

  ${({ theme }: ThemeContainer) => `
    background-color: ${theme.forms.button.bg};
    border-radius: ${theme.forms.button.borderRadius};
    color: ${theme.forms.button.color};
  `}

  &>.bx {
    position: absolute;

    top: 5px;
    right: 10px;
  }

  &:hover:not(:disabled) {
    background-color: ${({ theme }: ThemeContainer) =>
      theme.forms.button.hoverBg};
  }
  &:active {
    background-color: ${({ theme }: ThemeContainer) =>
      theme.forms.button.activeBg};
  }
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

export type ButtonTypes = "submit" | "button";

export interface Props {
  children: ReactNode;
  type?: ButtonTypes;
  disabled?: boolean;
  isLoading?: boolean;
  onClick?: (e: SyntheticEvent<HTMLButtonElement>) => void;
}

const Button: React.VoidFunctionComponent<Props> = ({
  children,
  type = "button",
  disabled,
  isLoading,
  onClick,
}) => {
  return (
    <Container type={type} onClick={onClick} disabled={disabled}>
      <span>{children}</span>
      {isLoading && <Boxicon name="loader-alt" animation="spin" />}
    </Container>
  );
};

export default Button;
