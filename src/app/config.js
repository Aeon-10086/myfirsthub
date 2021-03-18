const fs = require("fs");
const path = require("path");
// app相关的一些配置
const dotenv = require("dotenv"); //加载 dotenv 库

// 使用 dotenv 加载 .env 文件
// dotenv 会自动前往 **根目录** 下查找 .env 文件
dotenv.config();
// 该操作会将 .env 中的变量添加到 process.env 对象上
// console.log(process.env.APP_PORT); // 8000

// 公钥和私钥的读取
const PRIVATE_KEY = fs.readFileSync(
  path.resolve(__dirname, "./keys/private.key")
);
const PUBLIC_KEY = fs.readFileSync(
  path.resolve(__dirname, "./keys/public.key")
);
module.exports = {
  APP_HOST,
  APP_PORT,
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_DATABASE,
  MYSQL_USER,
  MYSQL_PASSWORD,
} = process.env;
// 注意此处是为 module.exports 指向的对象添加对象，所以不可以写在前面
module.exports.PRIVATE_KEY = PRIVATE_KEY;
module.exports.PUBLIC_KEY = PUBLIC_KEY;
