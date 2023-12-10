import { LoginReqestType } from '@/app/types/login';

import { BAD_REQUEST_ERROR_STATUS, OK_STATUS, loginProxyEndpoint } from '../proxyConfig';

export const loginAction = async (loginData: LoginReqestType): Promise<boolean> => {
  let status = null;
  try {
    await fetch(loginProxyEndpoint(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...loginData }),
    }).then((res) => {
      status = res.status;
    });
  } catch (err) {
    console.error('Error during login attempt:', err);
    // TODO: エラー処理
    status = BAD_REQUEST_ERROR_STATUS;
  }
  return status === OK_STATUS;
};
