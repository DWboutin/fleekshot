import * as Yup from "yup";
import { SignInFormIntlId } from "../components/SignInForm/intl/type";

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&[\]{}\-_|:;~"'`<>])?.{8,}$/;

const userCreationSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, SignInFormIntlId.signInForm_errors_tooShort)
    .max(50, SignInFormIntlId.signInForm_errors_tooLong)
    .required(SignInFormIntlId.signInForm_errors_isRequired),
  password: Yup.string()
    .min(8, SignInFormIntlId.signInForm_errors_tooShort)
    .max(50, SignInFormIntlId.signInForm_errors_tooLong)
    .matches(passwordRegex, SignInFormIntlId.signInForm_errors_notStrongEnough)
    .required(SignInFormIntlId.signInForm_errors_isRequired),
});

export default userCreationSchema;
