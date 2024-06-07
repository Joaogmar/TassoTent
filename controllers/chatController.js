const admin = require('../config/firebaseConfig');

const db = admin.database();

const isAuthenticated = (req, res, next) => {
    if (req.session && req.session.user) {
        return next();
    } else {
        res.status(401).send('Unauthorized');
    }
};

const sendMessage = (req, res) => {
    const { chatId, text } = req.body;
    const sender = req.session.user.username; 
    const timestamp = new Date().toISOString();
    const newMessageKey = db.ref().child('chats').child(chatId).child('messages').push().key;

    const messageData = {
        sender,
        text,
        timestamp
    };

    let updates = {};
    updates[`/chats/${chatId}/messages/${newMessageKey}`] = messageData;

    db.ref().update(updates, (error) => {
        if (error) {
            res.status(500).send("Error sending message");
        } else {
            res.status(200).send("Message sent");
        }
    });
};

const getMessages = (req, res) => {
    const chatId = req.params.chatId;
    db.ref(`/chats/${chatId}/messages`).once('value', (snapshot) => {
        if (snapshot.exists()) {
            res.status(200).json(snapshot.val());
        } else {
            res.status(404).send("No messages found");
        }
    });
};

module.exports = {
    isAuthenticated,
    sendMessage,
    getMessages
};