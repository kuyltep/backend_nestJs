import axios from 'axios';

export const instance = axios.create({
  baseURL: 'http://85.21.8.81:8989',
  timeout: 1000,
  headers: { 'X-Custom-Header': 'foobar' },
});
