import { serverKey } from "../config/server.config";
import { createHmac } from "crypto";
export const generateToken = function (uid: string, username: string): string {
  const header = Buffer.from(
    JSON.stringify({
      alg: "HS256",
      typ: "JWT",
    })
  ).toString("base64url");
  const payload = Buffer.from(
    JSON.stringify({
      sub: uid,
      name: username,
      iat: Math.round(Date.now() / 1000),
    })
  ).toString("base64url");
  const sign = createHmac("sha256", serverKey)
    .update(Buffer.from(`${header}.${payload}`))
    .digest("base64url");
  return `${header}.${payload}.${sign}`;
};
export const verifyToken = function (token: string): boolean {
  const [header, payload, sign] = token.split(".");

  const sign_verify = createHmac("sha256", serverKey)
    .update(Buffer.from(`${header}.${payload}`))
    .digest("base64url");
  if (sign_verify !== sign) {
    console.log(`Auth Failed`);
    return false;
  }
  console.log(`Auth Success`);
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
  return JSON.parse(Buffer.from(payload, "base64url").toString());
};
