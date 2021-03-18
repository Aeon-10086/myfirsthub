/* 用户相关中间件 */
const errorType = require("../constants/error-types");
const service = require("../service/user.service");
const md5password = require("../utils/password-handle");
const verifyUser = async (ctx, next) => {
  let error;
  // 获取用户名和密码
  const { name, password } = ctx.request.body;
  // 判断用户名和密码不为空
  if (!name || !password) {
    error = new Error(errorType.NAME_OR_PASSWORD_IS_REQUIRED);
    return ctx.app.emit("error", error, ctx);
  }
  // 判断用户名不能已存在
  const result = await service.getUserByName(name);
  if (result.length) {
    error = new Error(errorType.USER_ALREADY_EXISTS);
    return ctx.app.emit("error", error, ctx);
  }
  // 为了防止一些异步操作尚未完成就继续执行了下一步，需要添加 await
  await next();
};
const handlePassword = async (ctx, next) => {
  const { password } = ctx.request.body;
  // 对密码进行处理，将处理函数封装到 utils 文件夹中
  ctx.request.body.password = md5password(password);
  await next();
};
module.exports = { verifyUser, handlePassword };
