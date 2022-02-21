import React, { useEffect, useRef } from "react";
import { useIntl } from "react-intl";
import styled from "styled-components";
import { ThemeContainer } from "../../../../styles/styles";
import { toREM } from "../../../../styles/typography";
import Boxicon from "../../../BoxIcons/BoxIcons";
import { useTextField } from "../hooks/useTextField";

interface ContainerProps extends ThemeContainer {
  isFocused: boolean;
  hasValue: boolean;
}

export type TextFieldTypes = "email" | "password" | "text";

export const Container = styled.div<ContainerProps>`
  display: flex;
  flex: 1;
  flex-direction: row;
  position: relative;
  height: 36px;
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

    & > span:first-child {
      transform-origin: left;
      transition: transform ease-out 0.1s, -webkit-transform ease-out 0.1s;
      z-index: 3;

      ${({ isFocused, hasValue }: ContainerProps) =>
        (isFocused || hasValue) &&
        `
        transform: scale(0.7) translateY(-14px);
      `}
    }
  }
`;

const LabelContainer = styled.span`
  display: inline-block;
  position: absolute;
  left: 8px;
  height: 100%;
  cursor: text;
  height: 36px;
  line-height: 36px;
  ${({ theme }: ThemeContainer) => `
    color: ${theme.forms.textField.label};
  `}
  z-index: 1;
`;

const Input = styled.input`
  flex: 1;
  padding: 12px 8px 4px;
  font-size: ${toREM(12)};
  height: 36px;
  border: 0px;
  outline: none;
  background: transparent;
  cursor: text;
  z-index: 2;
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

const ErrorIcon = styled.span`
  display: flex;
  align-items: center;
  border: 0;
  background: transparent;
  padding: 5px 5px 3px;
  color: ${({ theme }: ThemeContainer) => theme.forms.errorColor};
`;

export interface Props {
  id: string;
  name: string;
  type: TextFieldTypes;
  label: string;
  value?: string;
  defaultValue?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string | false;
}

const TextField: React.VoidFunctionComponent<Props> = ({
  id,
  name,
  type,
  label,
  value,
  defaultValue,
  onChange,
  error,
}) => {
  const intl = useIntl();
  const {
    selectors: { fieldValue, fieldType, isFocused },
    actions: {
      handleOnChange,
      handleOnBlur,
      handleOnFocus,
      handlePasswordToggle,
    },
  } = useTextField(type, defaultValue);

  return (
    <Container isFocused={isFocused} hasValue={!!value}>
      <label htmlFor={id}>
        <LabelContainer>{label}</LabelContainer>
        <Input
          id={id}
          name={name}
          type={fieldType}
          value={value || fieldValue}
          onChange={onChange || handleOnChange}
          onFocus={handleOnFocus}
          onBlur={handleOnBlur}
          autoComplete="off"
        />
        {!!error && (
          <ErrorIcon title={intl.formatMessage({ id: error })}>
            <Boxicon name="x-circle" size="small" />
          </ErrorIcon>
        )}
        {type === "password" && (
          <PasswordToggle type="button" onClick={handlePasswordToggle}>
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
