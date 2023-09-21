'use client';
import axios from 'axios';

const okStatus = 200;
const errorStatus = 500;

type LoginData = {
  email: string;
  password: string;
};

const api = axios.create({
  baseURL: 'http://localhost:9000',
  withCredentials: true,
});

export const getCookie = async (): Promise<void> => {
  try {
    await api.get('/sanctum/csrf-cookie');
  } catch (err) {
    console.error('Error getting CSRF cookie:', err);
  }
};

export const login = async (loginData: LoginData): Promise<boolean> => {
  try {
    const loginRes = await api.post('/api/v1/login', loginData);
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

export const loginCheck = async (): Promise<number> => {
  try {
    const loginCheckRes = await api.post('/api/v1/auth');
    console.log('loginCheckRes: ', loginCheckRes);
    return loginCheckRes.status;
  } catch (err) {
    console.error('Error during login check:', err);
    return errorStatus; // 500 または他の適切なエラーコードを返します。
  }
};
