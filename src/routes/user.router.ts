import { getByUid } from '../db/model/User.model';
import Router from '@koa/router';
import Koa from 'koa';

const router = new Router({
  prefix: "/users",
});

router.get("/", (ctx:Koa.Context) => {
  ctx.body = "user get!";
});

router.get("/:uid", async (ctx:Koa.Context, next) => {
  try {
    const user = await getByUid(ctx.params.uid);
    ctx.status = 200;
    ctx.body = JSON.stringify(user);
  } catch (e) {
    if(!(e instanceof Error)) return;
    console.error(e.message);
    ctx.status = 404;
  }
});

router.post("/add", (ctx:Koa.Context) => {
  ctx.body = "user add!";
});

export default router;
