import firebase from '@/firebase/initializingFirebase.ts';

const storage = firebase.storage();
const storageRef = storage.ref();

// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

class MyUploadAdapter {
  private loader;
  private url: string;
  private xhr;

  constructor(loader, url) {
    // The FileLoader instance to use during the upload. It sounds scary but do not
    // worry — the loader will be passed into the adapter later on in this guide.
    this.loader = loader;

    // The upload URL in your server back-end. This is the address the XMLHttpRequest
    // will send the image data to.
    this.url = url;
  }

  // Starts the upload process.
  public async upload() {
    // return await storage.ref().child('asllldf').put(this.loader.file);

    // downloadUrl = await firebase.storage.ref.put(File);

    console.log('file', this.loader.id);
    const fileRef = storageRef.child(`diary-temp/${this.loader.id}`);

    const snapshot = await fileRef.put(this.loader.file);
    console.log('Uploaded a blob or file!');
    console.log('snapshot', snapshot);

    const url = await fileRef.getDownloadURL();
    console.log('url', url);

    // `url` is the download URL for 'images/stars.jpg'
    // This can be downloaded directly:
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    xhr.onload = (event) => {
      const blob = xhr.response;
    };
    xhr.open('GET', url);
    xhr.send();
    console.log('send');

    // Or inserted into an <img> element:
    // var img = document.getElementById('myimg');
    // img.src = url;

    return new Promise((resolve, reject) => {
      //   this._initRequest();
      //   this._initListeners(resolve, reject);
      //   this._sendRequest();
      resolve({
        default: url,
      });
    });
  }

  // Aborts the upload process.
  public abort() {
    // if (this.xhr) {
    //   this.xhr.abort();
    // }
    console.log(new Error('asdf!!!!!'));
    alert('asdf!!!!!');
  }

  // Initializes the XMLHttpRequest object using the URL passed to the constructor.
  public _initRequest() {
    const xhr = (this.xhr = new XMLHttpRequest());

    // Note that your request may look different. It is up to you and your editor
    // integration to choose the right communication channel. This example uses
    // the POST request with JSON as a data structure but your configuration
    // could be different.
    xhr.open('POST', this.url, true);
    xhr.responseType = 'json';
  }

  // Initializes XMLHttpRequest listeners.
  public _initListeners(resolve, reject) {
    const xhr = this.xhr;
    const loader = this.loader;
    const genericErrorText = 'Couldn\'t upload file:' + ` ${loader.file.name}.`;

    xhr.addEventListener('error', () => reject(genericErrorText));
    xhr.addEventListener('abort', () => reject());
    xhr.addEventListener('load', () => {
      const response = xhr.response;

      // This example assumes the XHR server's "response" object will come with
      // an "error" which has its own "message" that can be passed to reject()
      // in the upload promise.
      //
      // Your integration may handle upload errors in a different way so make sure
      // it is done properly. The reject() function must be called when the upload fails.
      if (!response || response.error) {
        return reject(
          response && response.error ? response.error.message : genericErrorText,
        );
      }

      // If the upload is successful, resolve the upload promise with an object containing
      // at least the "default" URL, pointing to the image on the server.
      // This URL will be used to display the image in the content. Learn more in the
      // UploadAdapter#upload documentation.
      resolve({
        default: response.url,
      });
    });

    // Upload progress when it is supported. The FileLoader has the #uploadTotal and #uploaded
    // properties which are used e.g. to display the upload progress bar in the editor
    // user interface.
    if (xhr.upload) {
      xhr.upload.addEventListener('progress', (evt) => {
        if (evt.lengthComputable) {
          loader.uploadTotal = evt.total;
          loader.uploaded = evt.loaded;
        }
      });
    }
  }

  // Prepares the data and sends the request.
  public async _sendRequest() {
    // Prepare the form data.
    const data = new FormData();
    data.append('upload', this.loader.file);

    // Send the request.
    this.xhr.send(data);
  }
}

function MyCustomUploadAdapterPlugin(editor) {
  editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
    // Configure the URL to the upload script in your back-end here!
    return new MyUploadAdapter(
      loader,
      'gs://gaesory-ec24c.appspot.com/jaejong',
    );
  };
}

export default MyCustomUploadAdapterPlugin;

// ClassicEditor
//     .create( document.querySelector( '#editor' ), {
//         extraPlugins: [ MyCustomUploadAdapterPlugin ],

//         // ...
//     } )
//     .catch( error => {
//         console.log( error );
//     } );
