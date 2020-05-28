import * as firebase from 'firebase';
import 'firebase/firebase-firestore';
//hi this is emily
// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyD6JBciCGjA6ZpuYVXIYyA8lAVqT-geHyc",
  authDomain: "teamrefugees-82cab.firebaseapp.com",
  databaseURL: "https://teamrefugees-82cab.firebaseio.com",
  projectId: "teamrefugees-82cab",
  storageBucket: "teamrefugees-82cab.appspot.com",
  messagingSenderId: "2328399168",
  appId: "1:2328399168:web:bd03a78c787595936efea5"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const rootRef = firebase.firestore();

export default rootRef;
