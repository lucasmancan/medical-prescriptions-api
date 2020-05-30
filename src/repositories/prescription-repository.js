"use strict";

const models = require("../models");

const { NotFoundError } = require("../exceptions/NotFoundError");

exports.findAll = async (userId) => {
  return await models.prescriptions.findAll({
    where: {
      userId: userId,
    },
  
      include: [
        {
          model: models.items,
          as: "items",
        },
      ],
   
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


exports.getById = async (id) => {
  const element = await models.prescriptions.findByPk(id, {
    include: [
      {
        model: models.items,
        as: "items",
      },
    ],
  });

  if (!element) throw new NotFoundError("Não encontrado");

  return element;
};

exports.create = async (data) => {
  return await models.prescriptions.create(data, {
    include: [
      {
        model: models.items,
        as: "items",
      },
    ],
  });
};

exports.findByCustomerName = async (userId, customerName) => {
  return await models.prescriptions.findAll({
    where: {
      userId: userId,
      customerName: customerName,
    },
  });
};

exports.update = async (id, data) => {
  return await models.prescriptions.update(data, {
    where: {
      id: id,
    },
    include: [
      {
        model: models.items,
        as: "items",
      },
    ],
  });
};

exports.inactivate = async (id) => {
  const element = await this.getById(id);

  element.active = false;

  return await models.users.update(element, {
    where: {
      id: id,
    },
  });
};
