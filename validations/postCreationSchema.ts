import * as Yup from "yup";

const postCreationSchema = Yup.object().shape({
  message: Yup.string()
    .min(2, "too short")
    .max(255, "too long")
    .required("is required"),
});

export default postCreationSchema;
