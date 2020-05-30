const jwt = require('jsonwebtoken');

const {AuthenticationError}  = require('../exceptions/AuthenticationError');

module.exports = (req, res, next) => {
    try{

        console.log(req.headers);
        if(!req.headers.authorization){
            throw new AuthenticationError("Permissão necessária para acessar esse recurso.");
        }

        const token = req.headers.authorization.split(" ")[1];

        jwt.verify(token, global.API_KEY, function (err, decoded) {
            if (err)
            throw new AuthenticationError("Autenticação inválida.");

              console.log(decoded)
            req.userId = decoded.userId;
    
            next();
        });

    } catch (e) {
        next(e);
    }
   
};