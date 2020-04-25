"use strict";
const models = require("../models");
const md5 = require("md5");
const email = require("../mail");
// require("../exceptions/NotFoundError").NotFoundError;
const {NotFoundError}  = require("../exceptions/NotFoundError");


exports.getById = async (id) => {
  const user = await models.users.findByPk(id);

  if (!user) throw new NotFoundError("Usuário não cadastrado");

  return user;
};

exports.create = async (data) => {
  const user = await models.users.findOne({
    where: {
      email: data.email,
    },
  });

  if (user) {
    throw new ValidationError("User already exists!");
  }

  return await models.users.create({
    name: data.name,
    email: data.email,
    document: data.document,
    password: md5(data.password + global.API_KEY),
  });
};

exports.findByEmail = async (email) => {
  return await models.users.findOne({
    where: {
      email: email,
    },
  });
};

exports.update = async (id, data) => {
  const user = await this.getById(id);

  if (user.email != data.email && this.findByEmail(data.email)) {
    throw new ValidationError("Não é possível utilizar o e-mail informado.");
  }

  user.document = data.document;
  user.email = data.email;
  user.name = data.name;

  return await models.users.update(user);
};

exports.inactivate = async (id) => {
  const user = await this.getById(id);

  user.active = false;

  return await models.users.update(user);
};
