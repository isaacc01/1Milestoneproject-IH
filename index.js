//Assign all the elements being used
const snakeGameBoard = document.querySelector("#gameboard");
const scoreBoard = document.querySelector("#score");
const startGame = document.getElementsByClassName('start-game');

let snakePosition = [{ x: 5, y: 6 }]; //snake array
let inputDirection = { x: 0, y: 0 };
let speed = 10;
let score = 0;
let lastPaintTime = 0;
let foodBait = { x: 10, y: 10 };


//setup game function, the main function
function main(startGame) {
    window.requestAnimationFrame(main);
    //console.log(startGame) //to see the time of the game
    if ((startGame - lastPaintTime)/1000 < 1 / speed) {
    return;
    } 
    lastPaintTime = startGame;
    //startTimer();
    gamePlay();
}

//create function in case the snake collides of bumps into walls
function didSnakeCollide(snake) {
    //if the snake runs into inself
    for (let i = 1; i < snakePosition.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
        return true;
    }
}
//when snake bumps into wall
    if (snake[0].x >= 25 || snake[0].x <= 0 || snake[0].y >= 25 || snake[0].y <= 0){
        return true;
    }
    return false;
}

function gamePlay() {
//add functions to update the snake array when it eats the food
    if (didSnakeCollide(snakePosition)) {
    inputDirection = { x: 0, y: 0 };
    alert("GAME OVER!!");
    location.reload()
    snakePosition = [{ x: 5, y: 6 }];
    score = 0;
    }
//add a if statemtn for when the snake eats the food to update the score
//and update thr snake length
    if (snakePosition[0].y === foodBait.y && snakePosition[0].x === foodBait.x) {
       score += 1;

        scoreBoard.innerHTML = " " + score;
        snakePosition.unshift({
        x: snakePosition[0].x + inputDirection.x,
        y: snakePosition[0].y + inputDirection.y,
        });
//add mathround to add the food on a random position
        let a = 2;
        let b = 23;
        foodBait = {
        x: Math.round(a + (b - a) * Math.random()),
        y: Math.round(a + (b - a) * Math.random()),
};
//add a WIN senario
//if user scores 10 they win the game
    if(score === 10 ){
        alert("YOU WIN");
        location.reload();
    }
    }

    //for loop for moving the snake
    for (let i = snakePosition.length - 2; i >= 0; i--) {
    snakePosition[i + 1] = { ...snakePosition[i] };
    }

    snakePosition[0].x += inputDirection.x;
    snakePosition[0].y += inputDirection.y;

//now time to display the snake and food on the gameboard
    snakeGameBoard.innerHTML = "";
        snakePosition.forEach((e, index) => {
        snakeElement = document.createElement("div");
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

    if (index === 0) {
        snakeElement.classList.add("snake-head");
    } else {
        snakeElement.classList.add("snake");
    }
    snakeGameBoard.appendChild(snakeElement);
    });

    foodElement = document.createElement("div");
    foodElement.style.gridRowStart = foodBait.y;
    foodElement.style.gridColumnStart = foodBait.x;
    foodElement.classList.add("rodent");
    snakeGameBoard.appendChild(foodElement);
}

//add controls to the snake to have it move around the grid
window.requestAnimationFrame(main);

window.addEventListener("keydown", function (e) {
    inputDirection = { x: 0, y: 1 };
    switch (e.key) {
    case "ArrowUp":
        console.log("ArrowUp");
        inputDirection.x = 0;
        inputDirection.y = -1;
        break;

    case "ArrowDown":
        console.log("ArrowDown");
        inputDirection.x = 0;
        inputDirection.y = 1;
        break;

    case "ArrowLeft":
        console.log("ArrowLeft");
        inputDirection.x = -1;
        inputDirection.y = 0;
         break;

    case "ArrowRight":
        console.log("ArrowRight");
        inputDirection.x = 1;
        inputDirection.y = 0;
         break;
    default:
    break;
    }
});

//set a timer to span id=time-left
//set a 60 sec timer to create an end to the game
function timeLeft(duration, display){
    let timer = duration, minutes, seconds;
    setInterval(function(){
        minutes = parseInt(timer/60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes <10 ? '0' + minutes : minutes;
        seconds = seconds <10 ? '0' + seconds : seconds;

        display.textContent =' ' + minutes + ':' + seconds;
        if(--timer< 0){
        alert("TIME IS UP GAME OVER")
        location.reload();
        timer = duration
        }
    },1000)
}

function startTimer(){
    let oneMinute = 60,
    display = document.querySelector("#time-left");
    //startGame.addEventListener('click', startTimer());
    timeLeft(oneMinute, display)   
}

startTimer();