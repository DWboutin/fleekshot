import EncryptionServiceImpl from "../EncryptionService";

const encryptMock = jest.fn((value: string) => `encrypted_${value}`);
const decryptMock = jest.fn((value: string) => `decrypted_${value}`);

jest.mock("cryptr", () => {
  return jest.fn().mockImplementation(() => ({
    encrypt: encryptMock,
    decrypt: decryptMock,
  }));
});

describe("EncryptionService", () => {
  const VALUE = "test";
  const encryptionService = new EncryptionServiceImpl("secretKey");

  describe("encrypt", () => {
    let encryptedValue: string;

    beforeAll(() => {
      encryptedValue = encryptionService.encrypt(VALUE);
    });

    it("should encrypt the value", () => {
      expect(encryptedValue).toBe(`encrypted_${VALUE}`);
    });

    it("should have used cryptr.encrypt", () => {
      expect(encryptMock).toHaveBeenCalledWith(VALUE);
    });
  });

  describe("decrypt", () => {
    let decryptedValue: string;

    beforeAll(() => {
      decryptedValue = encryptionService.decrypt(VALUE);
    });

    it("should encrypt the value", () => {
      expect(decryptedValue).toBe(`decrypted_${VALUE}`);
    });

    it("should have used cryptr.decrypt", () => {
      expect(decryptMock).toHaveBeenCalledWith(VALUE);
    });
  });
});
