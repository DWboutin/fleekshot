import React from "react";
import { useIntl } from "react-intl";
import styled from "styled-components";
import { ThemeContainer } from "../styles/styles";
import TextField, {
  Container as TextFieldContainer,
} from "./forms/Textfield/components/TextField";
import { SignupFormIntlId } from "./SignupForm/intl/type.d";

interface ContainerProps {}

const Container = styled.div<ContainerProps>`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 20px;
  ${({ theme }: ThemeContainer) => `
    background-color: ${theme.forms.container.bg};
    border: 1px solid ${theme.forms.container.border};
    border-radius: ${theme.forms.container.borderRadius};
  `}

  ${TextFieldContainer}:not(:last-child) {
    margin-bottom: ${({ theme }: ThemeContainer) =>
      theme.forms.container.fieldMarginBottom};
  }
`;

interface Props {}

const SignupForm: React.VoidFunctionComponent<Props> = ({}) => {
  const intl = useIntl();

  return (
    <Container>
      <TextField
        id="name"
        name="name"
        type="text"
        defaultValue="Hello"
        label={intl.formatMessage({
          id: SignupFormIntlId.signupForm_input_name_label,
        })}
      />
      <TextField
        id="username"
        name="username"
        type="text"
        label={intl.formatMessage({
          id: SignupFormIntlId.signupForm_input_username_label,
        })}
      />
      <TextField
        id="password"
        name="password"
        type="password"
        label={intl.formatMessage({
          id: SignupFormIntlId.signupForm_input_name_label,
        })}
      />
    </Container>
  );
};

export default SignupForm;
