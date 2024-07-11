

class InsufficientError extends Error {

    constructor(status, message, errors) {
        super(message);
        this.status = status;
        this.message = message;
    }

    static inSufficientError(msg) {
        return new InsufficientError(400, msg);
    }

}

module.exports = InsufficientError;