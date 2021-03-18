/* 用户相关数据库接口 */
const connections = require("../app/database");
class UserService {
  async create(user) {
    const { name, password } = user;
    const statement = `INSERT INTO user (name, password) VALUES (?, ?);`;
    // 对 user 进行一些操作
    // console.log("将用户数据保存到数据库中", user);
    const result = await connections.execute(statement, [name, password]);
    // 将 user 数据保存到数据库中，需要使用 mysql2
    // console.log(result);
    return result[0];
  }
  async getUserByName(name) {
    const statement = `SELECT * FROM user WHERE name = ?;`;
    const result = await connections.execute(statement, [name]);
    // console.log(result[0]);
    return result[0];
  }
  async updateAvatarUrlById(avatar_url, userId) {
    const statement = `UPDATE user SET avatar_url = ? WHERE id = ?;`;
    const [result] = await connections.execute(statement, [avatar_url, userId]);
    return result;
  }
}

module.exports = new UserService();
