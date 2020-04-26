"use strict";

const models = require("../models");

const { NotFoundError } = require("../exceptions/NotFoundError");

exports.findAll = async (userId) => {
  return await models.prescriptions.findAll({
    where: {
      userId: userId
    }
  });
};

exports.getById = async (id) => {
  const element = await models.prescriptions.findByPk(id);

  if (!element) throw new NotFoundError("Não encontrado");

  return element;
};

exports.create = async (data) => {
  return await models.prescriptions.create(data);
};

exports.findByCustomerName = async (userId, customerName) => {
  return await models.prescriptions.findAll({
    where: {
      userId: userId,
      customerName: customerName
    }
  });
};

exports.update = async (id, data) => {
  return await models.prescriptions.update(data.id, {
    where: {
      id: id
    },
  });
};

exports.inactivate = async (id) => {
  const element = await this.getById(id);

  element.active = false;

  return await models.prescriptions.update(customer);
};
