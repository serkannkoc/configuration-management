const { Timestamp } = require('firebase-admin').firestore;

class ConfigurationModel {
    constructor(description, paramKey, value) {
        this.createDate = Timestamp.now();
        this.description = description;
        this.paramKey = paramKey;
        this.value = value;
    }
}

module.exports = ConfigurationModel;
