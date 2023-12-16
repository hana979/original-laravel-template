import { cookies } from 'next/headers';

import { loginEndpoint, httpStatus } from '@/app/api/config';
import { LoginReqestType, LoginResponceType } from '@/app/types/login';

export async function POST(req: LoginReqestType) {
  let data = null;
  try {
    await fetch(`${loginEndpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...req }),
    })
      .then((res) => {
        if (res.status !== httpStatus.OK_STATUS) {
          throw new Error('login failed');
        }

        return res.json();
      })
      .then((resData: LoginResponceType) => {
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
