class UserFactoryImpl {
  public createFromSignUp = jest.fn();
  public formatFromDocument = jest.fn();
  public formatPasswordToCompare = jest.fn();
}

export default UserFactoryImpl;
