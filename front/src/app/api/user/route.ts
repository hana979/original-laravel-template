import { cookies } from 'next/headers';

import { loginUserEndpoint, httpStatus } from '@/app/api/config';
import { UserInfoResponceType } from '@/types/user';

export async function GET() {
  let data = null;
  try {
    await fetch(`${loginUserEndpoint}`, {
      headers: {
        Authorization: 'Bearer ' + cookies().get(`${process.env.COOKIE_AUTH_TOKEN_NAME}`),
      },
    })
      .then((res) => {
        if (res.status !== httpStatus.OK_STATUS) {
          console.error('Error during login attempt:', res);
          throw new Error('login failed');
        }

        return res.json();
      })
      .then((resData: UserInfoResponceType) => {
        data = resData;
      });
  } catch (err) {
    console.error('Error during login attempt:', err);
    return Response.json(err);
  }

  return Response.json(data);
}
