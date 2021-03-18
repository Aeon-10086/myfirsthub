/* app 相关操作 */
// 第三方
const Koa = require("koa");
const bodyParse = require("koa-bodyparser");
// 自己
// const userRouter = require("../router/user.router");
// const authRouter = require("../router/auth.router");
const useRoutes = require("../router");
const errorHandler = require("./error-handle");
// 其他
const app = new Koa();

// 中间件
// 由于此处需要大量重复的注册中间件，因此可以将其抽离到 ./index.js  中
/*用于解析 json 数据 和 x-www-form-urlencoded，两种使用方式相同
app.use(userRouter.routes()); //使用路由
app.use(userRouter.allowedMethods()); //判断当前是否为已经定义的请求方式
app.use(authRouter.routes());
app.use(authRouter.allowedMethods()); */
// 错误处理,由于错误处理函数代码较多，抽离到 ./error-handle.js 中
app.use(bodyParse()); // 解析 body 中的数据
useRoutes(app);
app.on("error", errorHandler);
module.exports = app;
