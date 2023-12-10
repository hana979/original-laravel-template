export type LoginReqestType = {
  email: string;
  password: string;
};

export type LoginResponceType = {
  access_token: string;
  expires_at: string;
  id: number;
};
