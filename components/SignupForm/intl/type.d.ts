export interface SignupFormIntl {
  signupForm: {
    input: {
      name: {
        label: string;
      };
      username: {
        label: string;
      };
      password: {
        label: string;
      };
      confirmPassword: {
        label: string;
      };
    };
    errors: {
      tooShort: string;
      tooLong: string;
      isRequired: string;
      notStrongEnough: string;
      mismatch: string;
    };
  };
}

export enum SignupFormIntlId {
  signupForm_input_name_label = "signupForm_input_name_label",
  signupForm_input_username_label = "signupForm_input_username_label",
  signupForm_input_password_label = "signupForm_input_password_label",
  signupForm_input_confirmPassword_label = "signupForm_input_confirmPassword_label",
  signupForm_errors_tooShort = "signupForm_errors_tooShort",
  signupForm_errors_tooLong = "signupForm_errors_tooLong",
  signupForm_errors_isRequired = "signupForm_errors_isRequired",
  signupForm_errors_notStrongEnough = "signupForm_errors_notStrongEnough",
  signupForm_errors_mismatch = "signupForm_errors_mismatch",
}

export interface SignupFormIntlFlatten
  extends Record<SignupFormIntlId, string> {}
