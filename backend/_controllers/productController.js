const productService = require("../_services/productService");

module.exports = {
  async list(req, res) {
    const products = await productService.listProducts();
    res.json(products);
  },

  async get(req, res) {
    try {
      const product = await productService.getProduct(req.params.id);
      res.json(product);
    } catch (err) {
      res.status(404).json({ erro: err.message });
    }
  },

  async listActive(req, res) {
    try {
      const product = await productService.listActiveProducts(req.params.id);
      res.json(product);
    } catch (err) {
      res.status(404).json({ erro: err.message });
    }
  },

  async update(req, res) {
    try {
      const updated = await productService.updateProduct(
        req.params.id,
        req.body
      );
      res.json(updated);
    } catch (err) {
      res.status(400).json({ erro: err.message });
    }
  },

  async deactivate(req, res) {
    const idProduto = req.params.id;

    try {
      const resposta = await productService.deactivateProduct(idProduto);

      if (!resposta.sucesso) {
        return res.status(404).json({ message: resposta.mensagem });
      }

      return res.json({ message: resposta.mensagem });
    } catch (error) {
      console.error("Erro ao excluir o produto:", error);
      return res.status(500).json({ message: "Erro interno do servidor." });
    }
  },
};
