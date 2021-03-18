/* 评论相关处理 */
const service = require("../service/comment.service");
class commentController {
  async create(ctx, next) {
    //评论动态
    const { momentId, content } = ctx.request.body;
    const userId = ctx.user.id;
    const result = await service.create(momentId, content, userId);
    ctx.body = result;
  }
  async reply(ctx, next) {
    //回复评论
    const { momentId, content } = ctx.request.body;
    const { commentId } = ctx.params;
    const userId = ctx.user.id;
    const result = await service.reply(content, momentId, userId, commentId);
    ctx.body = result;
  }
  async update(ctx, next) {
    const { commentId } = ctx.params;
    const { content } = ctx.request.body;
    const result = await service.update(content, commentId);
    ctx.body = result;
  }
  async remove(ctx, next) {
    const { commentId } = ctx.params;
    const result = await service.remove(commentId);
    ctx.body = result;
  }
  async list(ctx, next) {
    const { momentId } = ctx.query;
    const result = await service.getCommentsByMomentId(momentId);
    ctx.body = result;
  }
}
module.exports = new commentController();
