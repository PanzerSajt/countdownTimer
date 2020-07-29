let inconsolata;
function preload() {
  inconsolata = loadFont('https://raw.githubusercontent.com/googlefonts/Inconsolata/master/fonts/otf/Inconsolata-Black.otf');
  

let startMillis;
let endMillis;
}
function setup() {
  let startHours = 1;
  let startMinutes = 15;
  let startSeconds = 30;
  let seconds = startSeconds + (startMinutes*60) + (startHours*60*60);
  
  createCanvas(windowWidth, windowHeight, WEBGL);
  textFont(inconsolata);
  textSize(width / 5);
  textAlign(CENTER, CENTER);
  startMillis = millis();
  endMillis = startMillis + seconds * 1000;
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
  var timeString = date.toISOString().substr(11, 8);
    
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
