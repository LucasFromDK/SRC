let isLive = false;
let points = [{x: 0, y: 1000}]; //Opbevaring af punkter
let dy;
let h;
const c = 299792;
let t = 0; //Svarer til X
let r = 1000; //Svarer til Y
const rs = 25;
let y;
let x;

function setup() {
  console.log("Made By Lucas L, Source: https://github.com/LucasFromDK/SRC-Opgave");
  dy = -c * (1 - rs / r) * sqrt(rs / r);
  startButton = createButton("Start").mousePressed(startAnimation);
  startButton.position(windowWidth-400, windowHeight - startButton.height);
  skridtSlider = createSlider(0.001, 0.005, 0.001, 0.001);
  skridtSlider.position(startButton.x + 130, startButton.y);
  createCanvas(windowWidth, windowHeight);
  frameRate(5);
  return dy;
}

function draw() {
  background(220);
  UI()
  drawPoints(); //Tegner Punkterne
  if (isLive == true) {
    eulerMethod();
  }
}

function UI() {
  rectMode(LEFT)
  fill("green")
  rect(0, 0, windowWidth, 20)
  fill("white")
  text("Hastigheds ændring: " + Math.round(dy) + " km/s  |  " + "Tid gået: " + t + " s" + "  |  " + "Antal Punkter: " + points.length, 5, 13);
  fill("black")
  text("Skridtlængde: ", skridtSlider.x - 75, startButton.y + 14);
  text("Skridtlængde er: " + skridtSlider.value(), skridtSlider.x + 140, startButton.y + 14);
}

function startAnimation() {
  if (isLive == true) {
    isLive = false;
    console.log("Stopped Animation");
    startButton.html("Start");
    return isLive;
  } else {
    isLive = true;
    console.log("Started Animation");
    startButton.html("Pause");
    return isLive;
  }
}

function eulerMethod() {
  y = r;
  x = t;
  h = skridtSlider.value();

  if (r > 0) {
    t = t + h;
    const ychange = -c * (1 - rs / y) * sqrt(rs / y);
    r += ychange * h;

    //Send punkter til opbevaring i arrayet points
    points.push({ x: t * 30000, y: y });
    dy = ychange;
    console.log("Distance: " + Math.round(r) + " km", "\nSpeed: " + Math.round(ychange) + " km/s", "\nTid gået: " + t + " s", "\nAntal Punkter: " + points.length);
    return t, h, y, dy;
  }
}

function drawPoints() {
  //Tegner Punkterne
  for (let i = 0; i < points.length; i++) {
    strokeWeight(10)
    let punkt = points[i];
    point(punkt.x, punkt.y);
  }

  //Forbinder punkter med en linje
  strokeWeight(1);
  noFill();
  beginShape();
  for (let i = 0; i < points.length; i++) {
    let punkt = points[i];
    vertex(punkt.x, punkt.y);
  }
  endShape();
}