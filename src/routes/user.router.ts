import { createUser, getUserByUid } from "../db/model/Users/User.model";
import Router from "@koa/router";
import Koa from "koa";
import { getAuthIdentity } from "../utils/cypto.utils";

const router = new Router({
  prefix: "/users",
});

router.get("/", (ctx: Koa.Context) => {
  ctx.body = "user get!";
});

router.get("/:uid", async (ctx: Koa.Context) => {
  const cookie = ctx.parsedCookies;
  const auth_identity = getAuthIdentity(cookie.auth_token);
  try {
    const user = await getUserByUid(ctx.params.uid);
    if (user?.dataValues.uid === auth_identity?.sub) {
      ctx.status = 200;
      ctx.body = JSON.stringify(user);
    } else {
      ctx.status = 401;
    }
  } catch (e) {
    if (!(e instanceof Error)) return;
    console.error(e.message);
    ctx.status = 404;
  }
  return;
});

router.post("/add", async (ctx: Koa.Context) => {
  const { username, password } = ctx.request.body;
  console.log(username, password);
  const user = await createUser(username, password);
  console.log(user.dataValues);
  return;
});

export default router;
