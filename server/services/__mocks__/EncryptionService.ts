import { EncryptionService } from "../EncryptionService";

class EncryptionServiceImpl implements EncryptionService {
  public encrypt = jest.fn((value: string) => `encrypted_${value}`);
  public decrypt = jest.fn((value: string) => `decrypted_${value}`);
}

export default EncryptionServiceImpl;
