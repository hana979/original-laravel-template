'use client';
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { login, getCookie } from '@/lib/apis/auth';

type formInputs = {
  email: string;
  password: string;
};

export default function Login() {
  const { handleSubmit, register } = useForm<formInputs>();
  const [show, setShow] = useState<boolean>(false);
  const router = useRouter();

  const onSubmit = handleSubmit(async (data) => {
    try {
      await getCookie();
      const isSuccess = await login(data);
      if (isSuccess) {
        router.push('/');
      } else {
        console.error('ログインに失敗しました');
      }
    } catch (error) {
      console.error('ログイン処理中にエラーが発生しました', error);
    }
  });

  return (
    <Flex flexDirection="column" width="100%" height="100vh" justifyContent="center" alignItems="center">
      <VStack spacing="5">
        <Heading>ログイン</Heading>
        <form onSubmit={onSubmit}>
          <VStack spacing="4" alignItems="left">
            <FormControl>
              <FormLabel htmlFor="email" textAlign="start">
                メールアドレス
              </FormLabel>
              <Input id="email" {...register('email')} />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="password">パスワード</FormLabel>
              <InputGroup size="md">
                <Input pr="4.5rem" type={show ? 'text' : 'password'} {...register('password')} />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={() => setShow(!show)}>
                    {show ? 'Hide' : 'Show'}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Button marginTop="4" color="white" bg="teal.400" type="submit" paddingX="auto">
              ログイン
            </Button>
            <Button as={NextLink} bg="white" color="black" href="/signup" width="100%">
              新規登録はこちらから
            </Button>
          </VStack>
        </form>
      </VStack>
    </Flex>
  );
}
