(function(root) {
  var HanoiUI = root.HanoiUI = (root.HanoiUI || {} );

  UI = HanoiUI.UI = function(game) {
    this.game = game;
    //this.$rootEl = $rootEl; how do we use this to select rings?
    this.startTower = null;
    this.endTower = null;
  };

  UI.prototype.render = function() {
    $(".ring").remove();
    this.game.towers.forEach(function(tower, index) {
      tower.forEach(function(ring){
        var $ringEl = $('<div class="ring"></div>');
        $ringEl.css("width", ring * 20);

        $(".tower" + (index+1)).prepend($ringEl);
      })
    })
    this.checkWin();
  };

  UI.prototype.checkWin = function(){
    if (this.game.isWon()){
      alert("You won!");
    }
  }

  UI.prototype.bindTowers = function() {
    var game = this.game
    $(".tower").on("click", function(event) {
      var towerID = $(this).data("id");
      console.log(ui.startTower)
      if (ui.startTower){
        game.move(ui.startTower-1,towerID-1);
        ui.startTower = null;
        ui.render();
      } else {
        ui.startTower = towerID;
      }
    });
  }

})(this);


$(function () {
  g = new Hanoi.Game();
  ui = new HanoiUI.UI(g)
  ui.render();
  ui.bindTowers();
})

