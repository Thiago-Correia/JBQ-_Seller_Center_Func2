const express = require("express");
const cors = require("cors");

const productRoutes = require("./_routes/productRoutes");

const app = express();
app.use(cors());
app.use(express.json());

// rotas
app.use("/products", productRoutes);

app.get("/", (req, res) => {
  res.send("API Express + MySQL funcionando!");
});

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});
