const admin = require("firebase-admin");
const {formatDate} = require("../scripts/utils/timeConverter");

class ConfigurationService {
    constructor() {
        this.configCollection = admin.firestore().collection('configurations');
    }

    async getAllConfigurations() {
        try {
            const snapshot = await this.configCollection.get();
            const configurations = [];

            snapshot.forEach((doc) => {
                const data = doc.data();
                const formattedCreateDate = formatDate(data.createDate);

                configurations.push({
                    id: doc.id,
                    ...data,
                    createDate: formattedCreateDate,
                });
            });

            return configurations;
        } catch (error) {
            console.error('Error fetching configurations:', error);
            throw error;
        }
    }

    async getAllConfigurationsSortedByCreateDate() {
        try {
            const snapshot = await this.configCollection.orderBy('createDate', 'asc').get();
            const configurations = [];

            snapshot.forEach((doc) => {
                const data = doc.data();
                const formattedCreateDate = formatDate(data.createDate);

                configurations.push({
                    id: doc.id,
                    ...data,
                    createDate: formattedCreateDate,
                });
            });

            return configurations;
        } catch (error) {
            console.error('Error fetching configurations:', error);
            throw error;
        }
    }


    async addConfiguration(description, paramKey, value) {
        try {
            const createDate = admin.firestore.Timestamp.now();
            const updatedAt = admin.firestore.Timestamp.now();
            const configurationData = {
                createDate,
                description,
                paramKey,
                value,
                updatedAt,
            };
            const docRef = await this.configCollection.add(configurationData);
            const newDoc = await docRef.get();
            return {
                id: newDoc.id,
                description: newDoc.get('description'),
                paramKey: newDoc.get('paramKey'),
                value: newDoc.get('value'),
                createDate: formatDate(newDoc.get('createDate')),
                updatedAt: formatDate(newDoc.get('updatedAt')),
            };
        } catch (error) {
            console.error('Error adding configuration:', error);
            throw error;
        }
    }


    async deleteConfiguration(configId) {
        try {
            const configDoc = await this.configCollection.doc(configId).get();

            if (!configDoc.exists) {
                console.log(`Configuration with ID ${configId} does not exist.`);
                throw new Error(`Configuration with ID ${configId} does not exist.`);
            }

            await this.configCollection.doc(configId).delete();
            console.log('Configuration deleted successfully.');
        } catch (error) {
            console.error('Error deleting configuration:', error);
            throw error;
        }
    }


    async updateConfiguration(configId, newData) {
        const transactionResult = await admin.firestore().runTransaction(async (transaction) => {
            const configDoc = await transaction.get(this.configCollection.doc(configId));
            if (!configDoc.exists) {
                throw new Error(`Configuration with ID ${configId} does not exist.`);
            }
            const currentData = configDoc.data();
            if (currentData.updatedAt.toMillis() > newData.updatedAt._seconds * 1000 + Math.round(newData.updatedAt._nanoseconds / 1e6)) {
                throw new Error('Conflict: Document has been modified by another transaction.');
            }
            transaction.update(this.configCollection.doc(configId), {
                ...newData,
                updatedAt: admin.firestore.Timestamp.now(),
            });
            return 'Configuration updated successfully.';
        });

        console.log(transactionResult);
    }
}

module.exports = new ConfigurationService();
