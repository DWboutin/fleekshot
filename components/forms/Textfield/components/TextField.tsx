import React from "react";
import styled from "styled-components";
import { ThemeContainer } from "../../../../styles/styles";
import { useTextField } from "../hooks/useTextField";

interface ContainerProps extends ThemeContainer {
  isFocused: boolean;
}

export type TextFieldTypes = "email" | "password" | "text";

const Container = styled.div<ContainerProps>`
  position: relative;
  background-color: ${({ theme }: ThemeContainer) => theme.forms.container.bg};
  border: 1px solid
    ${({ theme }: ThemeContainer) => theme.forms.container.border};
  border-radius: ${({ theme }: ThemeContainer) =>
    theme.forms.container.borderRadius};

  ${({ isFocused, theme }: ContainerProps) =>
    isFocused &&
    `
    border: 1px solid ${theme.forms.container.borderFocus};
    `}
`;

const LabelContainer = styled.span`
  display: block;
  position: absolute;
  padding: ${({ theme }: ThemeContainer) => theme.forms.container.padding};
  color: ${({ theme }: ThemeContainer) => theme.forms.container.label};
`;

const Input = styled.input`
  padding: ${({ theme }: ThemeContainer) => theme.forms.container.padding};
  border: 0px;
  outline: none;
  background: transparent;
`;

interface Props {
  id: string;
  type: TextFieldTypes;
  label: string;
}

const TextField: React.VoidFunctionComponent<Props> = ({ id, type, label }) => {
  const {
    selectors: { value, isFocused },
    actions: { handleOnChange, handleOnBlur, handleOnFocus },
  } = useTextField();

  return (
    <Container isFocused={isFocused}>
      <label htmlFor={id}>
        {!value && <LabelContainer>{label}</LabelContainer>}
        <Input
          type={type}
          value={value}
          onChange={handleOnChange}
          onFocus={handleOnFocus}
          onBlur={handleOnBlur}
        />
      </label>
    </Container>
  );
};

export default TextField;
