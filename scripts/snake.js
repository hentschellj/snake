jQuery(document).ready(function() {
  const snakeCanvas = $('canvas.snake-game')[0],
        context     = snakeCanvas.getContext('2d'),
        width       = snakeCanvas.width,
        height      = snakeCanvas.height,
        cellSize    = 10,
        gameSpeed   = 50,
        snake       = [
          { 'x': 0, 'y': 0 },
          { 'x': 1, 'y': 0 },
          { 'x': 2, 'y': 0 },
          { 'x': 3, 'y': 0 },
          { 'x': 4, 'y': 0 },
        ];
  let direction     = 'right',
      score         = 0,
      foodX,
      foodY,
      gameLoop;

  start();

  function start() {
    createNewFood();
    gameLoop = setInterval(reDraw, gameSpeed);
  }

  function stop() {
    clearInterval(gameLoop)
  }

  function reDraw() {
    createCanvas();
    createSnake(snake);
    drawFood();
    drawScore();

    const collisionStatus = checkCollision(snake, foodX, foodY);
    if (collisionStatus == 'food') {
      score++;
      createNewFood();
      snake.unshift(updateDirection(snake, direction));
    } else if (collisionStatus == 'wall') {
      stop();
    }
  }

  function createCanvas() {
    create(0, 0, width, height, "white", "black");
  }

  function createSnake(snakeInput) {
    updateSnake(snakeInput);
    snakeInput.forEach(function(element) {
      create(element.x*10, element.y*10, cellSize, cellSize, "orange", "black");
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

  function createNewFood() {
    foodX = parseInt(Math.random()*width/cellSize);
    foodY = parseInt(Math.random()*height/cellSize);
  }

  function drawFood() {
    create(foodX*cellSize, foodY*cellSize, cellSize, cellSize, "green", "black");
  }

  function checkCollision(snakeArrayInput, foodXInput, foodYInput,) {
    let collision = 'nothing';
    snakeArrayInput.every(function(element) {
      if (element.x == foodXInput && element.y == foodYInput) {
        collision = 'food';
        return false;
      } else if (element.x == -1 || element.y == -1 || element.x == width/cellSize || element.y == height/cellSize) {
        collision = 'wall';
        return false;
      } else {
        return true;
      }
    })
    return collision;
  }

  function drawScore() {
    context.fillStyle = 'grey';
    context.fillText('Score: ' + score, 5, height-5);
  }

  $(document).on('keydown', function(e) {
    if (e.which == '37' && direction != 'right') {
      direction = 'left';
    } else if (e.which == '38' && direction != 'down') {
      direction = 'up';
    } else if (e.which == '39' && direction != 'left') {
      direction = 'right';
    } else if (e.which == '40' && direction != 'up') {
      direction = 'down';
    }
  })
});