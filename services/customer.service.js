const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');
const bcrypt = require('bcrypt');

class CustomerService {
  constructor() {}

  async create(data) {
    const hash = await bcrypt.hash(data.user.password, 10);
    const newCustomer = await models.Customer.create(
      {
        ...data,
        user: {
          ...data.user,
          password: hash,
        },
      },
      {
        include: ['user'],
      }
    );
    delete newCustomer.dataValues.user.password;
    return newCustomer;
  }

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
