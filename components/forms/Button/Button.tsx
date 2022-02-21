import React, { forwardRef, ReactNode, SyntheticEvent } from "react";
import styled from "styled-components";

import { ThemeContainer } from "../../../styles/styles";
import { toREM } from "../../../styles/typography";
import Boxicon from "../../BoxIcons/BoxIcons";

interface ContainerProps extends ThemeContainer {
  transparent: boolean;
}

export const Container = styled.button<ContainerProps>`
  position: relative;
  font-size: ${toREM(14)};
  border: 0;
  padding: 5px 9px;
  font-weight: 600;

  ${({ theme, transparent }: ContainerProps) => `
    background-color: ${!transparent ? theme.forms.button.bg : "transparent"};
    border-radius: ${theme.forms.button.borderRadius};
    color: ${
      !transparent ? theme.forms.button.color : theme.post.message.color
    };
  `}

  &>.bx {
    position: absolute;

    top: 5px;
    right: 10px;
  }

  &:hover:not(:disabled) {
    background-color: ${({ theme, transparent }: ContainerProps) =>
      !transparent ? theme.forms.button.hoverBg : "transparent"};
    ${({ theme, transparent }: ContainerProps) =>
      transparent && `color: ${theme.forms.button.bg}`};
  }
  &:active:not(:disabled) {
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
  transparent?: boolean;
}

const Button: React.VoidFunctionComponent<Props> = forwardRef<
  HTMLButtonElement,
  Props
>(
  (
    {
      children,
      type = "button",
      disabled,
      isLoading,
      onClick,
      transparent = false,
    },
    ref
  ) => {
    return (
      <Container
        ref={ref}
        type={type}
        onClick={onClick}
        disabled={disabled}
        transparent={transparent}
      >
        <span>{children}</span>
        {isLoading && <Boxicon name="loader-alt" animation="spin" />}
      </Container>
    );
  }
);
Button.displayName = "Button";

export default Button;
