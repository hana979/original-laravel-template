import { HomeResponceType } from '@/types/home';

import { homeProxyEndpoint } from '../proxyConfig';

export const homeAction = async (): Promise<HomeResponceType | null> => {
  let data = null;
  try {
    const res = await fetch(homeProxyEndpoint());
    data = await res.json();
    data['status'] = res.status;
  } catch (err) {
    console.error('Error during login attempt:', err);
  }

  return data;
};
