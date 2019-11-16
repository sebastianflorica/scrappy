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
        }
      }
    })
  }
}

askPermission();