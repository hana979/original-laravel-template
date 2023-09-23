import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import useSWR from 'swr';

import { loginUserEndpoint } from '../apis/endpoints';
import { fetcher } from '../config';

export const useLoginUser = () => {
  const router = useRouter();
  const { data, error } = useSWR([loginUserEndpoint(), 'get'], fetcher);
  const okStatus = 200;

  useEffect(() => {
    if (data.status && data.status !== okStatus) {
      router.push('/login');
    }
    if (error) {
      router.push('/login');
    }
  }, [router, data, error]);

  return { data, isLoading: !data.status && !error, isError: error };
};
