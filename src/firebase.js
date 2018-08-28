import * as firebase from 'firebase';

var config = {
    apiKey: "AIzaSyAeYQ2gRNA28jt5hejGt4gjj0s02d2aLwA",
    authDomain: "marksmanfm-52dc6.firebaseapp.com",
    databaseURL: "https://marksmanfm-52dc6.firebaseio.com",
    projectId: "marksmanfm-52dc6",
    storageBucket: "marksmanfm-52dc6.appspot.com",
    messagingSenderId: "182840990388"
}
firebase.initializeApp(config);

export const firestore = firebase.firestore();
export const auth = firebase.auth();
export const storage = firebase.storage() 
const settings = {/* your settings... */ timestampsInSnapshots: true};
firestore.settings(settings);
