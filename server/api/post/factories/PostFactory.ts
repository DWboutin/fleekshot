import { Types } from "mongoose";
import { UserFactory } from "../../user/factories/UserFactory";
import {
  PostCreationData,
  PostData,
  PostDocument,
  PostFormatted,
} from "../dto/PostDTO";

export interface PostFactory {
  formatFromDocument(
    postDocument: PostDocument,
    withAuthor?: boolean
  ): PostFormatted;
  formatRawData(postData: PostData, userId: Types.ObjectId): PostCreationData;
}

class PostFactoryImpl implements PostFactory {
  constructor(private userFactory: UserFactory) {}

  formatRawData(postData: PostData, userId: Types.ObjectId) {
    return {
      image: postData.image.filename,
      author: userId,
      message: postData.message,
    };
  }

  formatFromDocument(postDocument: PostDocument, withAuthor = true) {
    return {
      id: postDocument._id,
      message: postDocument.message,
      createdAt: postDocument.createdAt,
      modifiedAt: postDocument.modifiedAt,
      image: postDocument.image,
      author:
        withAuthor === true
          ? this.userFactory.formatFromDocument(postDocument.author)
          : null,
    };
  }
}

export default PostFactoryImpl;
