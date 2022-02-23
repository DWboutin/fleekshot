const API_URL = process.env.API_URL;

class HttpRequestService {
  static async get(endpoint: string) {
    const response = await fetch(`${API_URL}${endpoint}`);

    return response.json();
  }

  static async post(endpoint: string, data: any) {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return response.json();
  }

  static async delete(endpoint: string) {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: "DELETE",
      mode: "cors",
      cache: "no-cache",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    return response.json();
  }

  static async upload(endpoint: string, files: any, data: any = {}) {
    const formData = new FormData();

    Object.keys(files).forEach((filename) => {
      formData.append(filename, files[filename]);
    });

    Object.keys(data).forEach((dataname) => {
      formData.append(dataname, data[dataname]);
    });

    const response = await fetch(`${API_URL}${endpoint}`, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      headers: {
        Accept: "application/json",
      },
      body: formData,
    });

    return response.json();
  }
}

export default HttpRequestService;
