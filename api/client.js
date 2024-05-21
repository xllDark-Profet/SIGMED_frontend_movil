import axios from 'axios';
import { API_URL } from '@env';

const client = axios.create({baseURL: API_URL});
//const client = axios.create({ baseURL: 'http://10.0.2.2:8000' });

client.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log('Error:', error.message);
    throw error;
  }
);

export default client;
