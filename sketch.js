let shared;
let textures;

let player;

// These are the four numbers that define the transform, i hat and j hat
const i_x = 1;
const i_y = 0.5;
const j_x = -1;
const j_y = 0.5;

// Sprite size
const w = 256;
const h = 256;



function preload() {
  partyConnect(
    "wss://demoserver.p5party.org",
    "app-name"
	);
  shared = partyLoadShared("shared", { x: 100, y: 100 });

  textures = loadImage('./assets/tile_022.png')
}

function setup() {
  createCanvas(1920, 1080);
  // TODO create fullscreen button

  // textures.resize(w, h)
  world.gravity.y = 30

  player = createSprite(width / 2, height / 2, 50, 50)
  // player.rotationLock = true;
}

// function mousePressed() {
//   shared.x = mouseX;
//   shared.y = mouseY;
// }


function draw() {
  clear();

  background(135);
  translate(width / 2, height / 4);

  // ellipse(shared.x, shared.y, 100, 100);

  for(let i = 0; i < 10; i++){
    for(let j = 0; j < 10; j++){
      let tsc = to_screen_coordinate({x: i, y: j});
      image(textures, tsc.x, tsc.y)
    }
  }
  
  rect(player.x, player.y, player.width, player.height);


  camera.x = player.x
  if (kb.pressing('d')) { player.x += 3; console.log("d")}
  if (kb.pressing('a')) { player.x -= 3; console.log("a")}
}


function to_screen_coordinate(tile) {
  // Without accounting for sprite size
  // return {
  //   x: tile.x * i_x + tile.y * j_x,
  //   y: tile.x * i_y + tile.y * j_y,
  // }

  // Accounting for sprite size
  return {
    x: tile.x * i_x * 0.5 * w + tile.y * j_x * 0.5 * w,
    y: tile.x * i_y * 0.5 * h + tile.y * j_y * 0.5 * h,
  }
}