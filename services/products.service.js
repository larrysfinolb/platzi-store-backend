const boom = require('@hapi/boom');

class ProductsService {
  constructor() {
    this.products = [];
  }

  async create(data) {
    const newProduct = {
      id: '',
      ...data,
    };

    this.products.push(newProduct);
    return newProduct;
  }

  async find() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.products);
      }, 5000);
    });
  }

  async findOne(id) {
    const product = this.products.find((item) => item.id === id);
    if (!product) {
      throw boom.notFound('Product not found');
    }

    return product;
  }

  async update(id, changes) {
    const index = this.products.findIndex((item) => item.id === id);
    if (index === -1) {
      throw boom.notFound('Product not found');
    }

    const product = this.products[index];
    this.products[index] = { product, changes };
    return this.products[index];
  }

  async delete(id) {
    const index = this.products.findIndex((item) => item.id === id);
    if (index === -1) {
      throw boom.notFound('Product not found');
    }

    this.products.slice(index);
    return id;
  }
}

module.exports = ProductsService;
