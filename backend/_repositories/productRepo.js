const pool = require("../db");

module.exports = {
  async findAll() {
    const [rows] = await pool.query("SELECT * FROM products");
    return rows;
  },

  async findById(id) {
    const [rows] = await pool.query("SELECT * FROM products WHERE id = ?", [
      id,
    ]);
    return rows[0];
  },

  async create(product) {
    const { prd_name, prd_price, prd_stock } = product;

    const [result] = await pool.query(
      "INSERT INTO products (prd_name, prd_price, prd_stock) VALUES (?, ?, ?)",
      [prd_name, prd_price, prd_stock]
    );

    return {
      id: result.insertId,
      ...product,
    };
  },

  async update(id, product) {
    const { prd_name, prd_price, prd_stock, active } = product;

    await pool.query(
      "UPDATE products SET prd_name = ?, prd_price = ?, prd_stock = ?, is_active = ? WHERE id = ?",
      [prd_name, prd_price, prd_stock, active, id]
    );

    return { id, ...product };
  },

  async remove(id) {
    return pool.query("DELETE FROM products WHERE id = ?", [id]);
  },
};
