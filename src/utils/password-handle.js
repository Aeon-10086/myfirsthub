/* 密码处理函数 */
const crypto = require("crypto"); //使用md5需要的库
const md5password = (password) => {
  const md5 = crypto.createHash("md5"); //创建md5对象
  /*
    md5.update(密码字符) 返回一个对象，如果想要获取字符串，需要使用 digest 函数
    并指定进制,如果不指定进制获取的是一个 Buffer
  */
  const result = md5.update(password).digest("hex");
  return result;
};
module.exports = md5password;
