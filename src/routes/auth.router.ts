import { getByUid } from "../db/model/User.model";
import Router from "@koa/router";
import { generateToken } from "../utils/cypto.utils";

const router = new Router();
type LoginBodyType = {
  uid: string;
  password: string;
};
router.post("/login", async (ctx) => {
  // ctx.status = 200;
  const { uid, password }: LoginBodyType = ctx.request.body;
  try {
    const user = await getByUid(uid);
    if (!user) {
      throw new Error("query return object null");
    }
    const {
      uid: uid_db,
      password: password_db,
      username,
    } = user.dataValues;
    if (uid_db === Number(uid) && password_db === password) {
      ctx.status = 200;
      ctx.cookies.set("auth_token", generateToken(uid_db, username));
      ctx.cookies.set("more_cookie", "123");
      return;
    }
    ctx.status = 403;
  } catch (e) {
    if (!(e instanceof Error)) return;
    console.error(e);
    ctx.body = e.message;
  }
});

export default router;
