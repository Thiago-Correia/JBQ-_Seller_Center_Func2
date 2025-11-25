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
    const { nome, preco, estoque } = data;
    const result = await productRepo.update(id, nome, preco, estoque);
    if (result.affectedRows === 0) {
      return { sucesso: false, mensagem: "Produto não encontrado." };
    }
    return { sucesso: true, mensagem: "Produto atualizado" };
  },

  async deactivateProduct(id) {
    const result = await productRepo.deactivate(id);
    if (result.affectedRows === 0) {
      return { sucesso: false, mensagem: "Produto não encontrado." };
    }
    return { sucesso: true, mensagem: "Produto excluído" };
  },
};
