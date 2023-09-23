'use client';
import axios from 'axios';

const okStatus = 200;
const errorStatus = 500;

type LoginData = {
  email: string;
  password: string;
};

const api = axios.create({
  baseURL: process.env.API_END_POINT,
  withCredentials: true,
});

export const getCookieEndpoint = () => '/sanctum/csrf-cookie';
export const loginEndpoint = () => `/api/${process.env.API_VERSION}/login`;
export const logoutEndpoint = () => `/api/${process.env.API_VERSION}/logout`;
export const loginUserEndpoint = () => `/api/${process.env.API_VERSION}/me`;

export const login = async (loginData: LoginData): Promise<boolean> => {
  try {
    const loginRes = await api.post(`/api/${process.env.API_VERSION}/login`, loginData);
    console.log('loginRes: ', loginRes);
    if (loginRes.status === okStatus) {
      console.log('login success');
      return true;
    }
  } catch (err) {
    console.error('Error during login attempt:', err);
    // TODO: エラー処理
  }
  return false;
};

export const logout = async (): Promise<boolean> => {
  try {
    const logoutRes = await api.post('/api/v1/logout');
    console.log('logoutRes: ', logoutRes);
    if (logoutRes.status === okStatus) {
      console.log('logout complete');
      return true;
    }
  } catch (err) {
    console.error('Error during logout attempt:', err);
  }
  return false;
};

export const loginUser = async (): Promise<number> => {
  try {
    const loginUserRes = await api.post('/api/v1/me');
    console.log('loginUserRes: ', loginUserRes);
    return loginUserRes.status;
  } catch (err) {
    console.error('Error during login me:', err);
    return errorStatus; // 500 または他の適切なエラーコードを返します。
  }
};
