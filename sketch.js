let shared;
let textures;

function preload() {
  textures = loadImage('./assets/tinyBlocks.png')
	partyConnect(
    "wss://demoserver.p5party.org",
    "app-name"
	);
  shared = partyLoadShared("shared", { x: 100, y: 100 });
}

function setup() {
  createCanvas(400, 400);
  noStroke();
  console.log(width)
  test = createImage(18, 18)
  test.copy(textures, 0, 0, 18, 18, 0, 0, 18, 18)
}

function mousePressed() {
  shared.x = mouseX;
  shared.y = mouseY;
}

function draw() {
  background("#ffcccc");
  fill("#000066");
  
  ellipse(shared.x, shared.y, 100, 100);
  image(test, 0, 0, 18 * 4, 18 * 4) 
}