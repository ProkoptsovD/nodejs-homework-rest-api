class BadRequestError extends Error {
    constructor(message = 'Bad request', status = 400) {
        super();
        this.message = message;
        this.status = status;
    }
};
class NotFoundError extends Error {
    constructor(message = 'Resource is not found', status = 404) {
        super();
        this.message = message;
        this.status = status;
    }
};
class ValidationError extends Error {
    constructor(message = 'Validation is not passed', status = 400) {
        super();
        this.message = message;
        this.status = status;
    }
};
class UnauthorizedError extends Error {
    constructor(message = 'Unauthorized', status = 401) {
        super();
        this.message = message;
        this.status = status;
    }
};
class ForbiddenError extends Error {
    constructor(message = 'Forbidden', status = 403) {
        super();
        this.message = message;
        this.status = status;
    }
};

module.exports = {
    BadRequestError,
    NotFoundError,
    ValidationError,
    UnauthorizedError,
    ForbiddenError
}
