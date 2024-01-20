const sendResponse = (res, statusCode, message, data = null) => {
    const success = statusCode >= 200 && statusCode < 300;
    res.status(statusCode).json({ success: success, status: statusCode, message: message, data: data });
}

module.exports = {
    sendResponse,
}