import _ from 'lodash';
import firebase from './initializingFirebase';

const db = firebase.firestore();
const settings = {
  /* your settings... */
  timestampsInSnapshots: true,
};
db.settings(settings);

class CloudFirestore {
  public static loginUser(user: { uid: string }) {
    db.collection('users')
      .doc(user.uid)
      .set({
        uid: user.uid,
      })
      .then(() => {
        console.log('Document successfully written!');
      })
      .catch((error) => {
        console.error('Error writing document: ', error);
      });
  }

  public static getUser(uid: string) {
    const docRef = db.collection('users').doc(uid);

    docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          console.log('Document data:', doc.data());
          return doc.data();
        }
        // doc.data() will be undefined in this case
        console.log('No such document!');
        return null;
      })
      .catch((error) => {
        console.log('Error getting document:', error);
      });
  }

  public static async setMemo(memoContentsString: string) {
    const user = firebase.auth().currentUser;

    if (!_.isNil(user)) {
      const ref = db
        .collection('users')
        .doc(user.uid)
        .collection('memo');

      try {
        const docRef = await ref.add({ memo: memoContentsString });
        console.log('Document written with ID: ', docRef.id);
      } catch (error) {
        console.error('Error adding document: ', error);
      }
    } else {
      console.error('don t have user!');
    }
  }

  public static async getMemo() {
    const user = firebase.auth().currentUser;
    const memos: { [index: string]: string } = {};

    if (!_.isNil(user)) {
      const querySnapshot = await db
        .collection('users')
        .doc(user.uid)
        .collection('memo')
        .get();

      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        //   console.log(doc.id, ' => ', doc.data());
        // array 로 만든 다음에, 해당 array 대로, 사각형에 맞춰 그린다.
        // 클릭시 해당 내용만 있는 페이지로 넘어간다
        memos[doc.id] = doc.data().memo;
      });
      console.log('memos in database : ', memos);
    } else {
      console.log('no logined user');
    }
    return memos;
  }

  public static async deleteMemo(memoId: string) {
    const user = firebase.auth().currentUser;

    if (!_.isNil(user)) {
      const memoRef = db
        .collection('users')
        .doc(user.uid)
        .collection('memo')
        .doc(memoId);
      try {
        await memoRef.delete();
        console.log('Document successfully deleted!');
      } catch (error) {
        console.error('Error removing document: ', error);
      }
    } else {
      console.error('don t have user');
    }
  }

  public static async setDiary(diaryData: {
    title: string;
    contents: string;
    index: number;
  }) {
    const user = firebase.auth().currentUser;

    if (!_.isNil(user)) {
      const ref = db
        .collection('users')
        .doc(user.uid)
        .collection('diary');
      try {
        const docRef = await ref.add({
          title: diaryData.title,
          contents: diaryData.contents,
          index: diaryData.index,
          date: new Date().getTime(),
        });
        console.log('Document written with ID: ', docRef.id);
      } catch (error) {
        console.error('Error adding document: ', error);
        throw new Error('setDiary error');
      }
    } else {
      console.error('do not have user');
      throw new Error('setDiary error');
    }
  }

  public static async getDiary(diaryId: string) {
    const user = firebase.auth().currentUser;
    let diary;
    const diaries: { [index: string]: any } = {};

    if (!_.isNil(user)) {
      if (!_.isNil(diaryId)) {
        const docRef = db
          .collection('users')
          .doc(user.uid)
          .collection('diary')
          .doc(diaryId);
        try {
          const doc = await docRef.get();
          if (doc.exists) {
            console.log('Document data:', doc.data());
            diary = doc.data();
            return diary;
          } else {
            // doc.data() will be undefined in this case
            console.log('No such document!');
          }
        } catch (error) {
          console.log('Error getting document:', error);
        }
      } else {
        const querySnapshot = await db
          .collection('users')
          .doc(user.uid)
          .collection('diary')
          .get();

        querySnapshot.forEach((doc) => {
          diaries[doc.id] = doc.data();
        });
        console.log('diaries in database : ', diaries);
        return diaries;
      }
    } else {
      console.error('no logined user');
    }
    return null;
  }

  public static async getDiaryPerPage(pageData: {
    pageNumber: number;
    lastDiaryIndex: number;
  }): object[] {
    const user = firebase.auth().currentUser;
    const diaries: object[] = [];

    if (!_.isNil(user)) {
      const diaryFromDb = await db
        .collection('users')
        .doc(user.uid)
        .collection('diary')
        .orderBy('index', 'desc')
        .startAt(pageData.lastDiaryIndex - (pageData.pageNumber - 1) * 10)
        .limit(10)
        .get();

      diaryFromDb.forEach((doc) => {
        const diaryData: { id: string } = { id: '' };
        Object.assign(diaryData, doc.data());
        diaryData.id = doc.id;
        diaries.push(diaryData);
      });
      // console.log('diaryFromDb diaries', diaries);
      return diaries;
    } else {
      console.error('no logined user');
      return null;
    }
  }

  public static async getDiaryLastIndex() {
    const user = firebase.auth().currentUser;
    let lastDiary = null;
    let lastDiaryIndex = null;

    if (!_.isNil(user)) {
      lastDiary = await db
        .collection('users')
        .doc(user.uid)
        .collection('diary')
        .orderBy('index', 'desc')
        .limit(1)
        .get();

      lastDiaryIndex = lastDiary.docs[0].data().index;
      return lastDiaryIndex;
    }
    return null;
  }

  public static async reviseDiary(diaryData: {
    id: string;
    title: string;
    contents: string;
  }) {
    const user = firebase.auth().currentUser;

    if (!_.isNil(user)) {
      const ref = db
        .collection('users')
        .doc(user.uid)
        .collection('diary')
        .doc(diaryData.id) as any;

      ref
        .update({
          title: diaryData.title,
          contents: diaryData.contents,
        })
        .then(() => {
          console.log('Diary successfully updated!');
        })
        .catch((error) => {
          // The document probably doesn't exist.
          console.error('Error updating diary: ', error);
        });
    }
  }

  public static async deleteDiary(id: string) {
    const user = firebase.auth().currentUser;

    if (!_.isNil(user)) {
      const ref = db
        .collection('users')
        .doc(user.uid)
        .collection('diary')
        .doc(id);

      try {
        await ref.delete();
        console.log('Diary successfully deleted!');
      } catch (error) {
        throw error;
      }
    }
  }
}

// const database = new CloudFirestore();

export default CloudFirestore;
