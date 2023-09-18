import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { loginCheck } from '../apis/auth';

export const useLoginCheck = () => {
  const router = useRouter();
  const okStatus = 200;

  useEffect(() => {
    const checkLoginStatus = async () => {
      const status = await loginCheck();
      if (status !== okStatus) {
        router.push('/login');
      }
    };

    checkLoginStatus();
  }, [router]);
};
