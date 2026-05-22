const playerText =
document.getElementById('player');

const computerText =
document.getElementById('computer');

const resultText =
document.getElementById('result');

const countdownText =
document.getElementById('countdown');

const computerHand =
document.getElementById('computer-hand');

const choices = [
    'Rock',
    'Paper',
    'Scissors'
];

function speak(text){

    window.speechSynthesis.cancel();

    return new Promise((resolve)=>{

        const speech =
        new SpeechSynthesisUtterance(text);

        // SLIGHTLY FASTER VOICE
        speech.rate = 1.4;

        speech.pitch = 1;

        speech.volume = 1;

        speech.onend = () => {

            resolve();
        };

        window.speechSynthesis.speak(speech);
    });
}

function getComputerChoice(){

    return choices[
        Math.floor(
            Math.random() * choices.length
        )
    ];
}

function getEmoji(choice){

    if(choice === "Rock"){
        return "✊";
    }

    if(choice === "Paper"){
        return "✋";
    }

    if(choice === "Scissors"){
        return "✌️";
    }

    return "❔";
}

function decideWinner(player, computer){

    if(player === computer){

        return "Draw";
    }

    if(

        (player === 'Rock'
        &&
        computer === 'Scissors')

        ||

        (player === 'Paper'
        &&
        computer === 'Rock')

        ||

        (player === 'Scissors'
        &&
        computer === 'Paper')

    ){

        return "You Win";
    }

    return "Computer Wins";
}

async function startGame(){

    playerText.innerText =
    "Your Move: ---";

    computerText.innerText =
    "Computer Move: Thinking...";

    resultText.innerText =
    "Result: Waiting...";

    computerHand.innerText =
    "❔";

    countdownText.innerText =
    "ARE YOU READY?";

    await speak("Are you ready");

    animateComputerHand();

    countdownText.innerText = "3";

    await speak("3");

    countdownText.innerText = "2";

    await speak("2");

    countdownText.innerText = "1";

    await speak("1");

    countdownText.innerText =
    "ROCK PAPER SCISSOR";

    await speak("ROCK PAPER SCISSOR");

    // COMPUTER CHOOSES FIRST
    let computerChoice =
    getComputerChoice();

    // STOP HAND ANIMATION
    clearInterval(handAnimation);

    // SHOW COMPUTER HAND
    computerHand.innerText =
    getEmoji(computerChoice);

    // QUICKER PLAYER HAND READ
    await sleep(500);

    // DETECT PLAYER MOVE
    let playerChoice =
    currentGesture;

    playerText.innerText =
    "Your Move: " + playerChoice;

    computerText.innerText =
    "Computer Move: " + computerChoice;

    if(playerChoice === "Unknown"){

        resultText.innerText =
        "Result: Hand Not Detected";

        await speak("Hand not detected");

        return;
    }

    let result =
    decideWinner(
        playerChoice,
        computerChoice
    );

    resultText.innerText =
    "Result: " + result;

    await speak(result);
}

let handAnimation;

function animateComputerHand(){

    handAnimation =
    setInterval(()=>{

        let randomChoice =
        choices[
            Math.floor(
                Math.random() * choices.length
            )
        ];

        computerHand.innerText =
        getEmoji(randomChoice);

    },180);
}

function sleep(ms){

    return new Promise(resolve =>
        setTimeout(resolve, ms)
    );
}