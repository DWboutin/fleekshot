import UserFactory from "../UserFactory";
import {
  UserComparePassword,
  UserDocument,
  UserFormatted,
  UserSignUpData,
} from "../../dto/UserDTO";
import { User } from "../../models/UserModel";
import EncryptionServiceImpl from "../../../../services/EncryptionService";

jest.mock("../../../../services/EncryptionService");

describe("UserFactory", () => {
  const RAW_USER_DATA: UserSignUpData = {
    name: "NAME",
    username: "USERNAME",
    password: "PASSWORD",
    confirmPassword: "CONFIRM PASSWORD",
  };
  const USER_DOCUMENT: UserDocument = {
    _id: "ID",
    __v: "V",
    name: "NAME",
    username: "USERNAME",
    password: "PASSWORD",
    profilePicture: "PROFILE_PICTURE",
  } as UserDocument;

  const encryptionService = new EncryptionServiceImpl("hello");
  const userFactory = new UserFactory(encryptionService);

  describe("createFromSignUp", () => {
    const EXPECTED_RESULT: User = {
      name: "NAME",
      password: "encrypted_PASSWORD",
      username: "USERNAME",
    };

    it("should transform UserRawData to User and encrypt password", () => {
      expect(userFactory.createFromSignUp(RAW_USER_DATA)).toEqual(
        EXPECTED_RESULT
      );
      expect(encryptionService.encrypt).toHaveBeenCalledWith(
        RAW_USER_DATA.password
      );
    });
  });

  describe("formatFromDocument", () => {
    const EXPECTED_RESULT: UserFormatted = {
      id: "ID",
      name: "NAME",
      username: "USERNAME",
      profilePicture: "PROFILE_PICTURE",
    };

    it("should transform UserRawData to User and encrypt password", () => {
      expect(userFactory.formatFromDocument(USER_DOCUMENT)).toEqual(
        EXPECTED_RESULT
      );
    });
  });

  describe("formatPasswordToCompare", () => {
    const EXPECTED_RESULT: UserComparePassword = {
      rawPassword: "PASSWORD",
      modelPassword: "decrypted_PASSWORD",
    };

    it("should transform UserRawData to User and encrypt password", () => {
      expect(
        userFactory.formatPasswordToCompare(
          USER_DOCUMENT,
          USER_DOCUMENT.password
        )
      ).toEqual(EXPECTED_RESULT);
      expect(encryptionService.decrypt).toHaveBeenCalledWith(
        USER_DOCUMENT.password
      );
    });
  });
});
