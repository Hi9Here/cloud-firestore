var firestore = require('firebase-functions/lib/providers/datastore');
const functions = require('firebase-functions');
var admin = require("firebase-admin");
const Firestore = require('@google-cloud/firestore');

// Get project ID from environment
var firestoreId = process.env.GCLOUD_PROJECT;

var firestoreOptions = {
    projectId: firestoreId,
}

// Copies all the data from a document
exports.makeRiver = firestore
    .document('card/{anyDocument}')
    .onWrite(event => {

        // Get all the values representing the document
        var fullriver = event.data.data();

        // console log it out
        console.log('All card data copied', fullriver)

    });

// Copies to all the data from one document to another inside the card collection
exports.addRivervalue = firestore
    .document('card/{anyDocument}')
    .onWrite(event => {

        // got all the values from the card collection
        var newvalue = event.data.data();

        // console log it out we have the doc
        console.log('Got the new card object values', newvalue)

        // add the object to card collections
        return firestore.document('card/{anyDocument}').set(newvalue);


    });

// Copies only one value from a document
exports.makeRivervalue = firestore
    .document('card/{anyDocument}')
    .onWrite(event => {

        // just get one value from a document
        var rivervalue = event.data.get('perfect');

        // console log it out
        console.log('Just one value created under perfect', rivervalue)

    });