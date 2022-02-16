import React from "react";
import { useIntl } from "react-intl";
import styled from "styled-components";
import { useFormik } from "formik";

import { ThemeContainer } from "../../../styles/styles";
import TextField, {
  Container as TextFieldContainer,
} from "../../forms/Textfield/components/TextField";
import userCreationSchema from "../../../validations/userCreationSchema";
import { SignUpFormIntlId } from "../intl/type";
import Button from "../../forms/Button/Button";
import FormContent from "../../Layout/components/FormContent";
import { useSignUpForm } from "../hooks/useSignUpForm";

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

const SignUpForm: React.VoidFunctionComponent<Props> = ({}) => {
  const intl = useIntl();
  const {
    actions: { handleFormSubmit },
  } = useSignUpForm();
  const { values, touched, errors, handleChange, handleSubmit } = useFormik({
    initialValues: {
      name: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: userCreationSchema,
    onSubmit: handleFormSubmit,
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
          id: SignUpFormIntlId.signUpForm_input_name_label,
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
          id: SignUpFormIntlId.signUpForm_input_username_label,
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
          id: SignUpFormIntlId.signUpForm_input_password_label,
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
          id: SignUpFormIntlId.signUpForm_input_confirmPassword_label,
        })}
        error={touched.confirmPassword && errors.confirmPassword}
      />
      <Button type="submit">
        {intl.formatMessage({
          id: SignUpFormIntlId.signUpForm_button_submit,
        })}
      </Button>
    </Form>
  );
};

export default SignUpForm;
