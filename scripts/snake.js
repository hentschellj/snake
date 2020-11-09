jQuery(document).ready(function() {
  const snakeCanvas = $('canvas.snake-game')[0];
  const context     = snakeCanvas.getContext('2d');
  const width       = snakeCanvas.width;
  const height      = snakeCanvas.height;
  let direction   = 'right';
  const snakeSize   = 10;
  
  const snake = [
    { 'x': 0, 'y': 0 },
    { 'x': 1, 'y': 0 },
    { 'x': 2, 'y': 0 },
    { 'x': 3, 'y': 0 },
    { 'x': 4, 'y': 0 },
  ];

  const gameLoop = setInterval(reDraw, 50);

  function reDraw() {
    createCanvas();
    createSnake(snake);
  }

  function createCanvas() {
    create(0, 0, width, height, "white", "black");
  }

  function createSnake(snakeInput) {
    updateSnake(snakeInput);
    snakeInput.forEach(function(element) {
      create(element.x*10, element.y*10, snakeSize, snakeSize, "orange", "black");
    });
  }

  function create(x, y, w, h, bgColor, borderColor) {
    context.fillStyle = bgColor;
    context.fillRect(x, y, w, h);

    context.strokeStyle = borderColor;
    context.strokeRect(x, y, w, h);
  }

  function updateSnake(snakeInput) {
    snakeInput.shift();
    snakeInput.push(updateDirection(snakeInput, direction));
  }

  function updateDirection(snakeInput, direction) {
    let cellX = snakeInput[snakeInput.length-1].x;
    let cellY = snakeInput[snakeInput.length-1].y;

    if (direction == 'right') {
      cellX = cellX+1;
    } else if (direction == 'left') {
      cellX = cellX-1;
    } else if (direction == 'up') {
      cellY = cellY-1;
    } else if (direction == 'down') {
      cellY = cellY+1;
    }
    return { 'x': cellX, 'y': cellY };
  }

  $(document).on('keydown', function(e) {
    if (e.which == '37') {
      direction = 'left';
    } else if (e.which == '38') {
      direction = 'up';
    } else if (e.which == '39') {
      direction = 'right';
    } else if (e.which == '40') {
      direction = 'down';
    }
  })
});