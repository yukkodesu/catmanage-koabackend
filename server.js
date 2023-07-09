const sequelize = require("./db/sequelize");
const Koa = require("koa");
const bodyParser = require("@koa/bodyparser").bodyParser;

const UserRoutes = require("./routes/user.router");
const AuthRoutes = require("./routes/auth.router");
const auth = require("./middleware/auth");
const cookieParser = require("./middleware/cookieParser");

const app = new Koa();
app.use(bodyParser());
app.use(cookieParser);
app.use(AuthRoutes.routes());

app.use(auth);
app.use(UserRoutes.routes());

app.use((ctx, next) => {
  ctx.body = "sequlize webapi test project";
});
app.listen(3000);
