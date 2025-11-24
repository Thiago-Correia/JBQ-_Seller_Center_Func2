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

  async update(id, product) {
    const { prd_name, prd_price, prd_stock, active } = product;

    await pool.query(
      "UPDATE produtos SET prd_name = ?, prd_price = ?, prd_stock = ?, is_active = ? WHERE id = ?",
      [prd_name, prd_price, prd_stock, active, id]
    );

    return { id, ...product };
  },

  async deactivate(id) {
    const query = "UPDATE produtos SET ativo = false WHERE id = ?";
    const [result] = await pool.query(query, [id]);
    return result;
  },
};
