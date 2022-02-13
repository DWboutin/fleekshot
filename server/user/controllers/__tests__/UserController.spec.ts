import { ObjectSchema } from "yup";
import DataValidator from "../../../validator/DataValidator";
import { UserSignUpData } from "../../dto/UserDTO";
import UserFactoryImpl from "../../factories/UserFactory";
import UserModel, { User } from "../../models/UserModel";
import UserController from "../UserController";

const saveMock = jest.fn();

jest.mock("../../models/UserModel", () => {
  return jest.fn().mockImplementation(() => ({
    save: saveMock,
  }));
});

describe("UserController", () => {
  describe("create", () => {
    const RAW_USER: UserSignUpData = {
      name: "NAME",
      username: "USERNAME",
      password: "PASSWORD",
      confirmPassword: "PASSWORD",
    };
    const USER: User = {
      name: "NAME",
      username: "USERNAME",
      password: "PASSWORD",
    };
    const validateMock = jest.fn((value) => Promise.resolve(value));
    const dataValidator = new DataValidator({
      validate: (value: any) => validateMock(value),
    } as any);
    const userFactory = {
      createFromSignUp: jest.fn().mockReturnValue(USER),
    };
    const userController = new UserController(
      dataValidator as any,
      userFactory as any
    );
    saveMock.mockResolvedValue(USER);

    it("should create a user", async () => {
      const value = await userController.create(RAW_USER);

      expect(validateMock).toHaveBeenCalledWith(RAW_USER);
      expect(userFactory.createFromSignUp).toHaveBeenCalledWith(RAW_USER);
      expect(saveMock).toHaveBeenCalled();
      expect(value).toBe(USER);
    });
  });
});
