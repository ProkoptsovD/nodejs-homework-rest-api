class BadRequestError extends Error {
    constructor(message = 'Bad request', status = 400) {
        super();
        this.message = message;
        this.status = status;

        Object.setPrototypeOf(this, BadRequestError.prototype);
    }
};
class NotFoundError extends Error {
    constructor(message = 'Resource is not found', status = 404) {
        super();
        this.message = message;
        this.status = status;

        Object.setPrototypeOf(this, NotFoundError.prototype);
    }
};
class ValidationError extends Error {
    constructor(message = 'Validation is not passed', status = 400) {
        super();
        this.message = message;
        this.status = status;

        Object.setPrototypeOf(this, ValidationError.prototype);
    }
};
class UnauthorizedError extends Error {
    constructor(message = 'Unauthorized', status = 401) {
        super();
        this.message = message;
        this.status = status;

        Object.setPrototypeOf(this, UnauthorizedError.prototype);
    }
};
class ForbiddenError extends Error {
    constructor(message = 'Forbidden', status = 403) {
        super();
        this.message = message;
        this.status = status;

        Object.setPrototypeOf(this, ForbiddenError.prototype);
    }
};
class ConflictError extends Error {
    constructor(message = 'Conflict', status = 409) {
        super();
        this.message = message;
        this.status = status;

        Object.setPrototypeOf(this, ConflictError.prototype);
    }
};

module.exports = {
    BadRequestError,
    NotFoundError,
    ValidationError,
    UnauthorizedError,
    ForbiddenError,
    ConflictError
}
