/* 动态相关中间件 */
const fs = require("fs");
const fileService = require("../service/file.service");
const momentService = require("../service/moment.service");
const { PICTURE_PATH } = require("../constants/file-path");
class MomentController {
  async create(ctx, next) {
    // 1.获取数据
    const userId = ctx.user.id;
    const content = ctx.request.body.content;
    console.log(userId, content);
    // 将数据插入到数据库中
    const result = await momentService.create(userId, content);

    ctx.body = result;
  }
  // 获取单个动态
  async detail(ctx, next) {
    // 1.获取数据(momentId)
    const momentId = ctx.params.momentId;
    // 根据id查询数据
    const result = await momentService.getMomentById(momentId);
    ctx.body = result;
  }
  // 获取动态列表
  async list(ctx, next) {
    // 1.获取数据(offset/size)
    const { offset, size } = ctx.query;

    // 2.查询列表
    const result = await momentService.getMomentList(offset, size);
    ctx.body = result;
  }
  // 更新动态
  async update(ctx, next) {
    const { momentId } = ctx.params;
    const { content } = ctx.request.body;
    const result = await momentService.update(content, momentId);
    ctx.body = result;
  }
  // 删除动态
  async remove(ctx, next) {
    // 1.获取要删除的动态的id
    const { momentId } = ctx.params;
    const result = momentService.remove(momentId);
    ctx.body = result;
  }
  async addLabels(ctx, next) {
    const { labels } = ctx;
    const { momentId } = ctx.params;
    // 添加所有的变迁
    for (let label of labels) {
      // 判断标签是否已经和动态有关系了
      const isExist = await momentService.hasLabel(momentId, label.id);
      if (!isExist) {
        await momentService.addLabel(momentId, label.id);
      }
    }
    ctx.body = "给动态添加标签成功";
  }
  async fileInfo(ctx, next) {
    let { filename } = ctx.params;
    const fileRes = await fileService.getFileByFilename(filename);
    const { type } = ctx.query;
    console.log(type);
    const types = ["small", "middle", "large"];

    if (types.some((item) => item === type)) {
      filename = filename + "-" + type;
    }
    ctx.response.set("content-type", fileRes.mimetype);
    ctx.body = fs.createReadStream(`${PICTURE_PATH}/${filename}`);
  }
}
module.exports = new MomentController();
