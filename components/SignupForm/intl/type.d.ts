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
    };
  };
}

export enum SignupFormIntlId {
  signupForm_input_name_label = "signupForm_input_name_label",
  signupForm_input_username_label = "signupForm_input_username_label",
  signupForm_input_password_label = "signupForm_input_password_label",
}

export interface SignupFormIntlFlatten
  extends Record<SignupFormIntlId, string> {}
