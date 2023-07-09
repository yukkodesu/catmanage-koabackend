import { createCat, getCatByUid } from "../db/model/Cats/Cat.model";
import Router from "@koa/router";
import Koa from "koa";

const router = new Router({
  prefix: "/cats",
});

router.get("/", (ctx: Koa.Context) => {
  ctx.body = "cat get!";
});

router.get("/:cat_uid", async (ctx: Koa.Context) => {
  try {
    const cat = await getCatByUid(ctx.params.cat_uid);
    if (!cat) throw new Error(`cannot find cat_uid ${ctx.params.cat_uid}`);
    ctx.status = 200;
    ctx.body = JSON.stringify(cat);
  } catch (e) {
    if (!(e instanceof Error)) return;
    console.error(e.message);
    ctx.status = 404;
  }
  return;
});

// router.post("/add", async (ctx: Koa.Context) => {
//   const { username, password } = ctx.request.body;
//   console.log(username, password);
//   const user = await createUser(username, password);
//   console.log(user.dataValues);
//   return;
// });

export default router;
