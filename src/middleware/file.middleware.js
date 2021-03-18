const Jimp = require("jimp");
const Multer = require("koa-multer");
const path = require("path");
const { AVATAR_PATH, PICTURE_PATH } = require("../constants/file-path");

// 头像上传
const avatarUpload = Multer({
  dest: AVATAR_PATH,
});
// 头像处理
const avatarHandler = avatarUpload.single("avatar");
// 图片上传
const pictureUpload = Multer({
  dest: PICTURE_PATH,
});
const pictureHandler = pictureUpload.array("picture", 9);

const pictureResize = async (ctx, next) => {
  // 1.获取所有的图像信息
  const files = ctx.req.files;
  // 2.对图像进行处理
  /*
    1)第三方库 sharp 的 resize 方法
    2)第三方库 jimp ，体积较小
  */
  for (let file of files) {
    const destPath = path.join(file.destination, file.filename);
    Jimp.read(file.path).then((image) => {
      image.resize(1280, Jimp.AUTO).write(`${destPath}-large`);
      image.resize(640, Jimp.AUTO).write(`${destPath}-middle`);
      image.resize(320, Jimp.AUTO).write(`${destPath}-small`);
    });
  }
  await next();
};

module.exports = { avatarHandler, pictureHandler, pictureResize };
