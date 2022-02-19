import React from "react";
import { useIntl } from "react-intl";
import styled from "styled-components";
import { useFormik } from "formik";

import { ThemeContainer } from "../../../styles/styles";
import TextField, {
  Container as TextFieldContainer,
} from "../../forms/Textfield/components/TextField";
import Button from "../../forms/Button/Button";
import userSignInSchema from "../../../validations/userSignInSchema";
import { SignInFormIntlId } from "../intl/type";
import { useSignInForm } from "../hooks/useSignInForm";
import MessageBox from "../../forms/MessageBox/MessageBox";

interface ContainerProps {}

const Form = styled.form<ContainerProps>`
  display: flex;
  flex-direction: column;

  ${TextFieldContainer}:not(:last-child) {
    margin-bottom: ${({ theme }: ThemeContainer) =>
      theme.forms.container.fieldMarginBottom};
  }
`;

interface Props {}

const SignInForm: React.VoidFunctionComponent<Props> = ({}) => {
  const intl = useIntl();
  const {
    selectors: {
      isRequested,
      isSuccesful,
      isLoading,
      errorCode,
      requestMessages,
    },
    actions: { handleFormSubmit },
  } = useSignInForm();
  const { values, touched, errors, handleChange, handleSubmit } = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: userSignInSchema,
    onSubmit: handleFormSubmit,
  });

  return (
    <Form onSubmit={handleSubmit}>
      <TextField
        id="username"
        name="username"
        type="text"
        value={values.username}
        onChange={handleChange}
        label={intl.formatMessage({
          id: SignInFormIntlId.signInForm_input_username_label,
        })}
        error={touched.username && errors.username}
      />
      <TextField
        id="password"
        name="password"
        type="password"
        value={values.password}
        onChange={handleChange}
        label={intl.formatMessage({
          id: SignInFormIntlId.signInForm_input_password_label,
        })}
        error={touched.password && errors.password}
      />
      <Button type="submit" disabled={isLoading} isLoading={isLoading}>
        {intl.formatMessage({
          id: SignInFormIntlId.signInForm_button_submit,
        })}
      </Button>
      <MessageBox
        isRequested={isRequested}
        isSuccesful={isSuccesful}
        errorCode={errorCode}
        messages={requestMessages}
      />
    </Form>
  );
};

export default SignInForm;
