"use strict";

const repository = require("../repositories/user-repository");
const authRepository = require("../repositories/auth-repository");


exports.getById = async (req, res, next) => {
  try {
    const user = await repository.getById(req.params.id);

    return res.status(200).send(user);
  } catch (e) {
    next(e);
  }
};

exports.post = async (req, res, next) => {
  try {
    const user = await repository.create(req.body);

    const id = user.id;

    const resp = {};
    resp.user = user;
    resp.token = await authRepository.createToken(id);
    // email.sendEmail(User.email);

    return res.status(201).send(resp);
  } catch (error) {
    next(error);
  }
};

exports.put = async (req, res, next) => {
  try {
    const user = await repository.update(req.body);

    return res.status(200).send(user);
  } catch (error) {
    next(error);
  }
};

exports.delete = async (req, res, next) => {
  try {
    await repository.inactivate(req.params.id);

    return res.status(200).send({
      success: true,
      message: "",
      data: null,
    });
  } catch (error) {
    next(error);
  }
};
