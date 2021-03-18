/* 数据库相关 */
// 3
const mysql = require("mysql2");
// i
const config = require("./config");
// 7
const connections = mysql.createPool({
  host: config.MYSQL_HOST,
  port: config.MYSQL_PORT,
  database: MYSQL_DATABASE,
  user: MYSQL_USER,
  password: MYSQL_PASSWORD,
});

connections.getConnection((err, conn) => {
  conn.connect((err) => {
    if (err) {
      console.log("连接失败", err);
    } else {
      console.log("连接成功");
    }
  });
});

module.exports = connections.promise();
