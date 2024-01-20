const httpStatus = require("http-status");
const {sendResponse} = require("../scripts/utils/generalResponseHelper");

// Middleware function to validate request components (body, query, params) using Joi schemas
const validate = (schema) => (req, res, next) => {
    // Helper function to validate individual component using its schema
    const validateComponent = (component, validationSchema) => {
        // Validate the component with the provided schema and disable aborting on the first error
        const { value, error } = validationSchema.validate(component, { abortEarly: false });
        // Return both the validated value and error details (if any)
        return { value, error: error ? error.details.map(detail => detail.message).join(", ") : null };
    };

    // Validate request body, query parameters, and route parameters
    const validationResults = {
        body: schema.body ? validateComponent(req.body, schema.body) : null,
        query: schema.query ? validateComponent(req.query, schema.query) : null,
        params: schema.params ? validateComponent(req.params, schema.params) : null,
    };

    // Identify failed validation components
    const failedComponents = Object.entries(validationResults)
        .filter(([_, result]) => result && result.error)
        .map(([component]) => component);

    // If any validation component fails, return a 400 Bad Request response with error messages
    if (failedComponents.length > 0) {
        const errorMessages = failedComponents.map(component => validationResults[component].error).join(", ");
        return sendResponse(res,httpStatus.BAD_REQUEST,errorMessages)
    }

    // Assign validated values to request object for successful validation components
    Object.entries(validationResults)
        .filter(([component, result]) => result && result.value)
        .forEach(([component, result]) => {
            req[component] = result.value;
        });

    // Move to the next middleware in the request handling chain
    return next();
};

// Export the validate middleware for use in other modules
module.exports = validate;
