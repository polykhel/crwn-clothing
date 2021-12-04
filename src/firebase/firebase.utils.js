import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyCzecol2JWhc-2GBM9R3-Hxdb0Ab1APIHI',
  authDomain: 'crwn-db-db96e.firebaseapp.com',
  projectId: 'crwn-db-db96e',
  storageBucket: 'crwn-db-db96e.appspot.com',
  messagingSenderId: '216016349309',
  appId: '1:216016349309:web:5f3955f2f586144e526914',
  measurementId: 'G-5RW88JYGXS',
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (err) {
      console.log('error creating user', err.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
