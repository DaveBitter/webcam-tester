import 'regenerator-runtime/runtime';

document.documentElement.dataset.hasJs = 'true';

(async () => {
    const root = document.querySelector('[data-webcam]');
    const selectElement = root.querySelector('[data-select]');
    const videoElement = root.querySelector('[data-video]');
    const mediaDevices = await navigator.mediaDevices.enumerateDevices();
    const videoDevices = mediaDevices.filter(mediaDevice => mediaDevice.kind === 'videoinput');
    const controlsVisibilityTimeout = 2000;
    let currentStream;
    let count = 0;

    const stopMediaTracks = stream => stream.getTracks().forEach(track => track.stop());

    let timeout;
    const onPointerMove = () => {
        selectElement.dataset.controlsVisible = 'true';
        clearTimeout(timeout);

        timeout = setTimeout(() => {
            selectElement.dataset.controlsVisible = 'false';
        }, controlsVisibilityTimeout);
    }

    const onSelect = event => {
        if (typeof currentStream !== 'undefined') {
            stopMediaTracks(currentStream);
        }

        localStorage.setItem('selectedVideoDeviceId', event.target.value);

        navigator.mediaDevices
            .getUserMedia({
                video: { deviceId: { exact: event.target.value } },
                audio: false
            })
            .then(stream => {
                currentStream = stream;
                videoElement.srcObject = stream;
                return navigator.mediaDevices.enumerateDevices();
            })
            .catch(error => {
                console.error(error);
            });
    }

    const selectDefaultOption = () => {
        if (!videoDevices.length) { return; }

        const cachedVideoDeviceId = localStorage.getItem('selectedVideoDeviceId');
        const cachedVideoDeviceIdFound = cachedVideoDeviceId && mediaDevices.find(mediaDevice => mediaDevice.deviceId === cachedVideoDeviceId);
        const defaultDeviceId = cachedVideoDeviceIdFound ? cachedVideoDeviceId : (!!videoDevices.length && videoDevices[0].deviceId);

        if (defaultDeviceId) {
            selectElement.value = defaultDeviceId;
            setTimeout(() => selectElement.dispatchEvent(new Event('change')));
        }
    };

    const renderOptions = () => videoDevices.forEach((videoDevice) => {
        const option = document.createElement('option');
        const label = videoDevice.label || `Camera ${count++}`;
        const textNode = document.createTextNode(label);

        option.value = videoDevice.deviceId;
        option.appendChild(textNode);
        selectElement.appendChild(option);
    })

    selectElement.addEventListener('change', onSelect);
    root.addEventListener('pointermove', onPointerMove);

    renderOptions();
    selectDefaultOption();
})()