const Router = require("koa-router");

const momentRouter = new Router({ prefix: "/moment" });
const {
  verifyAuth,
  verifyPermission,
} = require("../middleware/auth.middleware");
const {
  create,
  detail,
  list,
  update,
  remove,
  addLabels,
  fileInfo,
} = require("../controller/moment.controller");
const { verifyLabelExists } = require("../middleware/label.middleware");
momentRouter.post("/", verifyAuth, create); //发表动态
momentRouter.get("/", list); //获取评论列表
momentRouter.get("/:momentId", detail); //获取单个评论

/*
  1.用户必须登录才能修改
  2.用户只能修改自己的评论
*/
// 修改评论
momentRouter.patch("/:momentId", verifyAuth, verifyPermission, update);
// 删除评论
momentRouter.delete("/:momentId", verifyAuth, verifyPermission, remove);

// 给动态添加标签
momentRouter.post(
  "/:momentId/labels",
  verifyAuth,
  verifyPermission,
  verifyLabelExists,
  addLabels
);

// 动态配图的服务
momentRouter.get("/images/:filename", fileInfo);
module.exports = momentRouter;
