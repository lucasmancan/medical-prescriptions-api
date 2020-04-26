"use strict";


const repository = require("../repositories/drug-repository");

exports.get = async (req, res, next) => {
  try {
    const elements = await repository.findAll();

    res.status(200).send(elements);
  } catch (e) {
    next(e);
  }
};

exports.getByName = async (req, res, next) => {
  try {
    const elements = await repository.findByName(req.userId, req.query.name);
    // const drugs = await models.sequelize.query("SELECT id, name FROM users where name like ?", { replacements: [ '%' + req.query.name+ '%'], type: models.sequelize.QueryTypes.SELECT });

    res.status(200).send(elements);
  } catch (error) {
    next(error);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const element = await repository.getById(req.params.id);

    res.status(200).send(element);
  } catch (e) {
    next(e);
  }
};

exports.post = async (req, res, next) => {
  try {

    const element = await repository.create(req.body);

    res.status(201).send(element);
  } catch (error) {
    next(error);
  }
};

exports.put = async (req, res, next) => {
  try {
    const element = await repository.update(req.userId, req.body);
    res.status(200).send(element);
  } catch (error) {
    next(error)
  }
};

exports.delete = async (req, res, next) => {
  try {
    await repository.inactivate(req.params.id);
    res.status(200).send({});
  } catch (error) {
    next(error)
  }
};
