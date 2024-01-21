'use server';

import { cookies } from 'next/headers';

import { registerEndpoint, httpStatus } from '@/app/api/config';
import { UserRegisterRequestType, UserRegisterResponceType } from '@/types/user';

export async function POST(req: UserRegisterRequestType) {
  let data = null;
  try {
    await fetch(`${registerEndpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...req }),
    })
      .then((res) => {
        if (res.status !== httpStatus.OK_STATUS) {
          console.error('Error during login attempt:', res);
          throw new Error('login failed');
        }

        return res.json();
      })
      .then((resData: UserRegisterResponceType) => {
        console.log('resData: ', resData);
        cookies().set({
          name: `${process.env.COOKIE_AUTH_TOKEN_NAME}`,
          value: resData.access_token,
          httpOnly: true,
          path: '/',
        });
        data = resData;
      });
  } catch (err) {
    console.error('Error during login attempt:', err);
    return Response.json(err);
  }

  return Response.json(data);
}
