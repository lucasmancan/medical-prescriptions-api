class AuthenticationError extends Error {
    
    constructor(message) {
        super(message); // (1)
        this.name = message; // (2)
        this.status = 401;
      }
}


module.exports.AuthenticationError = AuthenticationError;