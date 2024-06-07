require('dotenv').config();
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const { initializeApp } = require("firebase/app");
const firebaseConfig = require('./config/dbconfig');
const routes = require('./routes/routes');
const admin = require('./config/firebaseConfig'); 
const app = express();
const port = 3000;
const firebaseApp = initializeApp(firebaseConfig);

app.use(express.static('public'));
app.use(bodyParser.json());

app.use(session({
    secret: 'your-secret-key', 
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 86400000 }
}));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/start.html');
});

app.use('/', routes);

app.use((req, res, next) => {
    console.log(`Incoming Request URL: ${req.url}`);
    console.log('Headers:', req.headers);
    console.log('Body:', req.body);
    next();
});

let sensorDataStorage = [];

app.post('/sensorData', (req, res) => {
    const sensorData = req.body;
    const temperature = sensorData.temperature;
    const humidity = sensorData.humidity;
    const motionDetected = sensorData.motionDetected;
    const gasValue = sensorData.gasValue;
    const gpsData = sensorData.gpsData;
  
    const gasDescription = gasValue >= 800 ? 'Gás tóxico detectado' : 'Gás não detectado';
  
    console.log(`Received sensor data: temperature: ${temperature}, humidity: ${humidity}, motionDetected: ${motionDetected}, gasDescription: ${gasDescription}, gpsData: ${gpsData.latitude}, ${gpsData.longitude}`);

    sensorDataStorage.push({
        temperature,
        humidity,
        motionDetected,
        gasDescription,
        gpsData
    });

    res.status(200).send('OK');
});

app.get('/sensorData', (req, res) => {
    res.status(200).json(sensorDataStorage);
});

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
