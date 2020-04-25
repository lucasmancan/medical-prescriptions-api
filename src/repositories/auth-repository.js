
const jwt = require('jsonwebtoken');


exports.createToken = async (userId) => {
    const token = await jwt.sign({
        userId
      }, global.API_KEY, {
        //  expiresIn: 1800 // expires in 5min
      });

      return token;
  };
  