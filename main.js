let isLive = false;
let points1 = [{x: 0, y: window.innerHeight + 60}]; //Person der kigger på
let points2 = [{x: 0, y: window.innerHeight + 60}]; //Astronaut Selv
let dy1;
let dy2;
let h;
const c = 299792;
let t = 0; //Svarer til X
let r = 1000; //Svarer til Y
let r2 = 1000
const rs = 25;
let y;
let y2;
let x;

function setup() {
  console.log("Made By Lucas L, Source: https://github.com/LucasFromDK/SRC-Opgave");
  dy1 = -c * (1 - rs / r) * sqrt(rs / r);
  dy2 = -c * sqrt(rs / r);
  startButton = createButton("Start").mousePressed(startAnimation);
  startButton.position(windowWidth-400, windowHeight - startButton.height);
  skridtSlider = createSlider(0.0001, 0.0005, 0.0001, 0.0001);
  skridtSlider.position(startButton.x + 130, startButton.y);
  createCanvas(windowWidth, windowHeight);
  frameRate(30);
  return dy1, dy2;
}

function draw() {
  background(220);
  UI()
  drawPoints(); //Tegner Punkterne
  astronautView();
  if (isLive == true) {
    eulerMethod();
  }
}

function UI() {
  noStroke()
  fill("blue")
  text("Observatørens Synspunkt", 5, windowHeight-80)
  fill("red")
  text("Astronautens Synspunkt", 5, windowHeight-65)
  fill("black")
  text("Hastigheds ændring: " + Math.round(dy1) + " km/s" + "\nTid gået: " + t + " s" + "\nDistance Tilbage: " + Math.round(r) + " km" + "\nAntal Punkter: " + points1.length, 5, windowHeight - 50);
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
  y2 = r2;
  x = t;
  h = skridtSlider.value();

  if (r >= Math.ceil(rs)) {
    t = t + h;
    const ychange = -c * (1 - rs / y) * sqrt(rs / y); //Person der kigger på formel
    const astro = -c * sqrt(rs / y2); //Astronaut formel
    r += ychange * h;
    r2 += astro * h;

    console.log(astro)
    //Send punkter til opbevaring i arrayet points
    points1.push({ x: t * window.innerWidth*45, y: y });
    points2.push({ x: t * window.innerWidth*45, y: y2 });
    dy1 = ychange;
    console.log("Distance: " + r + " km", "\nSpeed: " + Math.round(ychange) + " km/s", "\nTid gået: " + t + " s", "\nAntal Punkter: " + points1.length);
    return t, h, y, dy1;
  }
}

function drawPoints() {
  // Tegner Punkterne for personen der kigger på.
  for (let i = 0; i < points1.length; i++) {
    strokeWeight(2);
    let punkt = points1[i];
    point(punkt.x, map(punkt.y, 0, 1000, height+60, 0));
  }

  //Forbinder punkter med en linje for person der kigger på.
  strokeWeight(1);
  stroke("blue")
  noFill();
  beginShape();
  for (let i = 0; i < points1.length; i++) {
    let punkt = points1[i];
    vertex(punkt.x, map(punkt.y, 0, 1000, height+60, 0));
  }
  endShape();
}

function astronautView() {
    // Tegner punkterne for astronauten selv.
    for (let i = 0; i < points2.length; i++) {
      strokeWeight(2);
      let punkt = points2[i];
      point(punkt.x, map(punkt.y, 0, 1000, height+60, 0));
    }
  
    //Forbinder punkter med en linje for astronauten selv.
    strokeWeight(1);
    stroke("red")
    noFill();
    beginShape();
    for (let i = 0; i < points2.length; i++) {
      let punkt = points2[i];
      vertex(punkt.x, map(punkt.y, 0, 1000, height+60, 0));
    }
    endShape();
}