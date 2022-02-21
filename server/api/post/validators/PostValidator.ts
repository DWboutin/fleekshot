import postCreationSchema from "../../../../validations/postCreationSchema";
import DataValidator from "../../../validator/DataValidator";
import { PostData } from "../dto/PostDTO";

class PostValidator {
  public async validatePostData(postData: PostData) {
    const validator = new DataValidator<PostData>(postCreationSchema);

    const validatedData = await validator.validate(postData, {
      abortEarly: false,
    });

    return validatedData;
  }
}

export default PostValidator;
