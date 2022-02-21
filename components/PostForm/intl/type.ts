export interface PostFormIntl {
  postForm: {
    uploadImage: string;
    share: string;
    inputLabel: string;
    errors: {
      tooShort: string;
      tooLong: string;
      isRequired: string;
      imageIsRequired: string;
    };
  };
}

export enum PostFormIntlId {
  postForm_uploadImage = "postForm_uploadImage",
  postForm_share = "postForm_share",
  postForm_inputLabel = "postForm_inputLabel",
  postForm_errors_tooShort = "postForm_errors_tooShort",
  postForm_errors_tooLong = "postForm_errors_tooLong",
  postForm_errors_isRequired = "postForm_errors_isRequired",
  postForm_errors_imageIsRequired = "postForm_errors_imageIsRequired",
}

export interface PostFormIntlFlatten extends Record<PostFormIntlId, string> {}
