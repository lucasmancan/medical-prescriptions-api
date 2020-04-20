'use strict';
const models = require('../models');
const md5 = require('md5');
const repository = require('../repositories/user-repository');
const email = require('../mail');
const jwt = require('jsonwebtoken');



exports.getById = async (req, res, next) => {

  try{
    const user = await repository.getById(req.params.id)

    if(!user){
      
      const error = new Error("User not found.");

      error.status = 400;
      throw error;
    }
      
    // for (let i = 0; i < 1000; i ++) {
    //   await models.users.create({
    //     name: "req.body.name",
    //     email: "lucasfmancan@gmail.com",
    //     document:"req.body.document",
    //     password: md5("req.body.password" + global.API_KEY)
    //   })
    // }


    return res.status(200).send(null);
  }catch(e){
    next(e)
  }
};

exports.post = async (req, res, next) => {
  try {

     let User = await models.users.findOne({
        where: {
          email: req.body.email
        }
      });

    if (User) {
        return res.status(400).send({
          success: false,
          message: 'User already exists!',
          data: null
        });
      }

      User = await models.users.create({
        name: req.body.name,
        email: req.body.email,
        document:req.body.document,
        password: md5(req.body.password + global.API_KEY)
      })


      console.log(User)
      const id = User.id;
      
      const token = await jwt.sign({
        id
      }, global.API_KEY, {
        //  expiresIn: 1800 // expires in 5min
      });

      const resp = {}
      resp.user = User;
      resp.token = token;
      // email.sendEmail(User.email);

      return res.status(201).send({
        success: true,
        message: 'User created!',
        data: resp
      });
   
  } catch (error) {
      console.error(error)

      const errorResponse = new Error("Erro ao salvar usuário");
      errorResponse.status = 400;

      next(errorResponse)
  }

};

exports.put = async (req, res, next) => {
  try {

    await repository.update(req.body)
    return res.status(200).send({
      success: true,
      message: 'User updated!',
      data: null
    });

  } catch (error) {
    throw error
  }
}
exports.get = async (req, res, next) => {
  try {

    const list = await models.users.findAll();
    return res.status(200).send({
      success: true,
      message: 'User updated!',
      data: list
    });

  } catch (error) {
    throw error
  }
}
exports.delete = async (req, res, next) => {
  try {

    await models.users.destroy({
      where: {
        id: req.params.id
      }
    })

    return res.status(200).send({
      success: false,
      message: 'User deleted!',
      data: null
    });
  } catch (error) {
      throw error;
  }
};