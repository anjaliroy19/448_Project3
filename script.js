let canvas;
var context;
var x;
var y;
var dx=0.7;
var dy=1.2;
let wallLeftPos; //absolute position of left wall of canvas, not relative to canvas
let wallRightPos; //absolute position of right wall of canvas, not relative to canvas
let wallTopPos;
let posPaddle; //Center X position for paddle
let row = 3;
let col = 7;
let width = 200;
let height = 50;
let bricks = [];
let spaceX = 5;
let spaceY = 5;
let score = 0;
let level = 1;
let startGame = false;
let testing = false;
let lives = 3;
let mvBallInterval;
let healthTotal = 0; //the health of all the bricks for the level
let test = 0;
let initialBall = false;




document.addEventListener('mousemove', e => { 
    posPaddle = e.clientX - wallLeftPos; //sets posPaddle to the x position of the mouse relative to the canvas
});

document.addEventListener('click', r => {console.log(r.clientX);});
document.getElementById("projectCanvas").addEventListener("click", start);

document.getElementById("testBtn").addEventListener("click", setupTest);

/*
* @pre none
* @post sets up display screen and generates a random ball and paddle x position
* @param none
* @return none
*/
function setup(){
    x = Math.floor((Math.random() * 1000) + 200);//random x position between 200 and 1000
    drawBall(x,300);
    makeBricks();
    drawBricks();
    posPaddle = x; //so that the ball and paddle are aligned
    drawPaddle(); 
    let btn1 = document.getElementById('btn1x'); //initializes game with 1x button chosen
    btn1.style.fontSize = "25px";
}

function setupTest(){
  test = 1;
  row = 1;
  col = 5;
  drawBall(510,300);
  makeBricks();
  drawBricks();
  posPaddle = 550;
  drawPaddle();
  mvBallInterval = setInterval(moveBall,5);
  
}

/*
* @pre canvas is clicked on
* @post calls moveball on loop
* @param none
* @return none
*/
function start(){
    if (startGame == false) {
      y = 300;//so that ball starts above paddle
      startGame = true;
      mvBallInterval = setInterval(moveBall,5); //calls gameLoop() every 5 ms
    }
}

/*
* @pre start game
* @post checks for hits and calls draws ball, paddle, and bricks
* @param one
* @return none
*/
function moveBall(){
  if (test == 0){//regular game playing
    setDxDy();
    drawBall(x,y);
    drawPaddle();
    drawBricks();
    hitDetect();
    y = y + dy;
    if(initialBall == true){//so that the ball falls vertically at first until it hits paddle
        x = x + dx;
    }
  } 
  else if(test == 1) {
    if(lives == 3) {
      setDxDy();
      drawBall(510,y);
      drawPaddle();
      row = 1;
      col = 5;
      drawBricks();
      hitDetect();
      y = y + dy;
      if(initialBall == true) {x = x + dx;}
    }
    if(lives == 2) {
      test = 1;
      setDxDy();
      drawBall(610,y);
      drawPaddle();
      drawBricks();
      hitDetect();
      y = y + dy;
      if(initialBall == true) {x= x + dx;}
    }
    if(lives == 1) {
      test = 1;
      setDxDy();
      drawBall(710,y);
      drawPaddle();
      drawBricks();
      hitDetect();
      y = y + dy;
      if(initialBall == true) {x= x + dx;}
      //setDxDy();
      //drawBall(x,y); 
      
    }
  }
}
//https://github.com/anjaliroy19/448_Project3.git


/*
* @pre none
* @post clears screen and redraws ball
* @param none
* @return none
*/
function drawBall(posX, posY){
    context.clearRect(0,0, 2000, 2000); //this may need to be changed depending on the defined canvas width and height
    context.beginPath();
    context.fillStyle="#FF0000";
    context.arc(posX,posY,10,0, Math.PI*2, true);//radius of 10
    context.closePath();
    context.fill();
}

/*
* @pre none
* @post checks ball x and y position to set dx and dy 
* @param none
* @return none
*/
function setDxDy(){
    //change dx and dy after hitting a wall, block, and paddle
    if (x <= 10 || x >= (wallRightPos-wallLeftPos) -10){ //checks if edge of ball is within canvas
        dx = -dx;
    }
    if (y <= 10 || y > 700){ //made a bottom border for testing - remove when adding paddle
        dy = -dy;
    }
    if (y > 700){//check for ball below paddle
        lives--;
        heartDisplay();
        if (!(lives <= 0)) {//softResets screen if user has lives left
        	softReset();
        }
    }
}


/*
* @pre lost a life
* @post sets ball and paddle back to original position, stops the ball moving until a click activates start()
* @param none
* @return none
*/
function softReset() {
    initialBall = false;
    dx=Math.abs(dx);
    dy= 1*(Math.abs(dy));
    x = Math.floor((Math.random() * 1000) + 200);
    y = 300;
    posPaddle = x;
    drawBall(x,300);
    drawPaddle();
    clearInterval(mvBallInterval);
    startGame = false;
}


/*
* @pre none
* @post stops displaying 1 heart per life lost
* @param none
* @return none
*/
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
        gameOver();
	}
	return;
}

/*
* @pre all lives are lost or score = 28
* @post alerts game over for a win or score
* @param none
* @return none
*/
function gameOver(){
    //later add an image
    if (score == 28){//when second level is beat
        window.alert("Congratulations! You beat the game!");
    }
    else{
        window.alert("Game over! You scored: " + score + " point(s)");
    }
    location.reload();
}

/*
* @pre none
* @post bricks array is made and bricks are given a position, health, and on status
* @param none
* @return none
*/
function makeBricks(){
    if(test == 1) {
      row =1;
      col = 5;
      console.log("test: " + test + "row: " + row + "col: " + col);
    }
    if(level == 1){
        for(let i = 0; i < col; i++){
            bricks[i] = [];
            for(let j = 0; j < row; j++){
                bricks[i][j] = { x: 0, y: 0, on: 'yes', health: 0}
                bricks[i][j].x = i * (width + spaceX);
                bricks[i][j].y = j * (height + spaceY);
		if ((j == 0) && (test != 1)) { bricks[i][j].health = 3;}
		else if ((j == 1) && (test != 1)) { bricks[i][j].health = 2;}
		else if ((j == 2) && (test != 1)) { bricks[i][j].health = 1;}	//3 NEEDS TO BE CHANGED TO 1
		else if (test == 1) { bricks[i][j].health = 1;}
	        healthTotal = healthTotal + bricks[i][j].health;
	        console.log(healthTotal);
            }
        }
    }
    else if(level == 2){
	healthTotal = 0;
        for(let i = 0; i < col + 1; i++){
            bricks[i] = [];
            for(let j = 0; j < row + 1; j++){
                bricks[i][j] = { x: 0, y: 0, on: 'yes'}
                bricks[i][j].x = i * (width + spaceX);
                bricks[i][j].y = j * (height + spaceY);
		if (j == 0) { bricks[i][j].health = 4;}
		if (j == 1) { bricks[i][j].health = 3;}
		if (j == 2) { bricks[i][j].health = 2;}
		if (j == 3) { bricks[i][j].health = 1;}
	        healthTotal = healthTotal + bricks[i][j].health;
	        console.log(healthTotal);
            }
        }
    }
}
/*
* @pre bricks array must be created
* @post bricks are drawn to the screen
* @param none
* @return none
*/
function drawBricks(){
    if(level == 1){
        for(let i = 0; i < col; i++){
            for(let j = 0; j < row; j++){	//1 NEEDS TO BE CHANGED TO ROW
                if(bricks[i][j].on == 'yes'){
                    context.beginPath(); //ADD IF STATEMENTS FOR HEALTH LEVELS, GREY IS 3 HEALTH, YELLOW IS 2 HEALTH, RED IS 1 HEALTH
                    context.fillStyle = "gray";
                    context.beginPath();
                    if(bricks[i][j].health == 1){
                        context.fillStyle = "orange";
                    }
                    else if (bricks[i][j].health == 2){
                        context.fillStyle = "magenta";
                    }
                    else{
                        context.fillStyle = "blue";
                    }
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
                    if(bricks[i][j].health == 1){
<<<<<<< HEAD
                        context.fillStyle = "orange";
                    }
                    else if (bricks[i][j].health == 2){
=======
                        context.fillStyle = "yellow";
                    }
                    else if (bricks[i][j].health == 2){
                        context.fillStyle = "orange";
                    }
                    else if (bricks[i][j].health == 3){
                        context.fillStyle = "#6666ff";
                    }
                    else if (bricks[i][j].health == 4){
>>>>>>> 7a04948af61ff009612c06e5dbe3634a7662b271
                        context.fillStyle = "magenta";
                    }
                    else if (bricks[i][j].health == 3){
                        context.fillStyle = "blue";
                    } else {
		      context.fillStyle = "green";
		    }
                    context.rect(bricks[i][j].x, bricks[i][j].y, width - 20, height - 20);
                    context.closePath(); 
                    context.fill(); 
                }          
            }
        }
    }
}
/*
* @pre none
* @post reduces brick health, updates score board, alerts user of loss or level pass
* @param none
* @return none
*/
function hitDetect(){
    if(level == 1){
        for(let i = 0; i < col; i++){
            for(let j = 0; j < row; j++){
                if(x > bricks[i][j].x && x < bricks[i][j].x + width && y > bricks[i][j].y && y < bricks[i][j].y + height && bricks[i][j].on == 'yes'){
                    console.log('hit');
                    score++;
                    updateScoreBoard(score);
                    bricks[i][j].health--;
                    dy= -dy;		
                    if(bricks[i][j].health < 1) {
                            context.clearRect(0,0, 2000, 2000); //this may need to be changed depending on the defined canvas width and height
                            bricks[i][j].on = 'no';
                    } 
                    if(score == healthTotal && level == 1){
                        level = 2;
                        window.alert("Way to go, you passed level 1! Now onto level 2 ...");
                        score = 0;
                        updateScoreBoard(score);
                        softReset();
			healthTotal = 0;
                        makeBricks();
                        drawBricks();
                    }
                    //context.clearRect(0,0, 2000, 2000); //this may need to be changed depending on the defined canvas width and height
                    //dy = -dy
                    //bricks[i][j].on = 'no'
            	    if(score == healthTotal) {
                        gameOver();
                    } //If equal all bricks are destroyed.
                }
            }
        }
    }
    else if(level == 2){
      //healthTotal = 0;
        for(let i = 0; i < col + 1; i++){
            for(let j = 0; j < row + 1; j++){
                if(x > bricks[i][j].x && x < bricks[i][j].x + width && y > bricks[i][j].y && y < bricks[i][j].y + height && bricks[i][j].on == 'yes'){
                    console.log('hit');
                    score++;
                    bricks[i][j].health--;
                    updateScoreBoard(score);
		    dy = -dy;
                    if(bricks[i][j].health < 1) {
                            context.clearRect(0,0, 2000, 2000); //this may need to be changed depending on the defined canvas width and height
                            bricks[i][j].on = 'no';
                    }
            	    if(score == 70) {
                        gameOver();
                    } //If equal all bricks are destroyed.
                        //need to remove bricks from array
                }
            }
        }
    }
}
/*
* @pre none
* @post paddle is created drawn to screen
* @param none
* @return none
*/
function drawPaddle() {
  let posR = posPaddle;
  if(test == 1) {posPaddle = 500;}
  if (posR => 50 && posR <= wallRightPos-wallLeftPos-50) { //Paddle movements within the game border 
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
  if(posR > (wallRightPos-wallLeftPos) - 50) { //For right side border case
    posPaddle=(wallRightPos-wallLeftPos) - 50;
    context.beginPath();
    context.fillStyle = 'Blue';
    context.fillRect(wallRightPos-wallLeftPos - 100, 550, 100, 10);
    context.closePath();
    console.log(posR);
  }
    hitPaddle();
}
/*
* @pre none
* @post if ball hits paddle dy is changed so that ball bounces off paddle
* @param none
* @return none
*/
function hitPaddle() {
  //console.log(posPaddle);
  if((test == 1) && (y <= 552) && (y >= 550) && (posPaddle => 450) && (posPaddle <= 550)) { //ISNT CALLING THIS IF DURING TESTING
    console.log("testPaddle hit");
    dy= -dy;
    initialBall = true;
  } //ADDED FOR TESTING
  else if((test != 1) && (y >= 550 && y <= 552) && (x > posPaddle-50) && (x < posPaddle+50)) { //The Y value can be changed to whatever in the final project.
    console.log("paddleHit");
    dy = -dy;
    initialBall = true;
  }

}

/*
* @pre speed button is clicked
* @post changes ball speed based on button click
* @param none
* @return none
*/
function btnSpeed(id, id2, id3){
    let btn1 = document.getElementById(id);
    btn1.style.fontSize = "25px";
    let btn2 = document.getElementById(id2);
    btn2.style.fontSize = "20px";
    let btn3 = document.getElementById(id3);
    btn3.style.fontSize = "20px";
    
    if (id == 'btn1x'){
        dx = .5*dx/(Math.abs(dx));
        dy = 1*dy/(Math.abs(dy));
    }
    else if (id == 'btn2x'){
        dx = 1*dx/(Math.abs(dx));
        dy = 2*dy/(Math.abs(dy));
    }
    else if (id == 'btn3x'){
        dx = 1.5*dx/(Math.abs(dx));
        dy = 3*dy/(Math.abs(dy));
    }
}


/*
* @pre brick is hit
* @post updates scoreboard
* @param none
* @return none
*/
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


/*
* @pre click test button
* @post resets all variables so they can be changed for specific tests
* @param none
* @return none
*/
function reset() {
	dx=1.2;
	dy=-1.2;
	posPaddle = 750; //Center X position for paddle
	row = 3;
	col = 7;
	width = 200;
	height = 50;
	bricks = []
	brickTotal = row*col; //Using for if all bricks are destroyed
	spaceX = 5
	spaceY = 5
	score = 0;
	level = 1;
	startGame = false;
        testing = true;
	lives = 3;
    drawBall(750,300);
    makeBricks();
    drawBricks();
   // drawPaddle(posPaddle);
    clearInterval(mvBallInterval);
    document.getElementsByClassName("test").style.display("initial");
}
