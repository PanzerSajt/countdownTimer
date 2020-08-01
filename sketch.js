let font;
function preload() {
  font = loadFont('Flavors-Regular.ttf');  
}

let colors;

var startMillis;
var endMillis;

var timeString;
var startHours;
var startMinutes;
var startSeconds;

var seconds;

var theme;

var settingsVisible;

function init() {
  textSize(colors.Size*100);
  startHours = parseInt(colors.Hours);
  startMinutes = parseInt(colors.Minutes);
  startSeconds = parseInt(colors.Seconds);
  seconds = startSeconds + (startMinutes*60) + (startHours*60*60);
  
  startMillis = millis();
  endMillis = startMillis + seconds * 1000;
  loop();
}

function setup() {

  colors = new Color();
  let gui = new dat.GUI();
  var gui_col = gui.addFolder('Colors');
  gui_col.addColor(colors, 'Background');
  gui_col.addColor(colors, 'Text');
  gui_col.open();
  
  var guiTimer = gui.addFolder('Timer');
  var hoursController = guiTimer.add(colors, 'Hours', 0, 23, 1);
  hoursController.onChange(function(value) {
    init();
  });
  var minutesController = guiTimer.add(colors, 'Minutes', 0, 59, 1);
  minutesController.onChange(function(value) {
    init();
  });
  var secondsController = guiTimer.add(colors, 'Seconds', 0, 59, 1);
  secondsController.onChange(function(value) {
    init();
  });
  guiTimer.open();
  
  var guiText = gui.addFolder('Text');
  var sizeController = guiText.add(colors, 'Size', 0, 10);
  sizeController.onChange(function(value) {
    init();
  });
  /*var flashingController = guiText.add(colors, 'Flashing');
  flashingController.onChange(function(value) {
    init();
  });*/
  guiText.open();
  

  theme = 0;
  settingsVisible = 1;
  toggleSettings();
  
  
  createCanvas(windowWidth, windowHeight, WEBGL);
  textFont(font);
  init();
  
  textAlign(CENTER, CENTER);
  
}
function draw() {
  
  
  let time = millis();
  let remainingSeconds = Math.round((endMillis - time)/1000);
  if(remainingSeconds <0){
    remainingSeconds = 0
    noLoop();
  }
    
  var date = new Date(0);
  date.setSeconds(remainingSeconds); // specify value for SECONDS here
  timeString = date.toISOString().substr(11, 8);
   
  if(colors.Flashing){
    
  }else{
    background(colors.Background[0], colors.Background[1], colors.Background[2]);
    fill(colors.Text[0], colors.Text[1], colors.Text[2]);
  }
  text(timeString, 0, -1*windowHeight*0.05);
 
}

function toggleFullscreen() {
  let fs = fullscreen();
  fullscreen(!fs);
}

function toggleSettings() {
  dat.GUI.toggleHide();
  var settingsCloseElements = document.getElementsByClassName("close-bottom");
  
  for (let e of settingsCloseElements) {
    e.style.display = "none";
  }
}

function mousePressed() {

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  textSize(width / textSizeScaler);
}

function keyPressed() {
  
  if (keyCode === 32) { //space
    toggleFullscreen();
  }
  
  if (keyCode === 83) { //letter s
    toggleSettings();
  }
}

function Color() {
  this.Background = [ 0, 0, 0 ]; // RGB array
  this.Text = [ 255, 255, 255 ]; // RGB array
  this.Hours = 1;
  this.Minutes = 15;
  this.Seconds = 30;
  this.Size = 5;
  //this.Flashing = false;

	
}
