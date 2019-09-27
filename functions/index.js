// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// To parse links in texts
const getUrls = require('get-urls');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp();

// Gets messages in slack channel
// Detects links in message
// Saves links into db
exports.saveLinks = functions.https.onRequest((request, response) => {
	if (request) {
		const body = request.body;
		const text = request.body.event.text;
		const bodyJSON = JSON.stringify(request.body);
		const linksSet = getUrls(text);
		const linksJSON = JSON.stringify(linksSet);

		console.log("Request body: " + bodyJSON);		
		console.log("Text: " + text);
		// console.log("Links in text: " + linksJSON);

		var iterator = linksSet.values();
		for(let value of iterator) {
		 	console.log("Link: " + value); 
		}

		response.status(200).send(request.body);
	} else {
		console.log("Request Error...");
		throw response.status(500);
	}
});

exports.helloWorld = functions.https.onRequest((request, response) => {
	response.send("Hello from Firebase!");
});