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
      'x': 10,
      'y': 0
    },
    {
      'x': 20,
      'y': 0
    },
    {
      'x': 30,
      'y': 0
    },
    {
      'x': 40,
      'y': 0
    }
  ];
  
  createCanvas();
  createSnake(snake);

  function createCanvas() {
    create(0, 0, width, height, "white", "black");
  }

  function createSnake(snakeInput) {
    snakeInput.forEach(function(element) {
      create(element.x, element.y, snakeSize, snakeSize, "orange", "black");
    });
  }

  function create(x, y, w, h, bgColor, borderColor) {
    context.fillStyle = bgColor;
    context.fillRect(x, y, w, h);

    context.strokeStyle = borderColor;
    context.strokeRect(x, y, w, h);
  }
});