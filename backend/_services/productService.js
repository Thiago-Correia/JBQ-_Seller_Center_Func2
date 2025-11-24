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

  async createProduct(data) {
    if (data.price <= 0) {
      throw new Error("O preço deve ser maior que zero");
    }
    if (data.stock < 0) {
      throw new Error("Estoque não pode ser negativo");
    }

    return productRepo.create(data);
  },

  async updateProduct(id, data) {
    const exists = await productRepo.findById(id);
    if (!exists) {
      throw new Error("Produto não encontrado");
    }

    return productRepo.update(id, data);
  },

  async deleteProduct(id) {
    const exists = await productRepo.findById(id);
    if (!exists) {
      throw new Error("Produto não encontrado");
    }

    return productRepo.remove(id);
  },
};
