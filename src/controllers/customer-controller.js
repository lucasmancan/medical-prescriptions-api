'use strict';
const models = require('../models');

exports.get = async (req, res, next) => {
  models.customers.findAll()
    .then(function (customers) {
      res.send({
        success: true,
        message: '',
        data: customers
      });
    })
};


exports.getByName =  async (req, res, next) => {

  const customers = await models.sequelize.query("SELECT id, name FROM users where name like ?", { replacements: [ '%' + req.query.name+ '%'], type: models.sequelize.QueryTypes.SELECT });
  
  res.send({
        success: true,
        message: '',
        data: null
  }); 
  
};

exports.getById = async (req, res, next) => {

  try{
    const customer = await models.customers.findByPk(req.params.id)
    
      res.send({
        success: true,
        message: '',
        data: customer
      });
   
  }catch(e){
      e.status = 400;
      next(e);
  }
  
};

exports.post = async (req, res, next) => {
  models.customers.create(req.body)
    .then(function () {
      res.redirect('/customers');
    })
};

exports.put = async (req, res, next) => {
  models.customers.update(req.body, {
    where: {
      id: req.body.id
    }
  }).then(() => {
    res.status(200).send({
      success: true,
      message: 'Customer updated!',
      data: null
    });
  });
};

exports.delete = async (req, res, next) => {
  models.customers.destroy({
    where: {
      id: req.params.id
    }
  }).then(() => {
    res.status(200).send({
      success: true,
      message: 'Customer deleted!',
      data: null
    });
  });
};
