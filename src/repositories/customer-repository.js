"use strict";

const models = require("../models");
const email = require("../mail");
const { NotFoundError } = require("../exceptions/NotFoundError");

exports.findAll = async (userId) => {
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


exports.save = async (data) => {

  let entity = null;

  if(data.id) {
    entity = await this.update(data.id, data);
  }else {
    entity = await this.create(data);
  }

  return entity;
};


exports.update = async (id, data) => {
  return await models.customers.update(data, {
    where: {
      id: id
    },
  });
};

exports.inactivate = async (id) => {
  const element = await this.getById(id);

  element.active = false;

  return await models.users.update(element, {
    where: {
      id: id
    }
  });
};