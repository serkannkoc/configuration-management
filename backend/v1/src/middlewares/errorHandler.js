const {sendResponse} = require("../scripts/utils/generalResponseHelper");

const errorHandler = (error, req, res, next) => {
    sendResponse(res, error.status || 500, error.message || "Internal Server Error")
}
module.exports = errorHandler;