const express = require("express");
const cors = require("cors");

const productRoutes = require("./_routes/productRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/produtos", async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM produtos WHERE ativo = true");
  res.json(rows);
});

app.patch("/api/produto/excluir/:id", async (req, res) => {
  const idProduto = req.params.id;

  try {
    const query = "UPDATE produtos SET ativo = false WHERE id = ?";
    const [rows] = await pool.query(query, [idProduto]); 
    
    if (rows.affectedRows > 0) {
      res.json({ message: "Produto excluido" });
    } else {
      res.status(404).json({ message: "Produto não encontrado." });
    }
    
  } catch (error) {
    console.error("Erro ao excluir o produto: ", error);
    res.status(500).json({ message: "Erro interno do servidor." });
  }
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
// rotas
app.use("/api", productRoutes);

app.get("/", (req, res) => {
  res.send("API Express + MySQL funcionando!");
});

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});
