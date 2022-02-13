import React from "react";
import { useIntl } from "react-intl";
import styled from "styled-components";
import { useFormik } from "formik";

import { ThemeContainer } from "../styles/styles";
import TextField, {
  Container as TextFieldContainer,
} from "./forms/Textfield/components/TextField";
import userCreationSchema from "../validations/userCreationSchema";
import { SignUpFormIntlId } from "./SignUpForm/intl/type";
import Button from "./forms/Button/Button";
import { SignInFormIntlId } from "./SignInForm/intl/type";

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

const SignInForm: React.VoidFunctionComponent<Props> = ({}) => {
  const intl = useIntl();
  const { values, touched, errors, handleChange, handleSubmit } = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: userCreationSchema,
    onSubmit: async (values) => {
      console.log(values);
    },
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
      <Button type="submit">Submit</Button>
    </Form>
  );
};

export default SignInForm;
