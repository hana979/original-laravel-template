export const OK_STATUS: number = 200;
export const CREATED_STATUS: number = 201;
export const BAD_REQUEST_ERROR_STATUS: number = 400;
export const UNAUTHENTICATED_ERROR_STATUS: number = 401;
export const FORBIDDEN_ERROR_STATUS: number = 403;
export const NOT_FOUND_ERROR_STATUS: number = 404;
export const VALIDATION_ERROR_STATUS: number = 422;
export const SERVER_ERROR_STATUS: number = 500;

export const loginProxyEndpoint = () => {
  console.log('process.env.PROXY_API_END_POINT: ', process.env.NEXT_PUBLIC_API_PROXY);
  return `${process.env.NEXT_PUBLIC_API_PROXY}/login`;
};
export const logoutProxyEndpoint = () => `${process.env.NEXT_PUBLIC_API_PROXY}/logout`;
export const loginProxyUserEndpoint = () => `${process.env.NEXT_PUBLIC_API_PROXY}/user`;

// export const logout = async (): Promise<boolean> => {
//   try {
//     const logoutRes = await api.post('/api/v1/logout');
//     console.log('logoutRes: ', logoutRes);
//     if (logoutRes.status === OK_STATUS) {
//       console.log('logout complete');
//       return true;
//     }
//   } catch (err) {
//     console.error('Error during logout attempt:', err);
//   }
//   return false;
// };

// export const loginUser = async (): Promise<number> => {
//   try {
//     const loginUserRes = await api.post('/api/v1/me');
//     console.log('loginUserRes: ', loginUserRes);
//     return loginUserRes.status;
//   } catch (err) {
//     console.error('Error during login me:', err);
//     return ERROR_STATUS; // 500 または他の適切なエラーコードを返します。
//   }
// };
