jQuery(document).ready(function() {
  const snakeCanvas = $('canvas.snake-game')[0];
  const context     = snakeCanvas.getContext('2d');
  const width       = snakeCanvas.width;
  const height      = snakeCanvas.height;
  const snakeSize   = 10;
  
  const snake = [
    {
      'x': 0,
      'y': 0
    },
    {
      'x': 1,
      'y': 0
    },
    {
      'x': 2,
      'y': 0
    },
    {
      'x': 3,
      'y': 0
    },
    {
      'x': 4,
      'y': 0
    }
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
    let cellX = snakeInput[snakeInput.length-1].x+1;
    let cellY = snakeInput[snakeInput.length-1].y
    snakeInput.push({ 'x':cellX, 'y':cellY });
  }
});