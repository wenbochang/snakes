(function(root) {
  var SnakeGame = root.SnakeGame = ( root.SnakeGame || {} );

  var View = SnakeGame.View = function($el) {
    this.$el = $el;
  }

  View.SPEED = 200;

  View.prototype.start = function(){
    this.board = new SnakeGame.Board();
    this.handleKeyEvent();
    this.TIMER = setInterval(this.step.bind(this), View.SPEED);
  }

  View.prototype.step = function(){
    this.enableReset = true;
    this.board.snake.move();
    this.board.checkMove();
    this.board.addApple();
    if (this.board.hitWall || this.board.hitSegment){
      alert("Uh oh!\nPress 'r' to restart.");
      clearInterval(this.TIMER);
    } else {
     this.render();
    }
  }

  View.prototype.render = function(){
    $('.cell').remove();
    this.board.changeGrid().forEach( function(row) {
      row.forEach(function(char){
        var cell = $('<div class="cell"></div>');
        if (char === "S") {
          cell.addClass("snake");
        } else if (char === "A") {
          cell.addClass("apple");
        }
        $('.board').append(cell);
      })
    });
  }

  View.prototype.handleKeyEvent = function(event) {
    var view = this;
    var snake = this.board.snake;
    key('w', function(){
      snake.turn('N');
    });
    key('s', function(){
      snake.turn('S');
    });
    key('a', function(){
      snake.turn('W');
    });
    key('d', function(){
      snake.turn('E');
    });
    key('r', function(){
      if (view.enableReset) {
        view.resetGame();
      }
    });
  };
  
  View.prototype.resetGame = function() {
    clearInterval(this.TIMER);
    this.enableReset = false;
    this.board.snake = null;
    this.board = new SnakeGame.Board();
    this.TIMER = setInterval(this.step.bind(this), View.SPEED);
    this.handleKeyEvent();
  };

})(this);

$(function(){
  v = new SnakeGame.View($('.board'))
  v.start();
})
