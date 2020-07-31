let font;
function preload() {
  font = loadFont('res/Flavors-Regular.ttf');  
}

var startMillis;
var endMillis;

var timeString;
var startHours;
var startMinutes;
var startSeconds;

var seconds;

function init() {
  seconds = startSeconds + (startMinutes*60) + (startHours*60*60);
  
  startMillis = millis();
  endMillis = startMillis + seconds * 1000;
  loop();
}

function setup() {
  startHours = 1;
  startMinutes = 15;
  startSeconds = 35;
  init();
  
  createCanvas(windowWidth, windowHeight, WEBGL);
  textFont(font);
  textSize(width / 5);
  textAlign(CENTER, CENTER);
  
}
function draw() {
  background(0);
  let time = millis();
  let remainingSeconds = Math.round((endMillis - time)/1000);
  if(remainingSeconds <0){
    remainingSeconds = 0
    noLoop();
  }
    
  var date = new Date(0);
  date.setSeconds(remainingSeconds); // specify value for SECONDS here
  timeString = date.toISOString().substr(11, 8);
    
  text(timeString, 0, 0);
 
}

function mousePressed() {
  let fs = fullscreen();
  fullscreen(!fs);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  textSize(width / 5);
}

function keyPressed() {
  if (keyCode === 84) { //Letter t
    var inputTimeText = prompt("Enter timer in HH:MM:SS format", timeString);
    var splitInput = inputTimeText.split(":");
    startHours = parseInt(splitInput[0]);
    startMinutes = parseInt(splitInput[1]);
    startSeconds = parseInt(splitInput[2]);
    
    init();
  }
}
