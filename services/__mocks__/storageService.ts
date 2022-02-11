const getMock = jest.fn();
const setMock = jest.fn();
const removeMock = jest.fn();
const clearMock = jest.fn();

const storageService = {
  get: getMock.mockImplementation((key) => {
    let value = window.localStorage.getItem(key);

    try {
      value = JSON.parse(value as string);
      return value;
    } catch (e) {
      console.warn(e); // eslint-disable-line no-console
      return null;
    }
  }),
  set: setMock.mockImplementation((key, value) =>
    window.localStorage.setItem(key, JSON.stringify(value))
  ),
  remove: removeMock.mockImplementation((key) =>
    window.localStorage.removeItem(key)
  ),
  clear: clearMock.mockImplementation(() => window.localStorage.clear()),
};

export default storageService;
