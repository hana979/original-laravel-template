import { DefaultSession } from "next-auth";

declare module "next-auth" {
  // クライアント側で使用するsession（useSessionから取得するオブジェクト）にプロパティを追加します。
  interface Session {
    user: {
      id?: string;
      expiresAt?: string;
      accessToken?: string;
    } & DefaultSession["user"];
  }
  interface User {
    id?: string;
    expiresAt?: string;
    accessToken?: string;
  }
}

declare module "next-auth/jwt" {
  // "jwt"コールバックのtokenパラメータに任意のプロパティを追加します。
  interface JWT {
    id?: string;
    expiresAt?: string;
    accessToken?: string;
  }
}