export const dynamic = 'force-dynamic';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { homeEndpoint, httpStatus } from '@/app/api/config';

export async function GET() {
  let data = null;
  const cookieStore = cookies();
  const token = cookieStore.get(`${process.env.COOKIE_AUTH_TOKEN_NAME}`);
  try {
    const fetchData = await fetch(homeEndpoint(), {
      headers: {
        Authorization: `Bearer ${token?.value}`,
      },
    });
    data = await fetchData.json();

    if (!fetchData.ok) {
      return NextResponse.json(data, { status: fetchData.status });
    }

    return NextResponse.json(data, { status: httpStatus.OK_STATUS });
  } catch (err) {
    console.error('Error during home attempt:', err);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: httpStatus.SERVER_ERROR_STATUS });
  }
}
