const app = require("./app");
const config = require("./app/config");
require("./app/database"); //加载一下数据库
app.listen(config.APP_PORT, () => {
  console.log(`服务器在${config.APP_PORT}启动成功`);
});
