export interface SignInFormIntl {
  signInForm: {
    title: string;
    input: {
      username: {
        label: string;
      };
      password: {
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
      noUser: string;
    };
  };
}

export enum SignInFormIntlId {
  signInForm_title = "signInForm_title",
  signInForm_input_username_label = "signInForm_input_username_label",
  signInForm_input_password_label = "signInForm_input_password_label",
  signInForm_button_submit = "signInForm_button_submit",
  signInForm_errors_tooShort = "signInForm_errors_tooShort",
  signInForm_errors_tooLong = "signInForm_errors_tooLong",
  signInForm_errors_isRequired = "signInForm_errors_isRequired",
  signInForm_errors_notStrongEnough = "signInForm_errors_notStrongEnough",
  signInForm_errors_mismatch = "signInForm_errors_mismatch",
  signInForm_errors_noUser = "signInForm_errors_noUser",
}

export interface SignInFormIntlFlatten
  extends Record<SignInFormIntlId, string> {}
