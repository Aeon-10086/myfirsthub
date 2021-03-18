/* 自己的逻辑
const momentService = require("./moment.service");
class AuthService {
  async checkMoment(momentId, userId) {
    const moment = await momentService.getMomentById(momentId);
    if (moment.user.id == userId) {
      return true;
    } else {
      return false;
    }
  }
} */
/* 授权相关 */
const connections = require("../app/database");
class AuthService {
  async checkResource(tableName, id, userId) {
    const statement = `SELECT * FROM ${tableName} WHERE id = ? AND user_id = ?;`;
    const [result] = await connections.execute(statement, [id, userId]);
    return result.length === 0 ? false : true;
  }
}
module.exports = new AuthService();
