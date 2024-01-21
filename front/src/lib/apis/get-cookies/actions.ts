import { getCookiesProxyEndpoint } from '../proxyConfig';
/* eslint @typescript-eslint/no-explicit-any: 0 */
export const getCookiesAction = async (): Promise<any> => {
  let data = null;
  try {
    const res = await fetch(getCookiesProxyEndpoint());
    console.log('res: ', res);
    data = await res.json();
    console.log('data: ', data);
  } catch (err) {
    console.error('Error during login attempt:', err);
  }

  return data;
};
