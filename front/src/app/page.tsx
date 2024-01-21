import { getServerSession } from 'next-auth';

import HomePage from '@/components/HomePage';
import { authOptions } from '@/lib/auth';

export default async function Home() {
  const session = await getServerSession(authOptions);
  console.log(session);
  return <HomePage />;
}
