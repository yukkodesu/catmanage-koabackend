const Router = require("@koa/router");
const User = require("../db/model/User.model");

const router = new Router({
  prefix: "/users",
});

router.get("/", (ctx) => {
  ctx.body = "user get!";
});

router.get("/:uid", async (ctx, next) => {
  try {
    const user = await User.getByUid(ctx.params.uid);
    ctx.status = 200;
    ctx.body = JSON.stringify(user);
  } catch (e) {
    console.error(e.message);
    ctx.status = 404;
  }
});

router.post("/add", (ctx) => {
  ctx.body = "user add!";
});

module.exports = router;
