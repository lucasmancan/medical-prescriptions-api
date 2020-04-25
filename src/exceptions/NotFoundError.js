class NotFoundError extends Error {
    
    constructor(message) {
        super(message); // (1)
        this.name = message; // (2)
        this.status = 404;
      }
}


module.exports.NotFoundError = NotFoundError;