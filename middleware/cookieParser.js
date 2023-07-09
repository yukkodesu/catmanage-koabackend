module.exports = async (ctx, next) => {
  ctx.parsedCookies = ctx.request.header.cookie
    ?.split(";")
    .reduce((prev, cur) => {
      const [key, value] = cur.trim().split("=");
      prev[key] = value;
      return prev;
    }, {});
  await next();
};
