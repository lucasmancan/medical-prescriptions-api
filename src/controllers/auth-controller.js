'use strict';
const models = require('../models');
const md5 = require('md5');
const jwt = require('jsonwebtoken');
//GLOBAL API_KEY NEEDS TO BE CREATED
const userRepository = require('../repositories/user-repository');
const authRepository = require('../repositories/auth-repository');
const {AuthenticationError} = require('../exceptions/AuthenticationError');

exports.post = async (req, res, next) => {

    try {

        const user = await models.users.findOne({
            where: {
                email: req.body.email,
                password: md5(req.body.password + global.API_KEY)
            }
        });

        if(!user){
            throw new AuthenticationError("Credenciais inválidas")
        }

        const token = await authRepository.createToken(user.id);

        res.send({
            success: true,
            message: '',
            data: token
        })
    } catch (error) {
        next(error);
    }
}
