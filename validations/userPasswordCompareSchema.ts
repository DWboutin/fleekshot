import * as Yup from "yup";
import { SignInFormIntlId } from "../components/SignInForm/intl/type";

const userPasswordCompareSchema = Yup.object().shape({
  rawPassword: Yup.string()
    .oneOf(
      [Yup.ref("modelPassword"), null],
      SignInFormIntlId.signInForm_errors_noUser
    )
    .required(),
  modelPassword: Yup.string()
    .oneOf(
      [Yup.ref("rawPassword"), null],
      SignInFormIntlId.signInForm_errors_noUser
    )
    .required(),
});

export default userPasswordCompareSchema;
