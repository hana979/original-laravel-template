export const dynamic = 'force-dynamic';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
  const cookieStore = cookies();
  const token = cookieStore.get(`${process.env.COOKIE_AUTH_TOKEN_NAME}`);
  console.log('token: ', token?.value);
  return NextResponse.json({ ...token });
}
