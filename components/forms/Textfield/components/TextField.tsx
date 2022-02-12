import React, { useRef } from "react";
import styled from "styled-components";
import { ThemeContainer } from "../../../../styles/styles";
import Boxicon from "../../../BoxIcons/BoxIcons";
import { useTextField } from "../hooks/useTextField";

interface ContainerProps extends ThemeContainer {
  isFocused: boolean;
}

export type TextFieldTypes = "email" | "password" | "text";

export const Container = styled.div<ContainerProps>`
  display: flex;
  flex: 1;
  flex-direction: row;
  position: relative;
  cursor: text;
  ${({ theme }: ThemeContainer) => `
    background-color: ${theme.forms.textField.bg};
    border: 1px solid ${theme.forms.textField.border};
    border-radius: ${theme.forms.textField.borderRadius};
  `}

  ${({ isFocused, theme }: ContainerProps) =>
    isFocused &&
    `
      border: 1px solid ${theme.forms.textField.borderFocus};
    `}

  &>label {
    display: flex;
    flex: 1;
  }
`;

const LabelContainer = styled.span`
  display: block;
  position: absolute;
  cursor: text;
  ${({ theme }: ThemeContainer) => `
    padding: ${theme.forms.textField.padding};
    color: ${theme.forms.textField.label};
  `}
`;

const Input = styled.input`
  flex: 1;
  padding: ${({ theme }: ThemeContainer) => theme.forms.textField.padding};
  border: 0px;
  outline: none;
  background: transparent;
`;

const PasswordToggle = styled.button`
  display: flex;
  align-items: center;
  border: 0;
  background: transparent;
  padding: 5px 5px 3px;
  cursor: pointer;
  color: ${({ theme }: ThemeContainer) => theme.forms.textField.label};
`;

export interface Props {
  id: string;
  name: string;
  type: TextFieldTypes;
  label: string;
  defaultValue?: string;
}

const TextField: React.VoidFunctionComponent<Props> = ({
  id,
  name,
  type,
  label,
  defaultValue,
}) => {
  const ref = useRef();
  const {
    selectors: { value, fieldType, isFocused },
    actions: {
      handleOnChange,
      handleOnBlur,
      handleOnFocus,
      handlePasswordToggle,
    },
  } = useTextField(type, defaultValue);

  return (
    <Container isFocused={isFocused}>
      <label htmlFor={id}>
        {!value && <LabelContainer>{label}</LabelContainer>}
        <Input
          ref={ref}
          id={id}
          name={name}
          type={fieldType}
          value={value}
          onChange={handleOnChange}
          onFocus={handleOnFocus}
          onBlur={handleOnBlur}
        />
        {type === "password" && (
          <PasswordToggle onClick={handlePasswordToggle}>
            <Boxicon
              name={fieldType === "password" ? "hide" : "show"}
              size="small"
            />
          </PasswordToggle>
        )}
      </label>
    </Container>
  );
};

export default TextField;
