

class InsufficientError extends Error {

    constructor(status, message, errors) {
        super(message);
        this.status = status;
        this.message = message;
    }

    static inSufficientError() {
        return new InsufficientError(400, 'Entering Amount Greater Than Stock');
    }

}

module.exports = InsufficientError;