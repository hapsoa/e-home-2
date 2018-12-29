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
    .orderBy('date')
    .get()
    .then((querySnapshot) => {
      let indexNum: number = 0;
      querySnapshot.forEach((doc) => {
        db.collection('users')
          .doc('UiDvH9TJTLN7QxSHz8KzGPzan1O2')
          .collection('diary')
          .doc(doc.id)
          .update({
            index: indexNum,
          })
          .then(() => {
            console.log('indexing');
          })
          .catch((error) => {
            console.error('Error updating document: ', error);
          });
        indexNum++;
      });
      console.log('ypyp');
    })
    .catch((error) => {
      console.error('Error writing document: ', error);
    });





// Create a reference to the SF doc.
// var diaryDocRef = db.collection('users')
//   .doc('UiDvH9TJTLN7QxSHz8KzGPzan1O2')
//   .collection('diary')
//   .orderBy('date');

// // Uncomment to initialize the doc.
// // sfDocRef.set({ population: 0 });

// db.runTransaction(function(transaction) {
//     // This code may get re-run multiple times if there are conflicts.
//     return transaction.get(diaryDocRef).then(function(sfDoc) {
//         if (!sfDoc.exists) {
//             throw "Document does not exist!";
//         }

//         var newPopulation = sfDoc.data().population + 1;
//         transaction.update(diaryDocRef, { population: newPopulation });
//     });
// }).then(function() {
//     console.log("Transaction successfully committed!");
// }).catch(function(error) {
//     console.log("Transaction failed: ", error);
// });


