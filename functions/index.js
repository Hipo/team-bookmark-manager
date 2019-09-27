// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp();

exports.saveLinks = functions.https.onRequest((request, response) => {
	if (request) {
		console.log("Request body: " + JSON.stringify(request.body));		
		console.log("Text: " + request.body.event.text);
		response.status(200).send(request.body);
	} else {
		console.log("Request Error...");
		throw response.status(500);
	}
});

exports.helloWorld = functions.https.onRequest((request, response) => {
	response.send("Hello from Firebase!");
});