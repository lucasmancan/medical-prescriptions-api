"use strict";


const repository = require("../repositories/prescription-repository");

exports.get = async (req, res, next) => {
  try {
    const elements = await repository.findAll(req.userId);
    res.status(200).send(elements);
  } catch (e) {
    next(e);
  }
};

exports.getByCustomerName = async (req, res, next) => {
  try {
    const elements = await repository.findByCustomerName(req.userId, req.query.customerName);
    // const prescriptions = await models.sequelize.query("SELECT id, name FROM users where name like ?", { replacements: [ '%' + req.query.name+ '%'], type: models.sequelize.QueryTypes.SELECT });

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
    req.body.userId = req.userId;

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
    res.status(200).send({
      success: true,
      message: "",
      data: null,
    });
  } catch (error) {
    next(error)
  }
};
