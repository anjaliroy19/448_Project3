let canvas;
var context;
var x;
var y;
var dx;
var dy;
let wallLeftPos = 0; // these will need to be changed based on game layout
let wallRightPos = 1500; //^^
let wallTopPos = 0; //^^
let posPaddle = 750; //Center X position for paddle
let row = 3;
let col = 7;
let width = 200;
let height = 50;
let bricks = []
let spaceX = 5
let spaceY = 5
let score = 0;

document.addEventListener('mousemove', e => { 
    posPaddle = e.clientX;
});
document.addEventListener("click", start);


function setup(){
    drawBall(750,540);
    makeBricks();
    drawBricks();
    drawPaddle(posPaddle);
}

function start(){
    x = 750;//change this to be at position above paddle
    y = 500;//^^
    dx = 1;
    dy = -1;
    setInterval(moveBall,5); //calls gameLoop() every 5 ms
}

function moveBall(){
    drawBall(x,y);
    drawPaddle(posPaddle);
    drawBricks();
    hitDetect();
    setDxDy();
    x = x + dx;
    y = y + dy;
}

function drawBall(posX, posY){
    context.clearRect(0,0, 2000, 2000); //this may need to be changed depending on the defined canvas width and height
    context.beginPath();
    context.fillStyle="#FF0000";
    context.arc(posX,posY,10,0, Math.PI*2, true);
    context.closePath();
    context.fill();
}

function setDxDy(){
    //change dx and dy after hitting a wall, block, and paddle
    if (x <= wallLeftPos || x >= wallRightPos){
        dx = -dx;
    }
    if (y <= wallTopPos || y > 600){ //made a bottom border for testing - remove when adding paddle
        dy = -dy;
    }
    if (y > 600){
        gameOver();
    }
}

function gameOver(){
    //later add an image
    window.alert("Game over! You scored: " + score + " point(s)");
    location.reload();
}


function makeBricks(){
    for(let i = 0; i < col; i++){
        bricks[i] = []
        for(let j = 0; j < row; j++){
            bricks[i][j] = { x: 0, y: 0, on: 'yes'}
            bricks[i][j].x = i * (width + spaceX)
            bricks[i][j].y = j * (height + spaceY)
        }
    }
}

function drawBricks(){
    for(let i = 0; i < col; i++){
        for(let j = 0; j < row; j++){
            if(bricks[i][j].on == 'yes'){
                context.beginPath();
                context.fillStyle = "white";
                context.rect(bricks[i][j].x, bricks[i][j].y, width, height);
                context.closePath(); 
                context.fill(); 
            }          
        }
    }
    //console.log(bricks)
}

function hitDetect(){
    for(let i = 0; i < col; i++){
        for(let j = 0; j < row; j++){
            if(x > bricks[i][j].x && x < bricks[i][j].x + width && y > bricks[i][j].y && y < bricks[i][j].y + height && bricks[i][j].on == 'yes'){
                console.log('hit')
                score++;
                updateScoreBoard(score);
                context.clearRect(0,0, 2000, 2000); //this may need to be changed depending on the defined canvas width and height
                dy = -dy
                bricks[i][j].on = 'no'
                //need to remove bricks from array
            }
        }
    }
}

function drawPaddle() {
  let posR = posPaddle;
  if(posR => 50 && posR <= 1450) { //Paddle movements within the game border 
    context.beginPath();
    context.fillStyle = 'Blue';
    context.fillRect(posR-50, 550, 100, 10);
    context.closePath();
    console.log(posR);
  }
  if(posR < 50) { //For left side border case
    posPaddle=50;
    context.beginPath();
    context.fillStyle = 'Blue';
    context.fillRect(0, 550, 100, 10);
    context.closePath();
    console.log(posR);
  }
  if(posR > 1450) { //For right side border case
    posPaddle=1450;
    context.beginPath();
    context.fillStyle = 'Blue';
    context.fillRect(1400, 550, 100, 10);
    context.closePath();
    console.log(posR);
  }
  hitPaddle();
}

function hitPaddle() {
  if((y == 550) && (x > posPaddle-50) && (x < posPaddle+50)) { //The Y value can be changed to whatever in the final project.
    console.log("paddleHit");
    dy = -dy;
  }

}


function updateScoreBoard(score){
	document.getElementById("score").innerHTML = "Score: " + score;
}

document.addEventListener("DOMContentLoaded", () => {
    canvas = document.querySelector("#projectCanvas");
    context = canvas.getContext("2d");
  })



