const admin = require('../config/firebaseConfig');
const db = admin.database();

const receiveSensorData = (req, res) => {
    const sensorData = req.body;
    const tentId = sensorData.tentId;
    const temperature = sensorData.temperature;
    const humidity = sensorData.humidity;
    const motionDetected = sensorData.motionDetected;
    const gasValue = sensorData.gasValue;
    const gpsData = sensorData.gpsData;

    const gasDescription = gasValue >= 800 ? 'Gás tóxico detectado' : 'Gás não detectado';

    console.log(`Received sensor data: temperature: ${temperature}, humidity: ${humidity}, motionDetected: ${motionDetected}, gasValue: ${gasValue}, gasDescription: ${gasDescription}, gpsData: ${gpsData.latitude}, ${gpsData.longitude}`);

    const sensorDataRef = db.ref(`sensorData/${tentId}`);
    sensorDataRef.set({
        temperature,
        humidity,
        motionDetected,
        gasValue,
        gasDescription,
        gpsData
    }, (error) => {
        if (error) {
            res.status(500).send("Error storing sensor data");
        } else {
            res.status(200).send("Sensor data stored");
        }
    });
};

const getSensorData = (req, res) => {
    const tentId = req.params.tentId; 
    db.ref(`/sensorData/${tentId}`).once('value', (snapshot) => {
        if (snapshot.exists()) {
            res.status(200).json(snapshot.val());
        } else {
            res.status(404).send("No sensor data found");
        }
    });
};

module.exports = {
    receiveSensorData,
    getSensorData
};