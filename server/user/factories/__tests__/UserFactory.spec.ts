import UserFactory from "../UserFactory";
import { UserSignupData } from "../../dto/UserDTO";
import { User } from "../../models/UserModel";
import EncryptionServiceImpl from "../../../services/EncryptionService";

jest.mock("../../../services/EncryptionService");

describe("UserFactory", () => {
  it("should transform UserRawData to User and encrypt password", () => {
    const RAW_USER_DATA: UserSignupData = {
      name: "NAME",
      username: "USERNAME",
      password: "PASSWORD",
      confirmPassword: "CONFIRM PASSWORD",
    };
    const EXPECTED_RESULT: User = {
      name: "NAME",
      password: "encrypted_PASSWORD",
      username: "USERNAME",
    };

    const encryptionService = new EncryptionServiceImpl("hello");
    const userFactory = new UserFactory(encryptionService);

    expect(userFactory.createFromSignup(RAW_USER_DATA)).toEqual(
      EXPECTED_RESULT
    );
    expect(encryptionService.encrypt).toHaveBeenCalledWith(
      RAW_USER_DATA.password
    );
  });
});
