'use strict';
const models = require('../models');

exports.get = (req, res, next) => {
  models.prescriptions.findAll()
    .then(function (prescriptions) {
      res.send({
        success: true,
        message: '',
        data: prescriptions
      });
    })
};

exports.getById = (req, res, next) => {
   models.prescriptions.findById(req.params.id)
    .then(function (prescriptions) {
      res.send({
        success: true,
        message: '',
        data: prescriptions
      });
    })
};


exports.post = (req, res, next) => {
  models.countries.create(req.body)
    .then(function () {
      res.send({
        success: true,
        message: 'Prescription created',
        data: null
      });
    })
};

exports.put = (req, res, next) => {
  models.countries.update(req.body, {
    where: {
        id: req.body.id
    }
  }).then(() => {
    res.status(200).send({
      success: true,
      message: 'Prescription updated!',
      data: null
    });
  });
};

exports.delete = (req, res, next) => {
  models.countries.destroy({
    where: {
      id: req.params.id
    }
  }).then(() => {
    res.status(200).send({
      success: true,
      message: 'Prescription deleted!',
      data: null
    });
  });
};
