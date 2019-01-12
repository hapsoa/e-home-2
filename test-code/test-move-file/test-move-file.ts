// import axios from 'axios';

// Imports the Google Cloud client library
// const Storage = require('@google-cloud/storage');

// Creates a client
// const storage = new Storage();

// 작동 안되는 코드
export default {
  methods: {
    moveFile() {
      console.log('move');
      // 1
      // axios
      //   .post(
      //     'https://www.googleapis.com/storage/v1/b/
      // e-home-2d448.appspot.com/o/혜진이.png/copyTo/b/
      // e-home-2d448.appspot.com/o/destinationObject',
      //   )
      //   .then(function(response) {
      //     console.log(response);
      //   })
      //   .catch(function(error) {
      //     console.log(error);
      //   });

      // 2
      /**
       * TODO(developer): Uncomment the following lines before running the sample.
       */
      // const bucketName = 'Name of a bucket, e.g. my-bucket';
      // const srcFilename = 'File to move, e.g. file.txt';
      // const destFilename = 'Destination for file, e.g. moved.txt';

      // const bucketName = 'e-home-2d448.appspot.com';
      // const srcFilename = '혜진이.png';
      // const destFilename = 'vczx';

      // Moves the file within the bucket
      // storage
      //   .bucket(bucketName)
      //   .file(srcFilename)
      //   .move(destFilename)
      //   .then(() => {
      //     console.log(
      //       `gs://${bucketName}/${srcFilename} moved to gs://${bucketName}/${destFilename}.`,
      //     );
      //   })
      //   .catch((err) => {
      //     console.error('ERROR:', err);
      //   });
    },
  },
};
