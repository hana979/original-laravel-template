import axios from 'axios';

const api = axios.create({
  baseURL: process.env.API_END_POINT,
  withCredentials: true,
});

export const fetcher = async (type: string = 'get', url: string) => {
  let response = null;

  switch (type) {
    case 'get':
      response = await api.get(url);
      break;
    case 'post':
      response = await api.post(url);
      break;
    default:
      response = await api.get(url);
      break;
  }

  return response.data;
};
