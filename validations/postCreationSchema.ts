import * as Yup from "yup";
import { PostFormIntlId } from "../components/PostForm/intl/type";

const postCreationSchema = Yup.object().shape({
  message: Yup.string()
    .min(2, PostFormIntlId.postForm_errors_tooShort)
    .max(255, PostFormIntlId.postForm_errors_tooLong)
    .required(PostFormIntlId.postForm_errors_isRequired),
  image: Yup.mixed().required(PostFormIntlId.postForm_errors_imageIsRequired),
});

export default postCreationSchema;
