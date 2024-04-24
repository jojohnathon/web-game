let shared;

function preload() {
	partyConnect(
    "wss://demoserver.p5party.org",
    "app-name"
	);
  shared = partyLoadShared("shared", { x: 100, y: 100 });
}

function setup() {
  createCanvas(400, 400);
  noStroke();
}

function mousePressed() {
  shared.x = mouseX;
  shared.y = mouseY;
}

function draw() {
  background("#ffcccc");
  fill("#000066");

  ellipse(shared.x, shared.y, 100, 100);
}