'use strict';
const models = require('../models');
const md5 = require('md5');

exports.update = async (userObj) => {
    let User;
}

exports.getById = async (id) => {

    // throw new Error("NOT FOUND");
   return await models.users.findByPk(id)
};