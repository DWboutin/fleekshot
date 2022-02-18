import * as Yup from "yup";

const userAvatarSchema = Yup.object().shape({
  avatar: Yup.array().min(1, "select at least 1 file"),
});

export default userAvatarSchema;
