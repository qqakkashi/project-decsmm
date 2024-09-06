type VerifyTimeStamps = { exp: number; iat: number };

export type VerifyReturn<T> = T & VerifyTimeStamps;
