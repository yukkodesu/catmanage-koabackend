import Koa from "koa";
import { bodyParser } from "@koa/bodyparser";
import { dbConnect } from "./db/sequelize";

import cookieParser from "./middleware/cookieParser";
import auth from "./middleware/auth";
import UserRoutes from "./routes/user.router";
import AuthRoutes from "./routes/auth.router";

const app = new Koa();
dbConnect();
app.use(bodyParser());
app.use(cookieParser);
app.use(AuthRoutes.routes());

app.use(auth);
app.use(UserRoutes.routes());

app.use((ctx, next) => {
  ctx.body = "sequlize webapi test project";
});
app.listen(3000);
