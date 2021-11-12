let canvas;
var context;
var x;
var y;
var dx=1.2;
var dy=-1.2;
let wallLeftPos; 
let wallRightPos; 
let wallTopPos;
let posPaddle = 750; //Center X position for paddle
let row = 3;
let col = 7;
let width = 200;
let height = 50;
let bricks = []
let brickTotal = row*col; //Using for if all bricks are destroyed
let spaceX = 5
let spaceY = 5
let score = 0;
let level = 1;
let startGame = false;
let lives = 3;



document.addEventListener('mousemove', e => { 
    posPaddle = e.clientX;
});
document.getElementById("projectCanvas").addEventListener("click", start);


function setup(){
    drawBall(750,540);
    makeBricks();
    drawBricks();
    drawPaddle(posPaddle);
    let btn1 = document.getElementById('btn1x');
    btn1.style.fontSize = "25px";
}

function start(){
    if (startGame == false) {
      x = 750;//change this to be at position above paddle
      y = 500;//^^
      startGame = true;
      setInterval(moveBall,5); //calls gameLoop() every 5 ms
    }
}

function moveBall(){
    setDxDy();
    drawBall(x,y);
    drawPaddle(posPaddle);
    drawBricks();
    hitDetect();
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
    if (y <= 0 || y > 700){ //made a bottom border for testing - remove when adding paddle
        dy = -dy;
    }
    if (y > 700){
        lives--;
        heartDisplay();
        if (lives <= 0) {
        	gameOver();
        }
        else {
        	//reshoot ball
        }
    }
}

function heartDisplay() {
	console.log()
	if (lives < 3) {
		document.getElementById("heart3").style.display = "none";
	}
	if (lives < 2) {
		document.getElementById("heart2").style.display = "none";
	}
	if (lives < 1) {
		document.getElementById("heart1").style.display = "none";
	}
	return;
}

function gameOver(){
    //later add an image
    window.alert("Game over! You scored: " + score + " point(s)");
    location.reload();
}


function makeBricks(){
    if(level == 1){
        for(let i = 0; i < col; i++){
            bricks[i] = []
            for(let j = 0; j < row; j++){
                bricks[i][j] = { x: 0, y: 0, on: 'yes'}
                bricks[i][j].x = i * (width + spaceX)
                bricks[i][j].y = j * (height + spaceY)
            }
        }
    }
    else if(level == 2){
        for(let i = 0; i < col + 1; i++){
            bricks[i] = []
            for(let j = 0; j < row + 1; j++){
                bricks[i][j] = { x: 0, y: 0, on: 'yes'}
                bricks[i][j].x = i * (width + spaceX)
                bricks[i][j].y = j * (height + spaceY)
            }
        }
    }
}

function drawBricks(){
    if(level == 1){
        for(let i = 0; i < col; i++){
            for(let j = 0; j < row; j++){
                if(bricks[i][j].on == 'yes'){
                    context.beginPath();
                    context.fillStyle = "gray";
                    context.rect(bricks[i][j].x, bricks[i][j].y, width, height);
                    context.closePath(); 
                    context.fill(); 
                }          
            }
        }
        //console.log(bricks)
    }
    else if (level == 2){
        for(let i = 0; i < col + 1; i++){
            for(let j = 0; j < row + 1; j++){
                if(bricks[i][j].on == 'yes'){
                    context.beginPath();
                    context.fillStyle = "green";
                    context.rect(bricks[i][j].x, bricks[i][j].y, width - 20, height - 20);
                    context.closePath(); 
                    context.fill(); 
                }          
            }
        }
    }
}

function hitDetect(){
    if(level == 1){
        for(let i = 0; i < col; i++){
            for(let j = 0; j < row; j++){
                if(x > bricks[i][j].x && x < bricks[i][j].x + width && y > bricks[i][j].y && y < bricks[i][j].y + height && bricks[i][j].on == 'yes'){
                    console.log('hit')
                    score++;
                    updateScoreBoard(score);
                    if(score >= 21 && level == 1){
                        level = 2;
                        score = 0;
                        x = 750;
                        y = 500;
                        dy = -dy
                        makeBricks();
                        drawBricks();
                    }
                    context.clearRect(0,0, 2000, 2000); //this may need to be changed depending on the defined canvas width and height
                    dy = -dy
                    bricks[i][j].on = 'no'
            if(score == brickTotal) {gameOver();} //If equal all bricks are destroyed.
                    //need to remove bricks from array
                }
            }
        }
    }
    else if(level == 2){
        for(let i = 0; i < col + 1; i++){
            for(let j = 0; j < row + 1; j++){
                if(x > bricks[i][j].x && x < bricks[i][j].x + width && y > bricks[i][j].y && y < bricks[i][j].y + height && bricks[i][j].on == 'yes'){
                    console.log('hit')
                    score++;
                    updateScoreBoard(score);
                    context.clearRect(0,0, 2000, 2000); //this may need to be changed depending on the defined canvas width and height
                    dy = -dy
                    bricks[i][j].on = 'no'
            if(score == brickTotal) {gameOver();} //If equal all bricks are destroyed.
                    //need to remove bricks from array
                }
            }
        }
    }
}

function drawPaddle() {
  let posR = posPaddle;
  if(posR => wallLeftPos && posR <= wallRightPos) { //Paddle movements within the game border 
    context.beginPath();
    context.fillStyle = 'Blue';
    context.fillRect(posR-50, 550, 100, 10);
    context.closePath();
    console.log(posR);
  }
  if(posR < wallLeftPos + 50) { //For left side border case
    posPaddle=wallLeftPos + 50;
    context.beginPath();
    context.fillStyle = 'Blue';
    context.fillRect(wallLeftPos, 550, 100, 10);
    context.closePath();
    console.log(posR);
  }
  if(posR > wallRightPos - 50) { //For right side border case
    posPaddle=wallRightPos - 50;
    context.beginPath();
    context.fillStyle = 'Blue';
    context.fillRect(wallRightPos - 100, 550, 100, 10);
    context.closePath();
    console.log(posR);
  }
  hitPaddle();
}

function hitPaddle() {
  if((y >= 550 && y <= 552) && (x > posPaddle-50) && (x < posPaddle+50)) { //The Y value can be changed to whatever in the final project.
    console.log("paddleHit");
    dy = -dy;
  }

}

//called on speed button click
function btnSpeed(id, id2, id3){
    let btn1 = document.getElementById(id);
    btn1.style.fontSize = "25px";
    let btn2 = document.getElementById(id2);
    btn2.style.fontSize = "20px";
    let btn3 = document.getElementById(id3);
    btn3.style.fontSize = "20px";
    
    if (id == 'btn1x'){
        dx = 1*dx/(Math.abs(dx));
        dy = 1*dy/(Math.abs(dy));
    }
    else if (id == 'btn2x'){
        dx = 2*dx/(Math.abs(dx));
        dy = 2*dy/(Math.abs(dy));
    }
    else if (id == 'btn3x'){
        dx = 3*dx/(Math.abs(dx));
        dy = 3*dy/(Math.abs(dy));
    }
}


function updateScoreBoard(score){
	document.getElementById("score").innerHTML = "Score: " + score;
}

document.addEventListener("DOMContentLoaded", () => {
    canvas = document.querySelector("#projectCanvas");
    context = canvas.getContext("2d");
  
    let bounds = canvas.getBoundingClientRect();
    console.log(bounds.top, bounds.right, bounds.bottom, bounds.left);
    wallLeftPos = bounds.left;
    wallRightPos = bounds.right;
    wallTopPos = bounds.top;

    heartDisplay();
    
  })
