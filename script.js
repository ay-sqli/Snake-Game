// Selects the element with the class "play-board" and assigns it to the variable playBoard.
const playBoard = document.querySelector(".play-board");
const scoreElement = document.querySelector(".score");
const highScoreElement = document.querySelector(".high-score");
const controls = document.querySelectorAll(".controls i")
// Sets gameOver to false, initializes the snake's starting position, and creates an empty array for the snake's body segments.
let gameOver = false;
let foodX, foodY;
let snakeX=5, snakeY=10;
let snakeBody = [];
let score=0;
let highScore = localStorage.getItem("high-score") || 0;
highScoreElement.innerText = `High score: ${highScore}`;

// Sets the initial velocity of the snake to 0 in both directions.
let velocityX = 0, velocityY= 0;

// Declares setIntervalId without assigning it a value.
let setIntervalId;

// Generates a new position for the food element.
const changeFoodPosition = () => {
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
}

// Stops the game interval, displays a "Game Over" message and reloads the page when the user clicks "OK".
const handleGameOver = () => {
    clearInterval(setIntervalId);
    alert("Game Over! Press Ok to replay...");
    location.reload();
}


// Changes the direction of the snake's movement based on the key pressed by the player.
const changeDirection = (e) => {
    if(e.key === "ArrowUp" && velocityY !=1){
        velocityX=0;
        velocityY=-1;
    } else if (e.key === "ArrowDown" && velocityY !=-1)
    {
        velocityX=0;
        velocityY=1;
    }else if (e.key === "ArrowLeft" && velocityX !=1)
    {
        velocityX=-1;
        velocityY=0;
    }else if (e.key === "ArrowRight" && velocityX !=-1)
    {
        velocityX=1;
        velocityY=0;
    }
    // Calls initGame after the direction change to update the game board.

}

controls.forEach( key=>{
    key.addEventListener("click", () =>  changeDirection({ key: key.dataset.key }))
})

// Initializes the game and updates the game board on each iteration of the game loop.
const initGame = () => {
    // If gameOver is true, the game is over and the handleGameOver function is called to display an alert to the player.
    if(gameOver) return handleGameOver();

    // Initializes htmlMarkup with HTML markup for the game board, including the position of the food element.
    let htmlMarkup = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;
    
    // If the snake has eaten the food, change the position of the food and add a new body segment to the snake.
    if(snakeX === foodX && snakeY === foodY){
        changeFoodPosition();
        snakeBody.push([foodX, foodY]);
        score++;
        highScore = score >= highScore ? score : highScore;
        localStorage.setItem("high-score", highScore);
    
        scoreElement.innerText = `Score: ${score}`;
        highScoreElement.innerText = `High score: ${highScore}`;

    }

    // Updates the position of each body segment of the snake, except for the head. Each body segment is set to the position of the segment in front of it.
    for ( let i = snakeBody.length-1; i>0; i--){
        snakeBody[i]= snakeBody[i-1];
    }

    // Updates the position of the snake's head based on the current velocity.
    snakeBody[0]= [snakeX, snakeY];
    snakeX+= velocityX;
    snakeY+= velocityY;

    // If the snake has gone out of bounds, the game is over.
    if(snakeX <= 0 || snakeX> 30 || snakeY <=0 || snakeY> 30 ){
        gameOver=true;
    }

    // Adds HTML markup for each body segment of the snake to htmlMarkup.
    for ( let i =0; i< snakeBody.length; i++){
        htmlMarkup += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;
    // checking for collision detection between the snake's head and its body.
        if( i !==0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]){
            gameOver=true;
        }
    
    }

   
    playBoard.innerHTML = htmlMarkup;
}

// Initialize the game by setting the food position and starting the game loop
changeFoodPosition();
setInterval(initGame, 125);

// Add an event listener for arrow key presses to change the direction of the snake
document.addEventListener("keydown", changeDirection);

function darkMode() {
    const element = document.body;
    element.classList.toggle("dark-mode");
  }