let dy;
const c = 299792;
let t = 0; //Svarer til X
const r = 1000; //Svarer til Y
const rs = 25;


function setup() {
  dy = -c*(1-rs/r)*sqrt(rs/r)
  punktSlider = createSlider(5, 100, 5, 1);
  punktSlider.position(75, windowHeight-punktSlider.height-5);
  skridtSlider = createSlider(0.1, 10, 0.1, 0.05)
  skridtSlider.position(punktSlider.x+320, punktSlider.y);
  createCanvas(windowWidth, windowHeight );
  return dy;
}

function draw() {
  let h = skridtSlider.value()
  background(220);
  text("dy: " + dy + " km/s", 5, 10);
  text("Punkt Slider: " , punktSlider.x-70, punktSlider.y+14)
  text("Antal punkter: " + punktSlider.value(), punktSlider.x+140, punktSlider.y+14)
  text("Skridtlængde: " , skridtSlider.x-75, punktSlider.y+14)
}

function antalPunkter() {
 let punkter = []
 for (let i = 0; i < w; i++) {
  punkter[i] = [];
 }
}