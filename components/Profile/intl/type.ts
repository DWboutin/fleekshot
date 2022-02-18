export interface ProfileIntl {
  profile: {
    title: string;
    uploadPicture: string;
  };
}

export enum ProfileIntlId {
  profile_title = "profile_title",
  profile_uploadPicture = "profile_uploadPicture",
}

export interface ProfileIntlFlatten extends Record<ProfileIntlId, string> {}
