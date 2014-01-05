Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};

(function(root) {
  var SnakeGame = root.SnakeGame = ( root.SnakeGame || {} );

  var Board = SnakeGame.Board = function(){
    this.snake = new SnakeGame.Snake([15,15]);
    this.apples = [];
    this.grid = Board.makeGrid();
    this.hitWall = false;
    this.hitSegment = false;
    for(var i=0; i<5; i++) {
      this.addApple();
    }
  };

  Board.SIZE = 20;

  Board.prototype.checkHitWall = function(){
    snakeHead = this.snake.head();
    return (snakeHead[0] > Board.SIZE - 1 || snakeHead[0] < 0
    || snakeHead[1] > Board.SIZE - 1 || snakeHead[1] < 0)
  }

  Board.prototype.checkMove = function(){
    if (this.checkHitWall()) { 
      this.hitWall = true;
      return;
    } else if (this.checkEatApple()) {
      return;
    } else {
      this.checkHitSegment();
    }
  }

  Board.prototype.checkHitSegment= function(){
    var board = this;
    var snakeHead = this.snake.segments.slice(0,1)[0];
    var snakeBody = this.snake.segments.slice(1);

    snakeBody.forEach( function(segment) {
      if (segment[0] === snakeHead[0] && segment[1] === snakeHead[1]) {
        console.log("blah");
        board.hitSegment = true;
      }
    });
  }

  Board.prototype.checkEatApple = function(){
    var eatApple = false;
    var snake = this.snake;
    var apples = this.apples
    this.apples.forEach(function(apple, index){
      var head = snake.head();
      if (head[0] === apple[0] && head[1] === apple[1]){
        apples.remove(index);
        snake.addSegment();
        eatApple = true;
      }
    })
    return eatApple;
  }

  Board.prototype.changeGrid = function(){
    var board = this;
    this.grid.forEach(function(row, rowIndex){
      row.forEach(function(cell, colIndex){
        board.grid[rowIndex][colIndex] = board.getCellType(rowIndex, colIndex);
      })
    })

    return this.grid;
  };

  Board.prototype.getCellType = function(rowIndex, colIndex){
    var cellType = "*";

    this.apples.forEach(function(apple){
      if (apple[0] === rowIndex && apple[1] === colIndex){
        cellType = "A";
      }
    })

    this.snake.segments.forEach(function(segment){
      if (segment[0] === rowIndex && segment[1] === colIndex){
        cellType = "S";
      }
    })

    return cellType;
  }

  Board.prototype.addApple = function() {
    randX = Math.floor(Math.random() * Board.SIZE);
    randY = Math.floor(Math.random() * Board.SIZE);
    this.apples.push([randX, randY]);
  }

  Board.prototype.isSnake = function(rowIndex, colIndex){
    var isSnake = false;
    this.snake.segments.forEach(function(segment){
      if (segment[0] === rowIndex && segment[1] === colIndex){
        isSnake = true;
      }
    })
    return isSnake;
  }


  Board.makeGrid = function(){
    var grid = []
    for( i = 0; i < Board.SIZE; i++){
      grid.push([])
      for(j = 0; j < Board.SIZE; j++){
        grid[i].push(null);
      }
    }
    return grid;
  }
})(this);
