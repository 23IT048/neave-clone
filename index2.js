let game = document.querySelector(".game");
let squares = document.querySelectorAll(".square");
let playerXClass = document.querySelectorAll(".playerX");
let playerOClass = document.querySelectorAll(".playerO");
let drawsClass = document.querySelectorAll(".draws");
let playerXData = document.querySelector("#playerXCount"); 
let playerOData = document.querySelector("#playerOCount");
let drawsData = document.querySelector("#drawsCount");
let playerXText = document.querySelector("#playerXText"); 
let playerOText = document.querySelector("#playerOText");
let soundButton = document.querySelector("#soundButton");
let soundX = document.querySelector("#soundX");
let soundO = document.querySelector("#soundO");
let drawSound = document.querySelector("#drawSound");
let winSound = document.querySelector("#winSound");
let gameModeButton = document.querySelector("#gameModeButton");
let count = 0;
let singlePlayerMode = true;
let isComputerPlaying = false;
let turnOfX = true;
let hasEnded = false;
let sound = true;
let playerXScore = 0;
let playerOScore = 0;
let drawCount = 0;

// Event listeners for game mode and sound toggle
gameModeButton.addEventListener("click", toggleGameMode);
soundButton.addEventListener("click", toggleSound);

// Winning patterns
const winningPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

// Toggle game mode
function toggleGameMode() {
    gameModeButton.setAttribute('src', singlePlayerMode ? '2player.png' : '1player.png');
    playerXText.innerText = singlePlayerMode ? 'PLAYER 1(X)' : 'PLAYER (X)';
    playerOText.innerText = singlePlayerMode ? 'PLAYER 2(O)' : 'COMPUTER (O)';
    playerXScore = 0;
    playerOScore = 0;
    drawCount = 0;
    playerXData.innerText = playerXScore;
    playerOData.innerText = playerOScore;
    drawsData.innerText = drawCount;
    singlePlayerMode = !singlePlayerMode;
    resetGame();
}

// Toggle sound
function toggleSound() {
    sound = !sound;
    soundButton.setAttribute('src', sound ? 'soundOn.png' : 'soundOff.png');
    soundButton.setAttribute('class', sound ? 'soundOn' : 'soundOff');
}

// Remove faint classes from all stats
function faintRemoverForAllStats() {
    playerXClass.forEach(element => element.classList.remove('faint'));
    playerOClass.forEach(element => element.classList.remove('faint'));
    drawsClass.forEach(element => element.classList.remove('faint'));
}

// Set faint classes at the start of a new game
function faintSetterAtStartOfANewGame() {
    playerXClass.forEach(element => element.classList.remove('faint'));
    playerOClass.forEach(element => element.classList.add('faint'));
    drawsClass.forEach(element => element.classList.add('faint'));
}

// Set faint classes for X's turn
function faintSetterForTurnOfX() {
    playerXClass.forEach(element => element.classList.remove('faint'));
    playerOClass.forEach(element => element.classList.add('faint'));
}

// Set faint classes for O's turn
function faintSetterForTurnOfO() {
    playerXClass.forEach(element => element.classList.add('faint'));
    playerOClass.forEach(element => element.classList.remove('faint'));
}

// Play a move for the computer
function playComputerMove() {
    let availableSquares = Array.from(squares).filter(square => square.innerText === "");
    let moveIndex = Math.floor(Math.random() * availableSquares.length);
    setTimeout(() => {
        if (sound) soundO.play();
        availableSquares[moveIndex].innerText = "O";
        faintSetterForTurnOfX();
        turnOfX = !turnOfX;
        count++;
        if (checkEnd()) hasEnded = true;
    }, 500);
    isComputerPlaying = false;
}

// Check if the game has ended
function checkEnd() {
    //Check Winner
    for (let winPattern of winningPatterns) {
        let [position1, position2, position3] = winPattern.map(i => squares[i].innerText);
        if (position1 && position1 === position2 && position2 === position3) {
            winPattern.forEach(i => squares[i].classList.add('winningLine', 'blink'));
            squares.forEach((square, i) => {
                if (!winPattern.includes(i)) square.classList.add('faint');
            });
            if (position1 === "X") {
                playerXScore++;
                playerXData.innerText = playerXScore;
            } else {
                playerOScore++;
                playerOData.innerText = playerOScore;
            }
            faintRemoverForAllStats();
            if (sound) setTimeout(() => winSound.play(), 500);
            return true;
        }
    }
    //Check Draw
    if (count === 9) {
        game.classList.add('blinkBoard');
        drawCount++;
        drawsData.innerText = drawCount;
        faintRemoverForAllStats();
        if (sound) setTimeout(() => drawSound.play(), 500);
        return true;
    }
    return false;
}

// Handle square click
function handleClick(event) {
    if (isComputerPlaying) return;
    let square = event.target;
    if (!hasEnded && square.innerText === "") {
        if (turnOfX) {
            if (sound) soundX.play();
            square.innerText = "X";
            faintSetterForTurnOfO();
        } else {
            if (sound) soundO.play();
            square.innerText = "O";
            faintSetterForTurnOfX();
        }
        turnOfX = !turnOfX;
        count++;
        if (checkEnd()) hasEnded = true;
        if (!hasEnded && singlePlayerMode) {
            isComputerPlaying = true;
            playComputerMove();
        }
    }
    else if (hasEnded) {
        resetGame();
    }
}

// Initialize game
function startGame() {
    faintSetterAtStartOfANewGame();
    game.addEventListener('click', handleClick);
}

// Reset game
function resetGame() {
    squares.forEach(square => {
        square.innerText = "";
        square.classList.remove('winningLine', 'faint', 'blink');
    });
    faintSetterAtStartOfANewGame();
    game.classList.remove('blinkBoard');
    turnOfX = true;
    count = 0;
    hasEnded = false;
}

// Start the game
startGame();