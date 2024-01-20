class ApiError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.message = message;
        this.status = statusCode;
    }

    static notFound(message) {
        return new ApiError(message || 'Sorry, the requested record was not found', 404);
    }

    static internalServerError(message) {
        return new ApiError(message, 500);
    }

    static creationFailed(message) {
        return new ApiError(message || 'Sorry, the requested item could not be created.', 500);
    }

    static pageNotFound() {
        return new ApiError('Sorry, the requested page was not found', 404);
    }
}

module.exports = ApiError;
