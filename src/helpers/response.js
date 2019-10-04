const successResponse = (res, status, message = null, data = null) => {
    return res.status(status).json({
        status,
        message,
        data
    });
};

const errorResponse = (res, status, message = null, error=null) => {
    return res.status(status).json({
        status,
        message,
        error
    });
};

export default { successResponse, errorResponse };