export type LoginReqestType = {
  email: string;
  password: string;
};

export type LoginResponceType = {
  accessToken: string;
  expiresAt: string;
  id: number;
};
