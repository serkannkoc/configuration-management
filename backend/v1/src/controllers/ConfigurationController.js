const ConfigurationService = require("../services/ConfigurationService");
const { sendResponse } = require("../scripts/utils/generalResponseHelper");
const httpStatus = require("http-status");
const ApiError = require("../errors/ApiError");
const admin = require("firebase-admin");

class ConfigurationController {

    async getAllConfigurations(req, res, next) {
        try {
            const configurations = await ConfigurationService.getAllConfigurations();
            res.send(configurations)
            // sendResponse(res, httpStatus.OK, 'Configurations retrieved successfully', {
            //     configurations,
            // });
        } catch (error) {
            return next(ApiError.internalServerError(error.message));
        }
    }

    async getAllConfigurationsSortedByCreateDate(req, res, next) {
        try {
            const configurations = await ConfigurationService.getAllConfigurationsSortedByCreateDate();
            sendResponse(res, httpStatus.OK, 'Configurations retrieved successfully', {
                configurations,
            });
        } catch (error) {
            return next(ApiError.internalServerError(error.message));
        }
    }
    async addConfiguration(req, res, next) {
        try {
            const { description, paramKey, value } = req.body;
            const config = await ConfigurationService.addConfiguration(
                description,
                paramKey,
                value
            );
            sendResponse(res, httpStatus.CREATED, 'Configuration added successfully', {
                config,
            });
        } catch (error) {
            return next(ApiError.internalServerError(error.message));
        }
    }

    async deleteConfiguration(req, res, next) {
        try {
            const configId = req.params.id;
            await ConfigurationService.deleteConfiguration(configId);
            sendResponse(res, httpStatus.OK, 'Configuration deleted successfully');
        } catch (error) {
            return next(ApiError.internalServerError(error.message));
        }
    }

    async updateConfiguration(req, res, next) {
        try {
            const configId = req.params.id;
            const newData = req.body;
            await ConfigurationService.updateConfiguration(configId, newData);
            sendResponse(res, httpStatus.OK, 'Configuration updated successfully');
        } catch (error) {
            return next(ApiError.internalServerError(error.message));
        }
    }
}

module.exports = new ConfigurationController();
