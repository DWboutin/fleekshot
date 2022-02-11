import storageService from "../storageService";

const A_KEY = "a_key";
const A_VALUE = "a_value";

describe("storageService", () => {
  beforeEach(() => {
    jest.spyOn(window.localStorage, "setItem");
    jest.spyOn(window.localStorage, "getItem");
    jest.spyOn(window.localStorage, "clear");
    jest.spyOn(window.localStorage, "removeItem");

    storageService.clear();
  });
  describe("get", () => {
    it("should call localStorage.getItem", () => {
      storageService.get(A_KEY);

      expect(window.localStorage.getItem).toHaveBeenCalled();
    });

    it("should return a value for a key when one is set", () => {
      storageService.set(A_KEY, A_VALUE);
      const result = storageService.get(A_KEY);

      expect(result).toBe(A_VALUE);
    });

    it("should return null when no value is set", () => {
      const result = storageService.get(A_KEY);

      expect(result).toBe(null);
    });
  });

  describe("set", () => {
    it("should call localStorage.setItem", () => {
      storageService.set(A_KEY, A_VALUE);
      expect(localStorage.setItem).toHaveBeenCalledWith(
        A_KEY,
        JSON.stringify(A_VALUE)
      );
    });
  });

  describe("remove", () => {
    it("should call localStorage.removeItem", () => {
      storageService.remove(A_KEY);
      expect(localStorage.removeItem).toHaveBeenCalledWith(A_KEY);
    });
  });

  describe("clear", () => {
    it("should call localStorage.clear", () => {
      storageService.clear();
      expect(localStorage.clear).toHaveBeenCalled();
    });
  });
});
