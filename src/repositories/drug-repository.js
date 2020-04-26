"use strict";

const models = require("../models");

const { NotFoundError } = require("../exceptions/NotFoundError");

exports.findAll = async (userId) => {
  return await models.drugs.findAll({
    where: {
      userId: userId
    }
  });
};

exports.getById = async (id) => {
  const element = await models.drugs.findByPk(id);

  if (!element) throw new NotFoundError("Não encontrado");

  return element;
};

exports.create = async (data) => {
  return await models.drugs.create(data);
};

exports.findByName = async (userId, name) => {
  return await models.drugs.findAll({
    where: {
      userId: userId,
      name: name
    }
  });
};

exports.update = async (id, data) => {
  return await models.drugs.update(data.id, {
    where: {
      id: id
    },
  });
};

exports.inactivate = async (id) => {
  const element = await this.getById(id);

  element.active = false;

  return await models.drugs.update(customer);
};
