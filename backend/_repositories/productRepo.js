const pool = require("../db");

module.exports = {
  async findAll() {
    const [rows] = await pool.query("SELECT * FROM produtos");
    return rows;
  },

  async findById(id) {
    const [rows] = await pool.query("SELECT * FROM produtos WHERE id = ?", [
      id,
    ]);
    return rows[0];
  },

  async findActive() {
    const [rows] = await pool.query(
      "SELECT * FROM produtos WHERE ativo = true"
    );
    return rows;
  },

  async update(id, nome, preco, estoque) {
    const [result] = await pool.query(
      `UPDATE produtos SET nome = ?, preco = ?, estoque = ? WHERE id = ?`,
      [nome, preco, estoque, id]
    );
    return result;
  },

  async deactivate(id) {
    const [result] = await pool.query(
      "UPDATE produtos SET ativo = false WHERE id = ?",
      [id]
    );
    return result;
  },
 async deleteMany(ids) {
    const sql = `DELETE FROM products WHERE id IN (?)`;
    const [result] = await db.query(sql, [ids]);
    return { affected: result.affectedRows };
}


};
