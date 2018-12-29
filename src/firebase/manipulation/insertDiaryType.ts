import _ from 'lodash';
import firebase from '../initializingFirebase';

const db = firebase.firestore();
const settings = {
    /* your settings... */
    timestampsInSnapshots: true,
  };
db.settings(settings);

db.collection('users')
    .doc('UiDvH9TJTLN7QxSHz8KzGPzan1O2')
    .collection('diary')
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            db.collection('users')
          .doc('UiDvH9TJTLN7QxSHz8KzGPzan1O2')
          .collection('diary')
          .doc(doc.id)
          .update({
            type: 'ckeditor',
          })
          .then(() => {
            console.log('processed');
          })
          .catch((error) => {
            console.error('Error updating document: ', error);
          });
        });
    })
    .catch((error) => {
        console.error('Error writing document: ', error);
    });
