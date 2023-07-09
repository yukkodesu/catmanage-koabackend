const User = require("../db/model/User.model");
const Router = require("@koa/router");
const { generateToken } = require("../utils/cypto.utils");

const router = new Router();

router.post("/login", async (ctx) => {
  // ctx.status = 200;
  const { uid, password } = ctx.request.body;
  try {
    const user = await User.getByUid(uid);
    const {
      uid: uid_db,
      password: password_db,
      username,
    } = user.at(0).dataValues;
    if (uid_db === Number(uid) && password_db === password) {
      ctx.status = 200;
      ctx.cookies.set("auth_token", generateToken(uid_db, username));
      ctx.cookies.set("more_cookie", "123");
      return;
    }
    ctx.status = 403;
  } catch (e) {
    console.error(e);
    ctx.body = e.message;
  }
});

module.exports = router;
