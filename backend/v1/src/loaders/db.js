const admin = require('firebase-admin');
const connectDB = async () => {
    admin.initializeApp({
        credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_CONFIG)),
    });
    if (admin.apps.length) {
        console.log('Firebase Admin SDK is initialized');
    } else {
        console.log('Firebase Admin SDK is not initialized');
    }
}

module.exports = {
    connectDB,
};
