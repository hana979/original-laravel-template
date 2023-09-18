'use client';
import { Button, Flex, Heading, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';

import { logout } from '@/lib/apis/auth';
import { useLoginCheck } from '@/lib/hooks/useLoginCheck';

export default function MyPage() {
  useLoginCheck();
  const router = useRouter();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const isSuccess = await logout();
      if (isSuccess) {
        router.push('/login');
      } else {
        console.error('ログアウトに失敗しました');
      }
    } catch (error) {
      console.error('ログアウト処理中にエラーが発生しました', error);
    }
  };

  return (
    <Flex height="100vh" justifyContent="center" alignItems="center">
      <VStack spacing="5">
        <Heading>ログイン成功</Heading>
        <form onSubmit={handleLogout}>
          <VStack alignItems="left">
            <Button marginTop="4" color="white" bg="teal.400" type="submit" paddingX="auto">
              ログアウト
            </Button>
          </VStack>
        </form>
      </VStack>
    </Flex>
  );
}
