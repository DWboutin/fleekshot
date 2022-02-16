export interface SignUpFormIntl {
  signUpForm: {
    title: string;
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
    button: {
      submit: string;
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

export enum SignUpFormIntlId {
  signUpForm_title = "signUpForm_title",
  signUpForm_input_name_label = "signUpForm_input_name_label",
  signUpForm_input_username_label = "signUpForm_input_username_label",
  signUpForm_input_password_label = "signUpForm_input_password_label",
  signUpForm_input_confirmPassword_label = "signUpForm_input_confirmPassword_label",
  signUpForm_button_submit = "signUpForm_button_submit",
  signUpForm_errors_tooShort = "signUpForm_errors_tooShort",
  signUpForm_errors_tooLong = "signUpForm_errors_tooLong",
  signUpForm_errors_isRequired = "signUpForm_errors_isRequired",
  signUpForm_errors_notStrongEnough = "signUpForm_errors_notStrongEnough",
  signUpForm_errors_mismatch = "signUpForm_errors_mismatch",
}

export interface SignUpFormIntlFlatten
  extends Record<SignUpFormIntlId, string> {}
