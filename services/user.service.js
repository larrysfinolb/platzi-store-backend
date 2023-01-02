const boom = require('@hapi/boom');
const { models } = require('./../libs/sequelize');

class UserService {
  constructor() {}

  async create(data) {
    const res = await models.User.create(data);
    return res;
  }

  async find() {
    const res = await models.User.findAll({
      include: ["customer"],
    });
    return res;
  }

  async findOne(id) {
    const res = await models.User.findByPk(id);
    if (!res) {
      throw boom.notFound('User not found');
    }
    return res;
  }

  async update(id, changes) {
    const user = this.findOne(id);
    const res = await user.update(changes);
    return res;
  }

  async delete(id) {
    const user = this.findOne(id);
    const res = user.destroy();
    return res;
  }
}

module.exports = UserService;
