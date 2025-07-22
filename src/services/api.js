import axios from 'axios';

const API = axios.create({
  baseURL: 'https://servercourseapi.onrender.com/api',
  withCredentials: true, // for cookies
});

export default API;
