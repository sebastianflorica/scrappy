if('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices){
  const stream = await navigator.mediaDevices.getUserMedia({video: true})
}