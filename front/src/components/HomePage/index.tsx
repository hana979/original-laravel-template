'use client';
import { Button, Flex, Heading, VStack } from '@chakra-ui/react';
import NextLink from 'next/link';
import { signOut } from 'next-auth/react';

export default function HomePage() {
  return (
    <Flex height="100vh" justifyContent="center" alignItems="center">
      <VStack spacing="5">
        <Heading>Home</Heading>
        {/* {newArrivalTopics &&
          newArrivalTopics.map((item) => (
            <Fragment key={item.id}>
              <Text>{item.title}</Text>
              <Text>{item.sammary}</Text>
              <Text>{item.category}</Text>
              <Text>{item.created_at}</Text>
              <Text>{item.updated_at}</Text>
            </Fragment>
          ))} */}
        <VStack alignItems="left">
          <Button as={NextLink} href="/mypage" bg="white" width="100%">
            マイページへ
          </Button>
        </VStack>
        <VStack alignItems="left">
          <Button onClick={() => signOut()} bg="white" width="100%">
            ログアウト
          </Button>
        </VStack>
      </VStack>
    </Flex>
  );
}
