let font;
function preload() {
  font = loadFont('Flavors-Regular.ttf');  
}

var startMillis;
var endMillis;

var timeString;
var startHours;
var startMinutes;
var startSeconds;

var seconds;

var theme;

let textSizeScaler = 3.5;

function init() {
  seconds = startSeconds + (startMinutes*60) + (startHours*60*60);
  
  startMillis = millis();
  endMillis = startMillis + seconds * 1000;
  loop();
}

function setup() {
  theme = 0;
  startHours = 1;
  startMinutes = 15;
  startSeconds = 35;
  init();
  
  createCanvas(windowWidth, windowHeight, WEBGL);
  textFont(font);
  textSize(width / textSizeScaler);
  textAlign(CENTER, CENTER);
  
}
function draw() {
  background(theme*255);
  let time = millis();
  let remainingSeconds = Math.round((endMillis - time)/1000);
  if(remainingSeconds <0){
    remainingSeconds = 0
    noLoop();
  }
    
  var date = new Date(0);
  date.setSeconds(remainingSeconds); // specify value for SECONDS here
  timeString = date.toISOString().substr(11, 8);
   
  fill((!theme)*255);
  text(timeString, 0, -1*windowHeight*0.05);
 
}

function mousePressed() {
  let fs = fullscreen();
  fullscreen(!fs);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  textSize(width / textSizeScaler);
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
  
  if (keyCode === 70) { //Letter f
    theme ^= 1;
  }
}
