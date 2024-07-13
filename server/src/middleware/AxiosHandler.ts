import axios from "axios";

class AxiosHandler {
  async get(url: string) {
    let result = await axios.get(url);
    return result;
  }
  async post(url: string, data: object, headers: object) {
    let result = await axios.post(url, data, { headers });
    return result.data;
  }
}

export default new AxiosHandler();
