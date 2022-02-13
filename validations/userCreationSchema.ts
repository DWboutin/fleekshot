import * as Yup from "yup";
import { SignupFormIntlId } from "../components/SignupForm/intl/type";

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&[\]{}\-_|:;~"'`<>])?.{8,}$/;

const userCreationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, SignupFormIntlId.signupForm_errors_tooShort)
    .max(50, SignupFormIntlId.signupForm_errors_tooLong)
    .required(SignupFormIntlId.signupForm_errors_isRequired),
  username: Yup.string()
    .min(2, SignupFormIntlId.signupForm_errors_tooShort)
    .max(50, SignupFormIntlId.signupForm_errors_tooLong)
    .required(SignupFormIntlId.signupForm_errors_isRequired),
  password: Yup.string()
    .min(8, SignupFormIntlId.signupForm_errors_tooShort)
    .max(50, SignupFormIntlId.signupForm_errors_tooLong)
    .matches(passwordRegex, SignupFormIntlId.signupForm_errors_notStrongEnough)
    .required(SignupFormIntlId.signupForm_errors_isRequired),
  confirmPassword: Yup.string()
    .oneOf(
      [Yup.ref("password"), null],
      SignupFormIntlId.signupForm_errors_mismatch
    )
    .required(SignupFormIntlId.signupForm_errors_isRequired),
});

export default userCreationSchema;
