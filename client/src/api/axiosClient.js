import axios from "axios"
import { URL } from './url';

const axiosClient = axios.create({
    baseURL: URL,
    headers: {'Content-Type': 'application/json'}
  });

  axiosClient.interceptors.request.use((req) => {
    if (localStorage.getItem('userInfo')) {
      req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}`;
    }
  
    return req;
  });
export default axiosClient;