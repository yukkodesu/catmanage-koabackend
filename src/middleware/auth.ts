import { verifyToken } from "../utils/cypto.utils";
import Koa from "koa";

export default async (ctx: Koa.Context, next: Koa.Next) => {
  const cookies = ctx.parsedCookies;
  if (cookies?.auth_token && verifyToken(cookies.auth_token)) {
    await next();
  } else {
    ctx.status = 401;
  }
};
