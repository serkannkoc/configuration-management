//Express
const express = require("express")
const router = express.Router();
//Authentication and Authorization
const authenticate = require("../middlewares/authenticate")
const staticTokenAuthenticate = require("../middlewares/staticTokenAuthenticate")
//Validation
const validate = require("../middlewares/validate")
const schemas = require("../validations/Configurations")
//Controller
const ConfigurationController = require("../controllers/ConfigurationController")

router.route("/").get(staticTokenAuthenticate, ConfigurationController.getAllConfigurations)
router.route("/sorted").get(authenticate, ConfigurationController.getAllConfigurationsSortedByCreateDate)
router.route("/").post(authenticate,validate(schemas.add), ConfigurationController.addConfiguration)
router.route("/:id").delete(authenticate,validate(schemas.remove), ConfigurationController.deleteConfiguration)
router.route("/:id").put(authenticate,validate(schemas.update), ConfigurationController.updateConfiguration)

module.exports = router;