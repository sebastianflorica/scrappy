const video = document.querySelector('video');
const canvas = document.querySelector('canvas');
const screenshotImage = document.querySelector('img');

async function askPermission() {
  if('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices){
    const stream = await navigator.mediaDevices.getUserMedia({
      video: {
        width: { 
          min: 1280,
          ideal: 1920,
          max: 2560,
        },
        height: {
          min: 720,
          ideal: 1080,
          max: 1440
        },
        facingMode: 'environment'
      }
    });
    video.srcObject = stream;
  }
}

function screenshot() {
  console.log('fuck');
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  canvas.getContext('2d').drawImage(video, 0, 0);
  canvas.classList.remove('d-none');
  // screenshotImage.src = canvas.toDataURL('image/webp');
  // screenshotImage.classList.remove('d-none');
  video.classList.add('d-none');
  post('post');
}

function postCanvasToURL() {
  // Convert canvas image to Base64
  var img = canvas.toDataURL();
  // Convert Base64 image to binary
  return dataURItoBlob(img);
}

function dataURItoBlob(dataURI) {
// convert base64/URLEncoded data component to raw binary data held in a string
var byteString;
if (dataURI.split(',')[0].indexOf('base64') >= 0)
    byteString = atob(dataURI.split(',')[1]);
else
    byteString = unescape(dataURI.split(',')[1]);
// separate out the mime component
var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
// write the bytes of the string to a typed array
var ia = new Uint8Array(byteString.length);
for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
}
return new Blob([ia], {type:mimeString});
}

function post(method='post') {

  // The rest of this code assumes you are not using a library.
  // It can be made less wordy if you use one.
  const form = document.createElement('form');
  form.method = method;
  form.action = 'http://134.209.242.120/upload';

  const image = document.createElement('input');
  image.type = 'file';
  image.name = 'image';
  image.value = canvas.toDataURL('image/png');
  form.appendChild(image);
  
  const coords_1 = document.createElement('input');
  coords_1.type = 'text';
  coords_1.name = 'coords[0]';
  coords_1.value = '10.16201';
  form.appendChild(coords_1);

  const coords_2 = document.createElement('input');
  coords_2.type = 'text';
  coords_2.name = 'coords[1]';
  coords_2.value = '56.169';
  form.appendChild(coords_2);

  const type = document.createElement('input');
  type.type = 'text';
  type.name = 'type';
  type.value = 'small';
  form.appendChild(type);

  document.body.appendChild(form);
  form.submit();
}

askPermission();