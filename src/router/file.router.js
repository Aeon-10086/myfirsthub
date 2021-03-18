const Router = require("koa-router");
const { verifyAuth } = require("../middleware/auth.middleware");
const {
  avatarHandler,
  pictureHandler,
  pictureResize,
} = require("../middleware/file.middleware");
const {
  saveAvatarInfo,
  savePictureInfo,
} = require("../controller/file.controller");
const fileRouter = new Router({ prefix: "/upload" });

// fileRouter.post("/avatar", 中间件(保存图像), 控制器(保存图像的信息));
fileRouter.post("/avatar", verifyAuth, avatarHandler, saveAvatarInfo);
fileRouter.post(
  "/picture",
  verifyAuth,
  pictureHandler,
  pictureResize,
  savePictureInfo
);
module.exports = fileRouter;
