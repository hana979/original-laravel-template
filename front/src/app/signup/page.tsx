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
import { useState } from 'react';
import { useForm } from 'react-hook-form';

// フォームで使用する変数の型を定義
type formInputs = {
  name: string;
  email: string;
  password: string;
  confirm: string;
};

/** サインアップ画面
 * @screenname SignUpScreen
 * @description ユーザの新規登録を行う画面
 */
export default function SignUpScreen() {
  const { handleSubmit, register } = useForm<formInputs>();

  const [password, setPassword] = useState(false);
  const [confirm, setConfirm] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
  });

  const passwordClick = () => setPassword(!password);
  const confirmClick = () => setConfirm(!confirm);

  return (
    <Flex height="100vh" justifyContent="center" alignItems="center">
      <VStack spacing="5">
        <Heading>新規登録</Heading>
        <form onSubmit={onSubmit}>
          <VStack alignItems="left">
            <FormControl>
              <FormLabel htmlFor="name" textAlign="start">
                名前
              </FormLabel>
              <Input id="name" {...register('name')} />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="email" textAlign="start">
                メールアドレス
              </FormLabel>
              <Input id="email" {...register('email')} />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="password">パスワード</FormLabel>
              <InputGroup size="md">
                <Input pr="4.5rem" type={password ? 'text' : 'password'} {...register('password')} />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={passwordClick}>
                    {password ? 'Hide' : 'Show'}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="confirm">パスワード確認</FormLabel>
              <InputGroup size="md">
                <Input pr="4.5rem" type={confirm ? 'text' : 'password'} {...register('confirm')} />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={confirmClick}>
                    {confirm ? 'Hide' : 'Show'}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>

            <Button marginTop="4" color="white" bg="teal.400" type="submit" paddingX="auto">
              新規登録
            </Button>
          </VStack>
        </form>
        <Button as={NextLink} href="/signin" bg="white" width="100%">
          ログインはこちらから
        </Button>
      </VStack>
    </Flex>
  );
}
