(function(root) {
  var SnakeGame = root.SnakeGame = ( root.SnakeGame || {} );

  var Snake = SnakeGame.Snake = function(headPos) {
    this.dir = 'N';
    this.segments = [headPos];
  }

  Snake.dirHash = { "W":[0,-1], "E":[0,1],
                    "S":[1,0],  "N":[-1,0] };

  Snake.prototype.move = function(){
    for(var i = 0; i < this.segments.length-1; i++) {
      this.segments[i][0] = this.segments[i+1][0];
      this.segments[i][1] = this.segments[i+1][1];
    }
    this.head()[0] += Snake.dirHash[this.dir][0];
    this.head()[1] += Snake.dirHash[this.dir][1];
  }

  Snake.prototype.turn = function(newDir) {
    this.dir = newDir;
  }

  Snake.prototype.head = function(){
    return this.segments[this.segments.length-1];
  }

  Snake.prototype.addSegment = function(){
    this.segments.unshift([10000,1000])
  }

})(this);
