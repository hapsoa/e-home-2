import _ from 'lodash';
import firebase from './initializingFirebase';

const db = firebase.firestore();
const settings = {
    /* your settings... */
    timestampsInSnapshots: true,
  };
db.settings(settings);

// db.collection('users')
//     .doc(user.uid)
//     .collection('diary')
