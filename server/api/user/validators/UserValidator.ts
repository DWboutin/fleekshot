import userCreationSchema from "../../../../validations/userCreationSchema";
import userPasswordCompareSchema from "../../../../validations/userPasswordCompareSchema";
import userSignInSchema from "../../../../validations/userSignInSchema";
import DataValidator from "../../../validator/DataValidator";
import {
  UserComparePassword,
  UserSignInData,
  UserSignUpData,
} from "../dto/UserDTO";

class UserValidator {
  public async validateSignUpData(userSignUpData: UserSignUpData) {
    const validator = new DataValidator<UserSignUpData>(userCreationSchema);

    const validatedData = await validator.validate(userSignUpData);

    return validatedData;
  }

  public async validateSignInData(userSignInData: UserSignInData) {
    const validator = new DataValidator<UserSignInData>(userSignInSchema);

    const validatedData = await validator.validate(userSignInData);

    return validatedData;
  }

  public async validatePasswordWithModel(
    userComparePassword: UserComparePassword
  ) {
    try {
      const validator = new DataValidator<UserComparePassword>(
        userPasswordCompareSchema
      );

      await validator.validate(userComparePassword);

      return true;
    } catch (err) {
      return false;
    }
  }
}

export default UserValidator;
