export type AuthIdentityType = {
  sub: string;
  name: string;
  iat: string;
};
export function generateToken(uid: string, username: string): string;
export function verifyToken(token: string): boolean;
export function getAuthIdentity(token: string): AuthIdentityType | null;
