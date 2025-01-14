const tiles = [];
const tileImages = [];

const DIM = 20;
let grid = [];
const BLANK = 0;
const UP = 1;
const RIGHT = 2;
const DOWN = 3;
const LEFT = 4;



function preload() {
  const path = "tiles/demo";
  tileImages[0] = loadImage(`${path}/blank.png`);
  tileImages[1] = loadImage(`${path}/up.png`);
  // tileImages[2] = loadImage(`${path}/right.png`);
  // tileImages[3] = loadImage(`${path}/down.png`);
  // tileImages[4] = loadImage(`${path}/left.png`);
}

function setup() {
  createCanvas(800, 800);

  tiles[0] = new Tile(tileImages[0], [0, 0, 0, 0]);
  tiles[1] = new Tile(tileImages[1], [1, 1, 0, 1]);
  tiles[2] = tiles[1].rotate(1);
  tiles[3] = tiles[1].rotate(2);
  tiles[4] = tiles[1].rotate(3);

  // Generate the adjacency rules based on edges
  for (let i = 0; i < tiles.length; i++) {
    const tile = tiles[i];
    tile.analyze(tiles);
  }

  // Create cell for each spot on the grid
  for (let i = 0; i < DIM * DIM; i++) {
    grid[i] = new Cell(tiles.length);
  }
}

function checkValid(arr, valid) {
  for (let i = arr.length - 1; i >= 0; i--) {
    // VALID: [BLANK, RIGHT]
    // arr: [BLANK, UP, RIGHT, DOWN, LEFT]
    // result in moving UP, DOWN, LEFT
    let element = arr[i];
    if (!valid.includes(element)) {
      arr.splice(i, 1);
    }
  }
}

function mousePressed() {
  redraw();
}

function draw() {

  let gridCopy = grid.slice();
  gridCopy = gridCopy.filter((a) => !a.collapsed);
  //console.log(grid);
  //console.table(gridCopy);
  if (gridCopy.length == 0) {
    return;
  }

  background(0);
  gridCopy.sort((a, b) => {
    return a.options.length - b.options.length;
  });

  let len = gridCopy[0].options.length;
  let stopIndex = 0;
  for (let i = 1; i < gridCopy.length; i++) {
    if (gridCopy[i].options.length > len) {
      stopIndex = i;
      break;
    }
  }

  if (stopIndex > 0) gridCopy.splice(stopIndex);
  
  const cell = random(gridCopy);
  cell.collapsed = true;
  const pick = random(cell.options);
  cell.options = [pick];

  // console.log(grid);
  // console.log(gridCopy);

  const w = width / DIM;
  const h = height / DIM;
  for (let j = 0; j < DIM; j++) {
    for (let i = 0; i < DIM; i++) {
      let cell = grid[j * DIM + i];
      if (cell.collapsed) {
        let index = cell.options[0];
        console.log(cell);
        image(tiles[index].img, i * w, j * h, w, h);
      } else {
        fill(0);
        stroke(255);
        rect(i * w, j * h, w, h);
      }
    }
  }

  const nextGrid = [];
  for (let j = 0; j < DIM; j++) {
    for (let i = 0; i < DIM; i++) {
      let index = j * DIM + i;
      if (grid[index].collapsed) {
        nextGrid[index] = grid[index];
      } else {
        let options = new Array(tiles.length).fill(0).map((x, i) => i);
        // Loop up
        if (j > 0) {
          let up = grid[(j - 1) * DIM + i];
          let validOptions = [];
          for (let option of up.options) {
            let valid = tiles[option].down;
            validOptions = validOptions.concat(valid);
          }
          checkValid(options, validOptions);
        }
        // Look right
        if (i < DIM - 1) {
          let right = grid[i + 1 + j * DIM];
          let validOptions = [];
          for (let option of right.options) {
            let valid = tiles[option].left;
            validOptions = validOptions.concat(valid);
          }
          checkValid(options, validOptions);
        }
        // Look down
        if (j < DIM - 1) {
          let down = grid[i + (j + 1) * DIM];
          let validOptions = [];
          for (let option of down.options) {
            let valid = tiles[option].up;
            validOptions = validOptions.concat(valid);
          }
          checkValid(options, validOptions);
        }
        // Look left
        if (i > 0) {
          let left = grid[i - 1 + j * DIM];
          let validOptions = [];
          for (let option of left.options) {
            let valid = tiles[option].right;
            validOptions = validOptions.concat(valid);
          }
          checkValid(options, validOptions);
        }
        nextGrid[index] = new Cell(options);
      }
    }
  }
  grid = nextGrid;
  //noLoop();
}
