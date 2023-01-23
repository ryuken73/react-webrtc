async function getConnectedDevices(type) {
    const devices = await navigator.mediaDevices.enumerateDevices();
    console.log(devices)
    return devices.filter(device => device.kind === type)
}
async function openCamera(cameraId, minWidth, minHeight) {
    const constraints = {
        'audio': {'echoCancellation': true},
        'video': {
            'deviceId': cameraId,
            'width': {'min': minWidth},
            'height': {'min': minHeight}
            }
        }

    return await navigator.mediaDevices.getUserMedia(constraints);
}
async function playVideoFromStream(stream) {
    try {
        // const constraints = {'video': true, 'audio': true};
        // const stream = await navigator.mediaDevices.getUserMedia(constraints);
        const videoElement = document.querySelector('video#localVideo');
        videoElement.srcObject = stream;
    } catch(error) {
        console.error('Error opening video camera.', error);
    }
}
// async function main() {
//     const cameras = await getConnectedDevices('videoinput');
//     if (cameras && cameras.length > 0) {
//         // Open first available video camera with a resolution of 1280x720 pixels
//         console.log(cameras)
//         const stream = await openCamera(cameras[0].deviceId, 1280, 720);
//         playVideoFromStream(stream);
//     }
// }
