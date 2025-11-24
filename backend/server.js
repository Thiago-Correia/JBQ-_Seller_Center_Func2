const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get("/api/produtos", async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM produtos WHERE ativo = true");
  res.json(rows);
});
/*
app.get("/produto/:id", async (req, res) => {
  const id = req.params.id;
  const [rows] = await pool.query("SELECT * FROM produtos WHERE id = ?", [id]);

  if (rows.length === 0) {
    return res.status(404).json({ error: "Produto não encontrado" });
  }

  res.json(rows[0]);
});
*/
/*
app.post("/produtos", async (req, res) => {
  const { name, price, stock } = req.body;

  const [result] = await pool.query(
    "INSERT INTO produtos (prd_name, prd_price, prd_stock) VALUES (?, ?, ?)",
    [name, price, stock]
  );

  res.status(201).json({
    id: result.insertId,
    name,
    price,
    stock,
  });
});
*/
/*
app.put("/produto/:id", async (req, res) => {
  const id = req.params.id;
  const { name, price, stock } = req.body;

  const [result] = await pool.query(
    "UPDATE produtos SET name = ?, price = ?, stock = ? WHERE id = ?",
    [name, price, stock, id]
  );

  if (result.affectedRows === 0) {
    return res.status(404).json({ error: "Produto não encontrado" });
  }

  res.json({ id, name, price, stock });
});
*/
/*
app.delete("/produtos/:id", async (req, res) => {
  const id = req.params.id;

  const [result] = await pool.query("DELETE FROM produtos WHERE id = ?", [id]);

  if (result.affectedRows === 0) {
    return res.status(404).json({ error: "Produto não encontrado" });
  }

  res.json({ message: "Produto removido com sucesso" });
});
*/

app.get("/", (req, res) => {
  res.send("API com Express + MySQL funcionando!");
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});