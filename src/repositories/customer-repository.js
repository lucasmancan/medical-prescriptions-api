"use strict";

const models = require("../models");
const email = require("../mail");
const { NotFoundError } = require("../exceptions/NotFoundError");

exports.getAll = async (userId) => {
  return await models.customers.findAll({
    where: {
      userId: userId
    }
  });
};

exports.getById = async (id) => {
  const element = await models.customers.findByPk(id);

  if (!element) throw new NotFoundError("Paciente não cadastrado");

  return element;
};

exports.create = async (data) => {
  return await models.customers.create(data);
};

exports.findByName = async (userId, name) => {
  return await models.customers.findAll({
    where: {
      userId: userId,
      name: name
    }
  });
};

exports.update = async (id, data) => {
  return await models.customers.update(data.id, {
    where: {
      id: id
    },
  });
};

exports.inactivate = async (id) => {
  const element = await this.getById(id);

  element.active = false;

  return await models.customers.update(customer);
};
