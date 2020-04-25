const jwt = require('jsonwebtoken');
module.exports = (req, res, next) => {
    try{

        if(!req.headers.authorization){
            throw new Error("Error..");
        }

        const token = req.headers.authorization.split(" ")[1];

        jwt.verify(token, global.API_KEY, function (err, decoded) {
            if (err)
              throw new Error("Error..");

            req.userId = decoded.id;
    
            next();
        });

    } catch (e) {
        res.status(401).json({
            success: false,
            message: "Authentication Error...",
            data: null
        });
    }
   
};