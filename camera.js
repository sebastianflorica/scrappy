const video = document.querySelector('video');
const canvas = document.querySelector('canvas');
const screenshotImage = document.querySelector('img');

async function askPermission() {
  if('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices){
    const stream = await navigator.mediaDevices.getUserMedia({
      video: {
        width: { 
          min: 375,
          ideal: 375,
          max: 375,
        },
        height: {
          min: 700,
          ideal: 1080,
          max: 700
        },
        facingMode: 'environment'
      }
    });
    video.srcObject = stream;
  }
}

async function screenshot() {
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  canvas.getContext('2d').drawImage(video, 0, 0);
  canvas.classList.remove('d-none');
  // screenshotImage.src = canvas.toDataURL('image/webp');
  // screenshotImage.classList.remove('d-none');
  video.classList.add('d-none');
  await post('post');
}

async function post(method='post') {

  let blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));

  let formdata = new FormData();
  formdata.append('image', blob, 'image.png');
  formdata.append('coords[0]', 10.187791);
  formdata.append('coords[1]', 56.172292);
  formdata.append('type', 'small');
  
  let tags = await fetch('https://visual-recognition-service.herokuapp.com', {
    method: 'POST',
    body: formdata
  });
  
  tags = await tags.json();
  let stringo = tags.images[0].classifiers[0].classes.map((item) => {
    return item.class;
  }).join(',');

  formdata.append('tags', stringo);

document.getElementById('absolutext').textContent = stringo;
  let response = await fetch('http://134.209.242.120/upload', {
    method: 'POST',
    body: formdata
  });
  console.log(response);

  // The rest of this code assumes you are not using a library.
  // It can be made less wordy if you use one.
  // const form = document.createElement('form');
  // form.method = method;
  // form.action = 'http://134.209.242.120/upload';

  // const image = document.createElement('input');
  // image.type = 'file';
  // image.name = 'image';
  // image.value = canvas.toDataURL('image/png');
  // form.appendChild(image);
  
  // const coords_1 = document.createElement('input');
  // coords_1.type = 'text';
  // coords_1.name = 'coords[0]';
  // coords_1.value = '10.16201';
  // form.appendChild(coords_1);

  // const coords_2 = document.createElement('input');
  // coords_2.type = 'text';
  // coords_2.name = 'coords[1]';
  // coords_2.value = '56.169';
  // form.appendChild(coords_2);

  // const type = document.createElement('input');
  // type.type = 'text';
  // type.name = 'type';
  // type.value = 'small';
  // form.appendChild(type);

  // document.body.appendChild(form);
  // form.submit();
}

askPermission();