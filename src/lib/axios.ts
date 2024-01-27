import axios from 'axios';

export const AXIOS = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL
});