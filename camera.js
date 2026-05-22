window.addEventListener('load', async () => {

    const videoElement =
    document.getElementById('video');

    try{

        // ASK CAMERA PERMISSION
        const stream =
        await navigator.mediaDevices.getUserMedia({
            video:true,
            audio:false
        });

        // SHOW CAMERA
        videoElement.srcObject = stream;

        // START MEDIAPIPE
        startHandTracking(videoElement);

    }

    catch(error){

        console.log(error);

        alert(
            "Camera access failed. Please allow webcam permission."
        );
    }

});

function startHandTracking(videoElement){

    const hands = new Hands({

        locateFile: (file) => {

            return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
        }
    });

    hands.setOptions({

        maxNumHands:1,

        modelComplexity:1,

        minDetectionConfidence:0.7,

        minTrackingConfidence:0.7
    });

    hands.onResults(onResults);

    const camera = new Camera(videoElement, {

        onFrame: async () => {

            await hands.send({
                image: videoElement
            });
        },

        width:700,
        height:500
    });

    camera.start();
}