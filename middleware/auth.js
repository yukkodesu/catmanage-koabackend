const { verifyToken } = require("../utils/cypto.utils");

module.exports = async (ctx, next) => {
  const cookies = ctx.parsedCookies;
  if (cookies?.auth_token && verifyToken(cookies.auth_token)) {
    await next();
  } else {
    ctx.status = 401;
  }
};
