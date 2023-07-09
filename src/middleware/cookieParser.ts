import Koa from "koa";
export default async (ctx: Koa.Context, next: Koa.Next) => {
  ctx.parsedCookies = ctx.request.header.cookie
    ?.split(";")
    .reduce((prev: {[index: string]:string}, cur) => {
      const [key, value]: Array<string> = cur.trim().split("=");
      prev[key] = value;
      return prev;
    }, {});
  await next();
};
