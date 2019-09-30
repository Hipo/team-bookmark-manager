// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// To parse links in texts
const getUrls = require('get-urls');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp();

// Get a database reference
var db = admin.database();
var dbRef = db.ref();

// Gets messages in slack channel
// Detects links in message
// Saves links into db
exports.saveLinks = functions.https.onRequest((request, response) => {
	if (request) {
		const body = request.body;
		const text = request.body.event.text;
		const channelId = request.body.event.channel;
		const bodyJSON = JSON.stringify(request.body);
		const linksSet = getUrls(text);

		console.log("Request body: " + bodyJSON);		
		console.log("Text: " + text);

		var bookmarkRef = dbRef.child("bookmark_"+ body.event_id);
		var iterator = linksSet.values();
		var links = "";

		for(let link of iterator) {	
			links = links + link + ";";
		}

		if (links !== "") {
			bookmarkRef.set({
				channel: channelId,
				links: links
			});			
		}

		console.log("Links: " + links);

		response.status(200).send(request.body);
		return
	}

	console.log("Request Error...");
	throw response.status(500);	
});

exports.helloWorld = functions.https.onRequest((request, response) => {
	response.send("Hello from Firebase!");
});