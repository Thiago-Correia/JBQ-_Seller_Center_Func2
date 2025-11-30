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
 async deleteMultipleProducts(ids) {
    if (!ids || ids.length === 0) {
        throw new Error("Nenhum produto selecionado");
    }

    const result = await productRepo.deleteMany(ids);

    return {
        requested: ids.length,
        deleted: result.affected,
        failed: ids.length - result.affected,
        message:
            result.affected === ids.length
                ? "Todos os produtos foram removidos com sucesso"
                : `Alguns produtos não puderam ser removidos.`
    };
}


};
