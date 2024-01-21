import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

import { loginEndpoint, httpStatus } from '@/app/api/config';
import { LoginReqestType, LoginResponceType } from '@/types/login';


export async function POST(request: NextRequest) {
  let data: LoginResponceType | null = null;
  try {
    const requestData: LoginReqestType = await request.json();
    const fetchData = await fetch(loginEndpoint(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...requestData }),
    });
    data = await fetchData.json();

    if (!fetchData.ok) {
      throw new Error('login failed');
    }

    if (data && data.access_token && data.expires_at) {
      cookies().set({
        name: `${process.env.COOKIE_AUTH_TOKEN_NAME}`,
        value: data.access_token,
        expires: new Date(data.expires_at).getTime(),
        httpOnly: true,
        path: '/',
      });
    } else {
      throw new Error('login failed no data');
    }

    return NextResponse.json(data, { status: httpStatus.OK_STATUS });
  } catch (err) {
    console.error('Error during login attempt:', err);
    return NextResponse.json(err, { status: httpStatus.SERVER_ERROR_STATUS });
  }
}
