import * as Yup from "yup";
import { SignUpFormIntlId } from "../components/SignUpForm/intl/type";

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&[\]{}\-_|:;~"'`<>])?.{8,}$/;

const userCreationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, SignUpFormIntlId.signUpForm_errors_tooShort)
    .max(50, SignUpFormIntlId.signUpForm_errors_tooLong)
    .required(SignUpFormIntlId.signUpForm_errors_isRequired),
  username: Yup.string()
    .min(2, SignUpFormIntlId.signUpForm_errors_tooShort)
    .max(50, SignUpFormIntlId.signUpForm_errors_tooLong)
    .required(SignUpFormIntlId.signUpForm_errors_isRequired),
  password: Yup.string()
    .min(8, SignUpFormIntlId.signUpForm_errors_tooShort)
    .max(50, SignUpFormIntlId.signUpForm_errors_tooLong)
    .matches(passwordRegex, SignUpFormIntlId.signUpForm_errors_notStrongEnough)
    .required(SignUpFormIntlId.signUpForm_errors_isRequired),
  confirmPassword: Yup.string()
    .oneOf(
      [Yup.ref("password"), null],
      SignUpFormIntlId.signUpForm_errors_mismatch
    )
    .required(SignUpFormIntlId.signUpForm_errors_isRequired),
});

export default userCreationSchema;
