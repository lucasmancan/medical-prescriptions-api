'use strict';
const models = require('../models');

exports.get = (req, res, next) => {
  models.drugs.findAll()
    .then(function (drugs) {
      res.send({
        success: true,
        message: '',
        data: drugs
      });
    })
};

exports.getById = (req, res, next) => {
  models.drugs.findById(req.params.id)
    .then(function (drugs) {
      res.send({
        success: true,
        message: '',
        data: drugs
      });
    })
};


exports.getByName = async (req, res, next) => {
    models.drugs.findAll({where: {country_id: req.params.id}})

    const drugs = await sequelize.query("SELECT id, name FROM `drugs` where name like ? ", { replacements: [req.query.name], type: QueryTypes.SELECT });
    
    res.send({
          success: true,
          message: '',
          data: drugs
    });     
  };
  


exports.post = (req, res, next) => {
  models.drugs.create(req.body)
    .then(function () {
      res.send({
        success: true,
        message: 'Drug created',
        data: null
      });
    })
};

exports.put = (req, res, next) => {
  models.drugs.update(req.body, {
    where: {
      id: req.body.id
    }
  }).then(() => {
    res.status(200).send({
      success: true,
      message: 'Drug updated!',
      data: null
    });
  });
};

exports.delete = (req, res, next) => {
  models.drugs.destroy({
    where: {
      id: req.params.id
    }
  }).then(() => {
    res.status(200).send({
      success: true,
      message: 'Drug deleted!',
      data: null
    });
  });
};
