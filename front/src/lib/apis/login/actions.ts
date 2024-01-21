import { signIn } from 'next-auth/react';

import { LoginReqestType } from '@/types/login';

import { OK_STATUS } from '../proxyConfig';

export const loginAction = async (loginData: LoginReqestType): Promise<boolean> => {
  let status = null;
  try {
    await signIn('credentials', { ...loginData });
    status = OK_STATUS;
  } catch (error) {
    if ((error as Error).message.includes('CredentialsSignin')) {
      return false
    }
    throw error
  }

  return status === OK_STATUS;
};
