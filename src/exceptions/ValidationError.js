class ValidationError extends Error {
    constructor(message) {
        super(message); // (1)
        this.name = message; // (2)
        this.status = 400;
      }
}

module.exports.ValidationError = ValidationError;