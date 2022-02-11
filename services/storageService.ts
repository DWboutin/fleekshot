const storageService = {
  get: <T>(key: string): T | null => {
    if (typeof window === "undefined") {
      return null;
    }

    const value: string | null = localStorage.getItem(key);
    let parsedValue: T;

    try {
      parsedValue = JSON.parse(value as string);
    } catch (e) {
      console.warn(e);
      return null;
    }
    return parsedValue;
  },
  set: <T>(key: string, value: T) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(key, JSON.stringify(value));
    }
  },
  remove: (key: string) => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(key);
    }
  },
  clear: () => {
    if (typeof window !== "undefined") {
      localStorage.clear();
    }
  },
};

export default storageService;
