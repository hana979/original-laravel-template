'use client';
import { Button, Flex, Heading, VStack } from '@chakra-ui/react';
import NextLink from 'next/link';

// import { useLoginUser } from '@/lib/hooks/useLoginUser';

export default function Home() {
  // useLoginUser();

  return (
    <Flex height="100vh" justifyContent="center" alignItems="center">
      <VStack spacing="5">
        <Heading>Home</Heading>
        <VStack alignItems="left">
          <Button as={NextLink} href="/mypage" bg="white" width="100%">
            マイページへ
          </Button>
        </VStack>
      </VStack>
    </Flex>
  );
}
