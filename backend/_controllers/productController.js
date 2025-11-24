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

  async create(req, res) {
    try {
      const newProduct = await productService.createProduct(req.body);
      res.status(201).json(newProduct);
    } catch (err) {
      res.status(400).json({ erro: err.message });
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

  async remove(req, res) {
    try {
      await productService.deleteProduct(req.params.id);
      res.json({ message: "Produto removido com sucesso" });
    } catch (err) {
      res.status(404).json({ erro: err.message });
    }
  },
};
