import { serverKey } from "../config/server.config";
import CryptoJS from "crypto-js";
export const generateToken = function (uid: string, username: string): string {
  const header = CryptoJS.enc.Base64.parse(
    JSON.stringify({
      alg: "HS256",
      typ: "JWT",
    })
  );
  const payload = CryptoJS.enc.Base64.parse(
    JSON.stringify({
      sub: uid,
      name: username,
      iat: Date.now().toString(),
    })
  );
  const sign = CryptoJS.HmacSHA256(`${header}.${payload}`, serverKey);
  return `${header}.${payload}.${sign}`;
};
export const verifyToken = function (token: string): boolean {
  const [header, payload, sign] = token.split(".");
  const sign_verify = CryptoJS.HmacSHA256(
    `${header}.${payload}`,
    serverKey
  ).toString();
  if (sign_verify !== sign) return false;
  return true;
};

type AuthIdentityType = {
  sub: string;
  name: string;
  iat: string;
};

export const getAuthIdentity = function (
  token: string
): AuthIdentityType | null {
  const [_, payload] = token.split(".");
  if (!verifyToken(token)) return null;
  return JSON.parse(
    CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(payload))
  );
};
