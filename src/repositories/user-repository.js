"use strict";
const models = require("../models");
const md5 = require("md5");
const email = require("../mail");
// require("../exceptions/NotFoundError").NotFoundError;
const {NotFoundError}  = require("../exceptions/NotFoundError");
const {ValidationError}  = require("../exceptions/ValidationError");



exports.populate = async () => {
  await models.users.create({
    name:" data.name",
    email: "lucasfmancan@gmail.com",
    document: 12312312312,
    password: md5("123456" + global.API_KEY),
  });  
  for(let i = 0; i < 100; i ++){
    await models.users.create({
      name:" data.name",
      email: "lucasfmancan@gmail.com"+Math.random(),
      document: 12312312312,
      password: md5("123456" + Math.random() + global.API_KEY),
    });  

    await models.customers.create({
      name: "data.name",
      email: "lucasfmancan@gmail.com",
      phone: 12312312312,
      userId: 1,

    });  

    await models.drugs.create({
      name: "data.name",
      description: "lucasfmancan@gmail.com",
    }); 

    const prescriptions = {
      name: "Mariana",
      expiresAt: 1587909091763,
      userId: 1,
      customerId: 1,
  
      items: [
          {
              "drugId": 1,
              "quantity": 2,
              "frequency": 2,
              "frequencyType": "DIAS"
          }
      ]
    }
  
    await models.prescriptions.create(prescriptions, {
      include: [
        {
          model: models.items,
          as: "items",
        },
      ],
    });
  }

 
  
  return null;
};

exports.getById = async (id) => {
  const user = await models.users.findByPk(id);

  if (!user) throw new NotFoundError("Usuário não cadastrado");

  return user;
};

exports.create = async (data) => {
  const user = await models.users.findOne({
    where: {
      email: data.email
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
      email: email
    }
  });
};

exports.update = async (id, data) => {
  const user = await this.getById(id);

  if (user.email != data.email && this.findByEmail(data.email)) {
    throw new ValidationError("Não é possível utilizar o e-mail informado.");
  }
  return await models.users.update(user, {
    where: {
      id: id
    }
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
