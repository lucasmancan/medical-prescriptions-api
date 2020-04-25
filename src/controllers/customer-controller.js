"use strict";


const repository = require("../repositories/customer-repository");

exports.get = async (req, res, next) => {
  try {
    const elements = await repository.findAll(req.userId);

    res.send({
      success: true,
      message: "",
      data: elements,
    });
  } catch (e) {
    next(e);
  }
};

exports.getByName = async (req, res, next) => {
  try {
    const elements = await repository.findByName(req.userId, req.query.name);
    // const customers = await models.sequelize.query("SELECT id, name FROM users where name like ?", { replacements: [ '%' + req.query.name+ '%'], type: models.sequelize.QueryTypes.SELECT });

    res.send({
      success: true,
      message: "",
      data: elements,
    });
  } catch (error) {
    next(error);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const element = await repository.getById(req.params.id);

    res.send({
      success: true,
      message: "",
      data: element,
    });
  } catch (e) {
    next(e);
  }
};

exports.post = async (req, res, next) => {
  try {

    const element = await repository.create(req.body);

    res.send({
      success: true,
      message: "",
      data: element,
    });
  } catch (error) {
    next(error);
  }
};

exports.put = async (req, res, next) => {
  try {
    const element = await repository.update(req.userId, req.body);
    res.send({
      success: true,
      message: "",
      data: element,
    });
  } catch (error) {
    next(error)
  }
};

exports.delete = async (req, res, next) => {
  await repository.inactivate(req.params.id)
};
