import firebase from 'firebase';

const firebaseApp = firebase.initializeApp ({
    apiKey: "AIzaSyCH8WglFpWp08myhSX-pN4wdjqX7hGLf9w",
    authDomain: "instagram-app-4f910.firebaseapp.com",
    projectId: "instagram-app-4f910",
    storageBucket: "instagram-app-4f910.appspot.com",
    messagingSenderId: "855473389639",
    appId: "1:855473389639:web:d758ccf25b22052565b162"
  });

  const db = firebase.firestore();
  const  auth = firebase.auth();
  const storage = firebase.storage();

  export {db,auth,storage};
  