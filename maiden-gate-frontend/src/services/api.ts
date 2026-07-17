import axios from "axios";

import { getApiUrl } from "./apiUrl";

const api = axios.create({
  baseURL: getApiUrl(),
});

export default api;
