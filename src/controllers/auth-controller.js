'use strict';
const models = require('../models');
const md5 = require('md5');
const jwt = require('jsonwebtoken');
//GLOBAL API_KEY NEEDS TO BE CREATED


exports.post = ((req, res, next) => {
    models.users.findOne({
        where: {
            email: req.body.email,
            password: md5(req.body.password + global.API_KEY)
        }
    }).then((user) => {
        if (user) {
            const id = user.id;
            const token = jwt.sign({
                id
            }, global.API_KEY, {
              //  expiresIn: 1800 // expires in 5min
            });

            res.status(200).send({
                success: true,
                message: "Successfully authenticated!",
                data: token
            });
        } else {
            res.status(404).send({
                success: false,
                message: 'Username or password may be incorrect!',
                data: null
            });
        }
    });
});
