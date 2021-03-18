/* 用户相关路由操作内容 */
const fs = require("fs");
// 3

// i
const userService = require("../service/user.service");
const fileService = require("../service/file.service");
const { AVATAR_PATH } = require("../constants/file-path");
// 7
class UserController {
  async create(ctx, next) {
    // 获取用户请求传递的参数
    const user = ctx.request.body;
    // 查询数据(该部分抽取到 service/user.service.js 文件中)
    const result = await userService.create(user);
    // 返回数据
    // console.log(result);
    ctx.body = result;
  }
  async avatarInfo(ctx, next) {
    // 1.用户的头像是
    const { userId } = ctx.params;
    const avatarRes = await fileService.getAvatarByUserId(userId);
    console.log(avatarRes);
    // 2.提供图像信息
    ctx.response.set("content-type", avatarRes.mimetype); //如果是希望直接下载文件则不需要此条
    ctx.body = fs.createReadStream(`${AVATAR_PATH}/${avatarRes.filename}`);
  }
}

module.exports = new UserController();
