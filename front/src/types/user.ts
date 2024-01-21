export type UserInfoResponceType = {
  id: number;
  name: string;
  email: string;
  email_verified_at?: string;
  two_factor_secret?: string;
  two_factor_recovery_codes?: string;
  two_factor_confirmed_at?: string;
  created_at: string;
  updated_at: string;
};

export type UserRegisterRequestType = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

export type UserRegisterResponceType = {
  access_token: string;
  expires_at: string;
  id: number;
};
