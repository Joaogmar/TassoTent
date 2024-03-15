const admin = require('firebase-admin');
const fs = require('fs');

try {
    const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
    const serviceAccountContent = fs.readFileSync(serviceAccountPath, 'utf8');
    const serviceAccount = JSON.parse(serviceAccountContent);

    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: process.env.FIREBASE_DATABASE_URL
    });

    module.exports = admin;
} catch (error) {
    console.error('Error initializing Firebase Admin SDK:', error);
    process.exit(1);
}
