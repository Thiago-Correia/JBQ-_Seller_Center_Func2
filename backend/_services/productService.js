const productRepo = require("../_repositories/productRepo");

module.exports = {
  async listProducts() {
    return productRepo.findAll();
  },

  async getProduct(id) {
    const product = await productRepo.findById(id);
    if (!product) {
      throw new Error("Produto não encontrado");
    }
    return product;
  },

  async listActiveProducts() {
    const products = await productRepo.findActive();
    if (!products) {
      throw new Error("Nenhum produto ativo");
    }
    return products;
  },

  async updateProduct(id, data) {
    const exists = await productRepo.findById(id);
    if (!exists) {
      throw new Error("Produto não encontrado");
    }

    return productRepo.update(id, data);
  },

  async deactivateProduct(id) {
    const result = await productRepo.deactivate(id);

    if (result.affectedRows === 0) {
      return { sucesso: false, mensagem: "Produto não encontrado." };
    }

    return { sucesso: true, mensagem: "Produto excluído" };
  },
};
