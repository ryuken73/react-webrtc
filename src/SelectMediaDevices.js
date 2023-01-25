import React from 'react'

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

export default function SelectMediaDevices(props) {
    const { player } = props;
    const [devices, setDevices] = React.useState([]);
    const getMediaDevices = React.useCallback(() => {
        async function getConnectedDevices(type) {
            const devices = await navigator.mediaDevices.enumerateDevices();
            console.log(devices)
            return devices.filter(device => device.kind === type)
        }
        getConnectedDevices('videoinput')
        .then(async (devices) => {
            if(devices && devices.length > 0){
                const stream = await openCamera(devices[0].deviceId, 1280, 720);
                player.current.srcObject = stream;
            }
            setDevices(devices);
        });
    }, [])
    console.log(devices)
    return (
        <>
            <button onClick={getMediaDevices}>refresh media deivces</button>
            {devices.map(device => (
                <div key={device.deviceId}>{device.label}</div>
            ))}
        </>
    )
}
