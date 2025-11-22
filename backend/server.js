const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API com Express + MySQL funcionando!");
});

app.get("/products", async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM products");
  res.json(rows);
});

app.get("/products/:id", async (req, res) => {
  const id = req.params.id;
  const [rows] = await pool.query("SELECT * FROM products WHERE id = ?", [id]);

  if (rows.length === 0) {
    return res.status(404).json({ error: "Produto não encontrado" });
  }

  res.json(rows[0]);
});

app.post("/products", async (req, res) => {
  const { name, price, stock } = req.body;

  const [result] = await pool.query(
    "INSERT INTO products (prd_name, prd_price, prd_stock) VALUES (?, ?, ?)",
    [name, price, stock]
  );

  res.status(201).json({
    id: result.insertId,
    name,
    price,
    stock,
  });
});

app.put("/products/:id", async (req, res) => {
  const id = req.params.id;
  const { name, price, stock } = req.body;

  const [result] = await pool.query(
    "UPDATE products SET name = ?, price = ?, stock = ? WHERE id = ?",
    [name, price, stock, id]
  );

  if (result.affectedRows === 0) {
    return res.status(404).json({ error: "Produto não encontrado" });
  }

  res.json({ id, name, price, stock });
});

app.delete("/products/:id", async (req, res) => {
  const id = req.params.id;

  const [result] = await pool.query("DELETE FROM products WHERE id = ?", [id]);

  if (result.affectedRows === 0) {
    return res.status(404).json({ error: "Produto não encontrado" });
  }

  res.json({ message: "Produto removido com sucesso" });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
