import Cryptr from "cryptr";

export interface EncryptionService {
  encrypt(value: string): string;
  decrypt(value: string): string;
}

class EncryptionServiceImpl implements EncryptionService {
  private encryptor;

  constructor(secretKey: string) {
    this.encryptor = new Cryptr(secretKey);
  }

  encrypt(value: string) {
    return this.encryptor.encrypt(value);
  }

  decrypt(value: string) {
    return this.encryptor.decrypt(value);
  }
}

export default EncryptionServiceImpl;
