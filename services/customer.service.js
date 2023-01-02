const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class CustomerService {
  constructor() {}

  async find() {
    const res = await models.Customer.findAll({
      include: ['user'],
    });
    return res;
  }

  async findOne(id) {
    const customer = await models.Customer.findByPk(id);
    if (!customer) {
      throw boom.notFound('Customer not found');
    }
    return customer;
  }

  async create(data) {
    const newCustomer = await models.Customer.create(data, {
      include: ['user'],
    });
    return newCustomer;
  }

  async update(id, changes) {
    const customer = this.findOne(id);
    const res = await customer.update(customer, changes);
    return res;
  }

  async delete(id) {
    const customer = this.findOne(id);
    const res = await customer.destroy(customer);
    return res;
  }
}

module.exports = CustomerService;
