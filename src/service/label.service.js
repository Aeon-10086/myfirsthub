const { off } = require("../app/database");
const connections = require("../app/database");
class labelService {
  async create(name) {
    const statement = `INSERT INTO label (name) VALUES (?)`;
    const [result] = await connections.execute(statement, [name]);
    return result;
  }
  async getLabelByName(name) {
    const statement = `SELECT * FROM label WHERE name = ?;`;
    const [result] = await connections.execute(statement, [name]);
    return result[0];
  }
  async getLabels(limit, offset) {
    const statement = `SELECT * FROM label LIMIT ?, ?;`;
    const [result] = await connections.execute(statement, [offset, limit]);
    return result;
  }
}

module.exports = new labelService();
