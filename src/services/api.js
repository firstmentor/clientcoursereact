import axios from 'axios';

const API = axios.create({
  baseURL: 'https://servercourseapi.onrender.com/api',
  withCredentials: true, // agar cookies ka use ho raha hai
});

export default API;
