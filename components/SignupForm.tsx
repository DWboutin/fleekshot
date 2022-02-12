import React from "react";
import { useIntl } from "react-intl";
import styled from "styled-components";
import { useFormik } from "formik";
import * as Yup from "yup";

import { ThemeContainer } from "../styles/styles";
import TextField, {
  Container as TextFieldContainer,
} from "./forms/Textfield/components/TextField";
import signupFormSchema from "./SignupForm/validation/signupFormSchema";
import { SignupFormIntlId } from "./SignupForm/intl/type.d";
import Button from "./forms/Button/Button";

interface ContainerProps {}

const Form = styled.form<ContainerProps>`
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
  const { values, touched, errors, handleChange, handleSubmit } = useFormik({
    initialValues: {
      name: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: signupFormSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <Form onSubmit={handleSubmit}>
      <TextField
        id="name"
        name="name"
        type="text"
        value={values.name}
        onChange={handleChange}
        label={intl.formatMessage({
          id: SignupFormIntlId.signupForm_input_name_label,
        })}
        error={touched.name && errors.name}
      />
      <TextField
        id="username"
        name="username"
        type="text"
        value={values.username}
        onChange={handleChange}
        label={intl.formatMessage({
          id: SignupFormIntlId.signupForm_input_username_label,
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
          id: SignupFormIntlId.signupForm_input_password_label,
        })}
        error={touched.password && errors.password}
      />
      <TextField
        id="confirmPassword"
        name="confirmPassword"
        type="password"
        value={values.confirmPassword}
        onChange={handleChange}
        label={intl.formatMessage({
          id: SignupFormIntlId.signupForm_input_confirmPassword_label,
        })}
        error={touched.confirmPassword && errors.confirmPassword}
      />
      <Button type="submit">Submit</Button>
    </Form>
  );
};

export default SignupForm;
