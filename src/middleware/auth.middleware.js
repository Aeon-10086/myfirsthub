/* 权限验证中间件 */
const jwt = require("jsonwebtoken");
const errorType = require("../constants/error-types");
const userService = require("../service/user.service");
const authService = require("../service/auth.service");
const md5password = require("../utils/password-handle");
const { PUBLIC_KEY } = require("../app/config");
const verifyLogin = async (ctx, next) => {
  let error;
  // 1.获取用户名和密码
  const { name, password } = ctx.request.body;
  // 2.判断用户名和密码是否为空
  if (!name || !password) {
    error = new Error(errorType.NAME_OR_PASSWORD_IS_REQUIRED);
    return ctx.app.emit("error", error, ctx);
  }
  // 3.判断用户是否存在
  const result = await userService.getUserByName(name);
  const user = result[0];
  // console.log("auth!!!!!!!!!!", result);
  if (!result.length) {
    error = new Error(errorType.USER_DOES_NOT_EXISTS);
    return ctx.app.emit("error", error, ctx);
  }
  // 4.判断密码是否和数据库中的密码一致
  if (md5password(password) !== user.password) {
    error = new Error(errorType.PASSWORD_IS_INCORRENT);
    return ctx.app.emit("error", error, ctx);
  }
  ctx.user = user;
  await next();
};

/* 验证权限十分重要
 * 1.很多内容需要验证权限：修改/删除动态； 修改/删除评论
 * 2.接口：业务接口
 *    一对一：user -> role
 *    多对多：role -> menu(删除动态/修改动态)
 */

const verifyAuth = async (ctx, next) => {
  let error;
  console.log("验证授权的middleware~~");
  // 1.获取 token
  const authorization = ctx.headers.authorization;
  if (!authorization) {
    error = new Error(errorType.UNAUTHORIZATION);
    return ctx.app.emit("error", error, ctx);
  }
  const token = authorization.replace("Bearer ", "");

  // 验证token
  try {
    const result = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ["RS256"],
    });
    ctx.user = result; //将用户信息传递
    await next();
  } catch (err) {
    error = new Error(errorType.UNAUTHORIZATION);
    ctx.emit("error", error, ctx);
  }
};
const verifyPermission = async (ctx, next) => {
  console.log("验证许可 Permission 的middleware");
  /* 判断当前用户是否为其请求修改的评论的发表者 */
  // 1.获取参数
  const [resouceKey] = Object.keys(ctx.params);
  const tableName = resouceKey.replace("Id", "");
  const resouceId = ctx.params[resouceKey];
  const userId = ctx.user.id;
  // 2.查询是否具备权限
  try {
    const isPermission = await authService.checkResource(
      tableName,
      resouceId,
      userId
    );
    if (!isPermission) throw new Error("noPermission");
    await next();
  } catch (err) {
    const error = new Error(errorType.UNPERMISSION);
    return ctx.app.emit("error", error, ctx);
  }
};
module.exports = {
  verifyLogin,
  verifyAuth,
  verifyPermission,
};
