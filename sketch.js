let shared;
let textures;

let player;
let playerSpriteSheet;
let playerAnim;

// These are the four numbers that define the transform, i hat and j hat
const i_x = 1;
const i_y = 0.5;
const j_x = -1;
const j_y = 0.5;

// Sprite tile size
const w = 72;
const h = 72;



function preload() {
  partyConnect(
    "wss://demoserver.p5party.org",
    "app-name"
	);
  shared = partyLoadShared("shared", { x: 100, y: 100 });
  //blocks
  textures = loadImage('./assets/tinyBlocks.png')
  //player
  player = new Sprite(200, 200, 32, 32)
  player.spriteSheet = './assets/playerWalk1.png'
  player.anis.frameDelay = 8
  player.anis.scale.x = 50;
  player.anis.scale.y = 50;

  player.addAnis({
		walkW: { row: 0, frames: 4 },
		walkA: { row: 1, frames: 4 },
		walkS: { row: 3, frames: 4, frameDelay: 0 },
		walkD: { row: 2, frames: 4 },
		idle: { row: 4}
	});
  player.changeAni('idle')


}

function getSpriteCoordinates(index, spriteWidth, spriteHeight, sheetWidth, sheetHeight) {
  const spritesPerRow = sheetWidth / spriteWidth;

  const row = Math.floor(index / spritesPerRow);
  const col = index % spritesPerRow;

  const x = col * spriteWidth;
  const y = row * spriteHeight;

  return { x, y };
}

function setup() {
  createCanvas(400, 400, 'pixelated');
  // TODO create fullscreen button

  world.gravity.y = 0
  allSprites.pixelPerfect = true;
  player.rotationLock = true;

  player.layer = 10;
  player.debug = true;
 
  spriteCoords = getSpriteCoordinates(0, 72, 72, 720, 720)
  tile = textures.get(spriteCoords.x, spriteCoords.y, w, h)
  tileSprite = new Group()
  tileSprite.img = tile;
  tileSprite.collider = 'none'
  tileSprite.layer = 1
  tileSprite.debug = false
  allSprites.autoCull = false

  // camera.zoom = 4



  // tile.copy(textures, spriteCoords.x, spriteCoords.y, w, h, 0, 0, w, h)
  for(let i = -20; i < 40; i++){
    for(let j = 0; j < 40; j++){
      let tsc = to_screen_coordinate({x: i, y: j});
      // image(tile, tsc.x, tsc.y)
      asdf = new tileSprite.Sprite()

      asdf.x = tsc.x
      asdf.y = tsc.y
    }
  }
  // grass = new Group();
  // grass.collider = 'none';
  // grass.img = tile;
  // grass.tile = 'g';

  const mapGrid = [
    'ggggggggggggggggggggggggggggggggggggggggggggggggggggg',
    'ggggggggggggggggggggggggggggggggggggggggggggggggggggg',
    'ggggggggggggggggggggggggggggggggggggggggggggggggggggg',
    'ggggggggggggggggggggggggggggggggggggggggggggggggggggg',
    'ggggggggggggggggggggggggggggggggggggggggggggggggggggg'
  ]
  // new Tiles(mapGrid, 0, 0, 72, 72)

  let floor = new Sprite(250, 200, 300, 40);
  // rotate(radians(30));

}

// function mousePressed() {
//   shared.x = mouseX;
//   shared.y = mouseY;
// }


function drawTile(index) {
  spriteCoords = getSpriteCoordinates(index, 72, 72, 720, 720)
  tile = createImage(w, h);
  console.log(typeof(tile.copy(textures, spriteCoords.x, spriteCoords.y, w, h, 0, 0, w, h)))
  return tile.copy(textures, spriteCoords.x, spriteCoords.y, w, h, 0, 0, w, h)
  
}
// Define the grid
let grid = [];
for (let i = 0; i < 40; i++) {
  grid[i] = [];
  for (let j = 0; j < 40; j++) {
    if (i % 2 === 0) {grid[i][j] = 0;}
     // Replace with the tile type
    if (i % 2 !== 0) {grid[i][j] = 1}
  }
}


function draw() {
  clear();

  background(135);
  translate(0, 0);

  // ellipse(shared.x, shared.y, 100, 100);

  //TODO add ocean 
  for(let i = 0; i < grid.length; i++){
    for(let j = 0; j < grid[i].length; j++){
      let tsc = to_screen_coordinate({x: i, y: j});
      // image(tile, tsc.x, tsc.y)
    }
  }
  // new Sprite(player.x, player.y, 10)



  let playerCoords = to_screen_coordinate({x: player.x, y: player.y})
  rect(playerCoords.x, playerCoords.y, w, h);
  // new Sprite(player.x, player.y, 10)
  console.log(`${playerCoords.x} ${playerCoords.y}`)

  camera.x = player.x
  camera.y = player.y

  // Handle player movement
  const playerSpeed = 1
  if (kb.pressing('right')) { 
    player.x += playerSpeed;
    //maybe update player x with tsc here
    player.changeAni('walkD') }
  if (kb.pressing('left')) { 
    player.x -= playerSpeed;
    player.changeAni('walkA') }
  if (kb.pressing('up')) { 
    player.y -= playerSpeed;
    player.changeAni('walkW') }
  if (kb.pressing('down')) { 
    player.y += playerSpeed;
    player.changeAni('walkS') }

  if (kb.released('right')) {
    player.changeAni('idle')
  }
  if (kb.released('left')) {
    player.changeAni('idle')
  }
  if (kb.released('up')) {
    player.changeAni('idle')
  }
  if (kb.released('down')) {
    player.changeAni('idle')
  }
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

function mousePressed() {
  console.log(mouse.y, mouse.y)
}