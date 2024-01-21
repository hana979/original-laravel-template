const OK_STATUS: number = 200;
const CREATED_STATUS: number = 201;
const BAD_REQUEST_ERROR_STATUS: number = 400;
const UNAUTHENTICATED_ERROR_STATUS: number = 401;
const FORBIDDEN_ERROR_STATUS: number = 403;
const NOT_FOUND_ERROR_STATUS: number = 404;
const VALIDATION_ERROR_STATUS: number = 422;
const SERVER_ERROR_STATUS: number = 500;
export const httpStatus = {
  OK_STATUS,
  CREATED_STATUS,
  BAD_REQUEST_ERROR_STATUS,
  UNAUTHENTICATED_ERROR_STATUS,
  FORBIDDEN_ERROR_STATUS,
  NOT_FOUND_ERROR_STATUS,
  VALIDATION_ERROR_STATUS,
  SERVER_ERROR_STATUS,
};

// Auth
export const loginEndpoint = () => `${process.env.API_END_POINT}/${process.env.API_VERSION}/login`;
export const logoutEndpoint = () => `${process.env.API_END_POINT}/${process.env.API_VERSION}/logout`;
export const loginUserEndpoint = () => `${process.env.API_END_POINT}/${process.env.API_VERSION}/me`;
export const registerEndpoint = () => `${process.env.API_END_POINT}/${process.env.API_VERSION}/register`;
// Home
export const homeEndpoint = () => `${process.env.API_END_POINT}/${process.env.API_VERSION}/home`;
