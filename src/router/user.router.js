/* 用户路由相关内容 */
// 第三方
const Router = require("koa-router");
// 自己
// 导入用户相关的对象，并从中取出需要使用的方法
const { create, avatarInfo } = require("../controller/user.controller");
const { verifyUser, handlePassword } = require("../middleware/user.middleware");
// 其他
const userRouter = new Router({ prefix: "/users" });

// 由于每个接口对应的内容都写在一个文件中是很多的
// 因此此处仅做注册，处理的主要内容放在 controller/usre.controller.js 中
// 由于拿到用户传入的数据后，往往还需要判断其数据的合理性，通常这些判断会放在另一个 中间件中
// 为了避免此处代码混乱，功能性的代码往往会写在， middleware/user.middleware.js 文件夹中
userRouter.post("/", verifyUser, handlePassword, create);
userRouter.get("/:userId/avatar", avatarInfo);
module.exports = userRouter;
