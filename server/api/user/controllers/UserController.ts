import { UserSignInData, UserSignUpData } from "../dto/UserDTO";
import { UserFactory } from "../factories/UserFactory";

import UserModel from "../models/UserModel";
import UserValidator from "../validators/UserValidator";
import ImageOptimizationService, {
  ImagePaths,
} from "../../../services/ImageOptimizer";
import NoUserException from "../exceptions/NoUserException";

class UserController {
  constructor(
    private validator: UserValidator,
    private userFactory: UserFactory,
    private imageOptimizer: ImageOptimizationService
  ) {}

  public async create(userSignUpData: UserSignUpData) {
    const validRawData = await this.validator.validateSignUpData(
      userSignUpData
    );

    const userData = this.userFactory.createFromSignUp(validRawData);
    const user = new UserModel(userData);

    const result = await user.save();
    const formattedUser = this.userFactory.formatFromDocument(result);

    return formattedUser;
  }

  public async signIn(userSignInData: UserSignInData) {
    const validRawData = await this.validator.validateSignInData(
      userSignInData
    );

    const user = await UserModel.findOne({
      username: validRawData.username,
    });

    if (user) {
      const userPasswordCompare = this.userFactory.formatPasswordToCompare(
        user,
        validRawData.password
      );
      const isPasswordValid = await this.validator.validatePasswordWithModel(
        userPasswordCompare
      );

      if (isPasswordValid) {
        const formattedUser = this.userFactory.formatFromDocument(user);

        return formattedUser;
      }
    }

    throw new NoUserException();
  }

  public async setProfilePicture(userId: string, file: Express.Multer.File) {
    const user = await UserModel.findByIdAndUpdate(userId, {
      profilePicture: file.filename,
    });

    if (user) {
      await user.save();

      await this.imageOptimizer.minifyAvatarImage(
        file,
        ImagePaths.MinifiedProfilePicture
      );

      const updatedUser = await UserModel.findById(userId);

      if (updatedUser) {
        return this.userFactory.formatFromDocument(updatedUser);
      }
    }

    return {};
  }
}

export default UserController;
