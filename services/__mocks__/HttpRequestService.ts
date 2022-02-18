const API_URL = process.env.API_URL;

class HttpRequestService {
  static get = jest.fn();
  static post = jest.fn();
  static upload = jest.fn();
}

export default HttpRequestService;
