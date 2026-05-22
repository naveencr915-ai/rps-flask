let currentGesture = "Unknown";

function detectGesture(landmarks){

    let fingers = [];

    const fingerTips = [8,12,16,20];

    for(let tip of fingerTips){

        if(
            landmarks[tip].y
            <
            landmarks[tip - 2].y
        ){

            fingers.push(1);
        }

        else{

            fingers.push(0);
        }
    }

    let total =
    fingers.reduce((a,b)=>a+b,0);

    if(total === 0){

        return "Rock";
    }

    else if(total === 2){

        return "Scissors";
    }

    else if(total >= 4){

        return "Paper";
    }

    else{

        return "Unknown";
    }
}

function drawLandmarks(hand){

    const canvas =
    document.getElementById("overlay");

    const ctx =
    canvas.getContext("2d");

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    // DRAW POINTS
    for(let point of hand){

        ctx.beginPath();

        ctx.arc(
            point.x * canvas.width,
            point.y * canvas.height,
            8,
            0,
            2 * Math.PI
        );

        ctx.fillStyle = "lime";

        ctx.fill();
    }
}

function onResults(results){

    if(
        results.multiHandLandmarks &&
        results.multiHandLandmarks.length > 0
    ){

        const hand =
        results.multiHandLandmarks[0];

        currentGesture =
        detectGesture(hand);

        drawLandmarks(hand);
    }

    else{

        currentGesture = "Unknown";

        const canvas =
        document.getElementById("overlay");

        const ctx =
        canvas.getContext("2d");

        ctx.clearRect(
            0,
            0,
            canvas.width,
            canvas.height
        );
    }
}