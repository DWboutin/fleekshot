import {
  UserComparePassword,
  UserDocument,
  UserFormatted,
  UserSignInData,
  UserSignUpData,
} from "../../dto/UserDTO";
import UserModel, { User } from "../../models/UserModel";
import UserValidator from "../../validators/UserValidator";
import UserFactory from "../../factories/UserFactory";
import UserController from "../UserController";
import ImageOptimizationService, {
  ImagePaths,
} from "../../../../services/ImageOptimizer";
import NoUserException from "../../exceptions/NoUserException";

jest.mock("../../validators/UserValidator");
jest.mock("../../factories/UserFactory");
jest.mock("../../../../services/ImageOptimizer");

describe("UserController", () => {
  const ID = "ID";
  const USER: User = {
    name: "NAME",
    username: "USERNAME",
    password: "PASSWORD",
  };
  const USER_FORMATTED: UserFormatted = {
    id: ID,
    name: "NAME",
    username: "USERNAME",
    profilePicture: "PROFILE PICTURE",
  };
  const USER_DOCUMENT: UserDocument = {
    _id: ID,
    __v: "V",
    name: "NAME",
    username: "USERNAME",
    password: "PASSWORD",
    profilePicture: "PROFILE PICTURE",
  } as UserDocument;
  const ERROR_STATUS_CODE = 500;
  const ERROR = {
    name: "ValidationError",
  };

  const userValidator = new UserValidator();
  const userFactory = new UserFactory({} as any);
  const imageOptimizer = new ImageOptimizationService();
  const userController = new UserController(
    userValidator as any,
    userFactory as any,
    imageOptimizer as any
  );

  const formatErrorResponse = (value: any) => ({
    statusCode: ERROR_STATUS_CODE,
    body: value,
  });

  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();

    userFactory.formatFromDocument = jest.fn().mockImplementation(() => USER);
  });

  describe("create", () => {
    const RAW_USER: UserSignUpData = {
      name: "NAME",
      username: "USERNAME",
      password: "PASSWORD",
      confirmPassword: "PASSWORD",
    };

    describe("valid request", () => {
      beforeEach(() => {
        UserModel.prototype.save = jest.fn().mockResolvedValue(USER_DOCUMENT);
        userValidator.validateSignUpData = jest
          .fn()
          .mockImplementation((value) => Promise.resolve(value));
      });

      it("should create a user", async () => {
        const value = await userController.create(RAW_USER);

        expect(userValidator.validateSignUpData).toHaveBeenCalledWith(RAW_USER);
        expect(userFactory.createFromSignUp).toHaveBeenCalledWith(RAW_USER);
        expect(UserModel.prototype.save).toHaveBeenCalled();
        expect(userFactory.formatFromDocument).toHaveBeenCalledWith(
          USER_DOCUMENT
        );
        expect(value).toEqual(USER);
      });
    });

    describe("on model save error", () => {
      beforeEach(() => {
        UserModel.prototype.save = jest.fn().mockRejectedValue(ERROR);
        userValidator.validateSignUpData = jest
          .fn()
          .mockImplementation((value) => Promise.resolve(value));
      });

      it("should handle the error", async () => {
        let error;

        try {
          await userController.create(RAW_USER);
        } catch (err: any) {
          error = err;
        }

        expect(userValidator.validateSignUpData).toHaveBeenCalledWith(RAW_USER);
        expect(userFactory.createFromSignUp).toHaveBeenCalledWith(RAW_USER);
        expect(UserModel.prototype.save).toHaveBeenCalled();
        expect(error).toEqual(ERROR);
      });
    });

    describe("on validation error", () => {
      beforeEach(() => {
        UserModel.prototype.save = jest.fn().mockResolvedValue(USER_DOCUMENT);
        userValidator.validateSignUpData = jest.fn().mockRejectedValue(ERROR);
      });

      it("should handle the error", async () => {
        let error;

        try {
          await userController.create(RAW_USER);
        } catch (err: any) {
          error = err;
        }

        expect(userValidator.validateSignUpData).toHaveBeenCalledWith(RAW_USER);
        expect(error).toEqual(ERROR);
      });
    });
  });

  describe("signIn", () => {
    const RAW_USER_SIGNIN: UserSignInData = {
      username: "USERNAME",
      password: "PASSWORD",
    };
    const USER_PASSWORD_COMPARE: UserComparePassword = {
      rawPassword: "PASSWORD",
      modelPassword: "PASSWORD",
    };

    beforeEach(() => {
      userFactory.formatPasswordToCompare = jest
        .fn()
        .mockImplementation(() => USER_PASSWORD_COMPARE);

      userValidator.validateSignInData = jest
        .fn()
        .mockImplementation((value) => Promise.resolve(value));

      userValidator.validatePasswordWithModel = jest
        .fn()
        .mockImplementation((value) => Promise.resolve(value));
    });

    describe("valid request", () => {
      beforeEach(() => {
        UserModel.findOne = jest.fn().mockResolvedValue(USER_DOCUMENT);
      });

      it("should find the user with good info", async () => {
        const value = await userController.signIn(RAW_USER_SIGNIN);

        expect(userValidator.validateSignInData).toHaveBeenCalledWith(
          RAW_USER_SIGNIN
        );
        expect(UserModel.findOne).toHaveBeenCalledWith({
          username: RAW_USER_SIGNIN.username,
        });
        expect(userFactory.formatPasswordToCompare).toHaveBeenCalledWith(
          USER_DOCUMENT,
          RAW_USER_SIGNIN.password
        );
        expect(userValidator.validatePasswordWithModel).toHaveBeenCalledWith(
          USER_PASSWORD_COMPARE
        );
        expect(userFactory.formatFromDocument).toHaveBeenCalledWith(
          USER_DOCUMENT
        );
        expect(value).toEqual(USER);
      });
    });

    describe("with empty user", () => {
      beforeEach(() => {
        UserModel.findOne = jest.fn().mockResolvedValue(null);
      });

      it("should not find a user and throw a NoUserException", async () => {
        let error;

        try {
          await userController.signIn(RAW_USER_SIGNIN);
        } catch (err) {
          error = err;
        }

        expect(userValidator.validateSignInData).toHaveBeenCalledWith(
          RAW_USER_SIGNIN
        );
        expect(UserModel.findOne).toHaveBeenCalledWith({
          username: RAW_USER_SIGNIN.username,
        });
        expect(userFactory.formatPasswordToCompare).not.toHaveBeenCalled();
        expect(
          userValidator.validatePasswordWithModel
        ).not.toHaveBeenCalledWith();
        expect(userFactory.formatFromDocument).not.toHaveBeenCalledWith();
        expect(error).toEqual(new NoUserException());
      });
    });

    describe("on validateSignInData error", () => {
      beforeEach(() => {
        userValidator.validateSignInData = jest.fn().mockRejectedValue(ERROR);
        UserModel.findOne = jest.fn().mockResolvedValue(USER_DOCUMENT);
      });

      it("should handle the error", async () => {
        let error;

        try {
          await userController.signIn(RAW_USER_SIGNIN);
        } catch (err: any) {
          error = err;
        }

        expect(error).toEqual(ERROR);
      });
    });
  });

  describe("setProfilePicture", () => {
    const USER_ID = "ID";
    const FILE = {
      filename: "FILENAME",
    } as Express.Multer.File;

    const mockSave = jest.fn().mockResolvedValue(USER_DOCUMENT);

    beforeEach(() => {
      UserModel.findByIdAndUpdate = jest.fn().mockImplementation(() =>
        Promise.resolve({
          save: () => mockSave(),
        })
      );
      UserModel.findById = jest.fn().mockResolvedValue(USER_DOCUMENT);
      imageOptimizer.minifyAvatarImage = jest.fn();
      userFactory.formatFromDocument = jest.fn().mockImplementation(() => USER);
    });

    it("it should handle the request correctly", async () => {
      const value = await userController.setProfilePicture(USER_ID, FILE);

      expect(UserModel.findByIdAndUpdate).toHaveBeenCalledWith(USER_ID, {
        profilePicture: FILE.filename,
      });

      expect(mockSave).toHaveBeenCalled();
      expect(imageOptimizer.minifyAvatarImage).toHaveBeenCalledWith(
        FILE,
        ImagePaths.MinifiedProfilePicture
      );
      expect(UserModel.findById).toHaveBeenCalledWith(USER_ID);
      expect(userFactory.formatFromDocument).toHaveBeenCalledWith(
        USER_DOCUMENT
      );
      expect(value).toEqual(USER);
    });
  });
});
