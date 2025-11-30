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
    const id = req.params.id;
    const data = req.body;
    try {
      const resposta = await productService.updateProduct(id, data);

      if (!resposta.sucesso) {
        return res.status(404).json({ message: resposta.mensagem });
      }

      return res.json({ message: resposta.mensagem });
    } catch (err) {
      console.error("Erro ao atualizar produto:", err);
      return res.status(500).json({ message: "Erro interno do servidor." });
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

  async deleteMany(req, res) {
    try {
      const ids = req.body.ids;
      const result = await productService.deleteMultipleProducts(ids);

      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },
};
