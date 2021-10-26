let canvas;
var context;
var x;
var y;
var dx;
var dy;
let wallLeftPos = 0; // these will need to be changed based on game layout
let wallRightPos = 800; //^^
let wallTopPos = 0; //^^




function start(){
    x = 600;//change this to be at position above paddle
    y = 400;//^^
    dx = 1;
    dy = -1;
    setInterval(moveBall,5); //calls gameLoop() every 5 ms
}

function moveBall(){
    drawBall(x,y);
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
    if (y <= wallTopPos){
        dy = -dy;
    }
}


document.addEventListener("DOMContentLoaded", () => {
    canvas = document.querySelector("#projectCanvas");
    context = canvas.getContext("2d");
  })

