/* 评论相关数据库操作 */

const connections = require("../app/database");
class commentService {
  async create(momentId, content, userId) {
    const statement = `INSERT INTO comment (content, moment_id, user_id) VALUES (?, ?, ?);`;
    const [result] = await connections.execute(statement, [
      content,
      momentId,
      userId,
    ]);
    return result;
  }
  async reply(content, momentId, userId, commentId) {
    const statement = `INSERT INTO comment (content, moment_id, user_id, comment_id) VALUES (?, ?, ?, ?);`;
    const [result] = await connections.execute(statement, [
      content,
      momentId,
      userId,
      commentId,
    ]);
    return result;
  }
  async update(content, commentId) {
    const statement = `UPDATE comment SET content = ? WHERE id = ?;`;
    const [result] = await connections.execute(statement, [content, commentId]);
    return result;
  }
  async remove(commentId) {
    const statement = `DELETE FROM comment WHERE id = ?`;
    const [result] = await connections.execute(statement, [commentId]);
    return result;
  }
  async getCommentsByMomentId(momentId) {
    const statement = `
      SELECT
        c.id, c.content, c.comment_id commentId, c.createAt createTime,
        JSON_OBJECT("id",u.id, "name",u.name) user
      FROM comment c
      LEFT JOIN user u ON u.id = c.user_id
      WHERE moment_id = 1;
    `;
    const [result] = await connections.execute(statement, [momentId]);
    return result;
  }
}

module.exports = new commentService();
