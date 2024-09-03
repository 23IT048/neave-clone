let game = document.querySelector(".game");
let squares = document.querySelectorAll(".square");
let playerXClass = document.querySelectorAll(".playerX");
let playerOClass = document.querySelectorAll(".playerO");
let drawsClass = document.querySelectorAll(".draws");
let playerXData = document.querySelector("#playerX"); 
let playerOData = document.querySelector("#playerO");
let drawsData = document.querySelector("#draws");
let soundButton = document.querySelector("#soundButton");
let soundX = document.querySelector("#soundX");
let soundO = document.querySelector("#soundO");
let drawSound = document.querySelector("#drawSound");
let winSound = document.querySelector("#winSound");
let count = 0;
let turnOfX = true;
let hasEnded = false;
let sound = true;
let playerXScore = 0;
let playerOScore = 0;
let drawCount = 0;
soundButton.addEventListener("click",() => {
    if (sound) {
        soundButton.setAttribute('src','soundOff.png');
        soundButton.setAttribute('class','soundOff');
    }
    else{
        soundButton.setAttribute('src','soundOn.png');
        soundButton.setAttribute('class','soundOn');
    }
    sound = !sound;
});
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
function faintRemoverForAllStats(){
    for (let playerXElement of playerXClass) {
        playerXElement.classList.remove('faint');
    }
    for (let playerOElement of playerOClass) {
        playerOElement.classList.remove('faint');
    }
    for (let drawsElement of drawsClass) {
        drawsElement.classList.remove('faint');
    }
}
function faintSetterAtStartOfANewGame(){
    for (let playerXElement of playerXClass) {
        playerXElement.classList.remove('faint');
    }
    for (let playerOElement of playerOClass) {
        playerOElement.classList.add('faint');
    }
    for (let drawsElement of drawsClass) {
        drawsElement.classList.add('faint');
    }
}
function checkEnd() {
    for (let winPattern of winningPatterns) {
        let position1 = squares[winPattern[0]].innerText;
        let position2 = squares[winPattern[1]].innerText;
        let position3 = squares[winPattern[2]].innerText;
        if (position1 && position1 === position2 && position2 === position3) {
            for (let i = 0; i <= 8; i++) {
                if (winPattern.includes(i)) {
                    squares[i].classList.add('winningLine', 'blink');
                } else {
                    squares[i].classList.add('faint');
                }
            }
            if(position1==="X"){
                playerXScore++;
                playerXData.innerText = playerXScore;
            }
            else{
                playerOScore++;
                playerOData.innerText = playerOScore;
            }
            faintRemoverForAllStats();
            if (sound) {
                setTimeout(() => {
                    winSound.play();
                },500);
            }
            return true;
        }
    }
    if (count === 9) {
        game.classList.add('blinkBoard');
        drawCount++;
        drawsData.innerText = drawCount;
        faintRemoverForAllStats();
        if (sound) {
            setTimeout(() => {
                drawSound.play();
            },500);
        }
        return true;
    }
    return false;
}
function handleClick(event) {
    let square = event.target;
    if (!hasEnded && square.innerText === "") {
        if (turnOfX) {
            if(sound){
                soundX.play();
            }
            square.innerText = "X";
            for (let playerXElement of playerXClass) {
                playerXElement.classList.add('faint');
            }
            for (let playerOElement of playerOClass) {
                playerOElement.classList.remove('faint');
            }
        }
        else{
            if(sound){
                soundO.play();
            }
            square.innerText = "O";
            for (let playerOElement of playerOClass) {
                playerOElement.classList.add('faint');
            }
            for (let playerXElement of playerXClass) {
                playerXElement.classList.remove('faint');
            }
        }
        turnOfX = !turnOfX;
        count++;
        if (checkEnd()) {
            hasEnded = true;
        }
    }
    else if (hasEnded) {
        resetGame();
    }
}
function startGame() {
    faintSetterAtStartOfANewGame();
    for (let square of squares) {
        square.addEventListener('click', handleClick);
    }
}
function resetGame() {
    squares.forEach((square) => {
        square.innerText = "";
        square.classList.remove('winningLine', 'faint', 'blink');
    });
    faintSetterAtStartOfANewGame();
    game.classList.remove('blinkBoard');
    turnOfX = true;
    count = 0;
    hasEnded = false;
}
startGame();