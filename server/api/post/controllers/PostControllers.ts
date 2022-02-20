import { PostData } from "../dto/PostDTO";
import PostModel, { Post } from "../models/PostModel";
import PostValidator from "../validators/PostValidator";

class PostController {
  constructor(private validator: PostValidator) {}

  public async create(postData: PostData) {
    const validRawData = await this.validator.validatePostData(postData);

    const post = new PostModel(validRawData);

    const result = await post.save();
    const formattedUser = this.userFactory.formatFromDocument(result);

    return formattedUser;
  }
}

export default PostController;
