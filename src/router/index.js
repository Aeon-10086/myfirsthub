const fs = require("fs");

/* 循环遍历列表中非 index 的文件并注册使用中间件 */
const useRoutes = (app) => {
  fs.readdirSync(__dirname).forEach((file) => {
    if (file === "index.js") return;
    const router = require(`./${file}`);
    app.use(router.routes());
    app.use(router.allowedMethods());
  });
};

module.exports = useRoutes;
