import { ObjectId } from "mongoose";
import NoUserException from "../../user/exceptions/NoUserException";
import UserModel from "../../user/models/UserModel";
import { PostData, PostDocument } from "../dto/PostDTO";
import NoPermissionException from "../exceptions/NoPermissionException";
import { PostFactory } from "../factories/PostFactory";
import PostModel from "../models/PostModel";
import PostValidator from "../validators/PostValidator";

class PostController {
  constructor(
    private validator: PostValidator,
    private postFactory: PostFactory
  ) {}

  public async create(postData: PostData, userId: ObjectId) {
    const user = await UserModel.findById(userId);

    if (user) {
      const validRawData = await this.validator.validatePostData(postData);
      const formattedPostData = this.postFactory.formatRawData(
        validRawData,
        user._id
      );

      const post = await PostModel.create(formattedPostData);

      user.posts.push(post);

      await user.save();

      const newPost = await PostModel.findById(post._id).populate({
        path: "author",
        model: UserModel,
      });

      const formattedPost = this.postFactory.formatFromDocument(
        newPost as PostDocument
      );

      return formattedPost;
    }

    return new NoUserException();
  }

  public async findAll(cursor: number = 0) {
    const limit = 1;

    const posts = await PostModel.find({})
      .sort({ createdAt: -1 })
      .skip(cursor * limit)
      .limit(limit)
      .populate({
        path: "author",
        model: UserModel,
      });

    const postsCount = await PostModel.find({}).count();

    const formattedPosts = posts.map((post) =>
      this.postFactory.formatFromDocument(post)
    );

    return {
      posts: formattedPosts,
      previousCursor: cursor > 0 ? cursor - 1 : null,
      nextCursor: cursor + 1 * limit < postsCount ? cursor + 1 : null,
    };
  }

  public async delete(postId: string, userId: string) {
    const post = await PostModel.findOne({ _id: postId });

    if (post && post.author.toString() === userId) {
      await PostModel.findByIdAndDelete(postId);
      await UserModel.findOneAndUpdate(
        { _id: userId },
        {
          $pullAll: {
            posts: [{ _id: postId }],
          },
        }
      );

      return {};
    }

    throw new NoPermissionException();
  }
}

export default PostController;
