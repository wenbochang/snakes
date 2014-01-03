$(function() {
  $(".tile").on("click", function(event) {
    var colorHash = { "o":"red", "x":"blue" }
    var mark = colorHash[game.player];
    var id = $(this).attr('id') - 1;
    if (game.move(COORDS_ARRAY[id])) {
      $(this).css({"background":mark});
    }

    var winner = game.winner();
    if (winner) {
      window.alert(colorHash[winner] + " wins!");
      $(".tile").unbind("click");
    }
  });
})

(function (root) {
  var TTTUI = root.TTTUI = function (game, $rootEl) {
    this.game = game;
    this.$rootEl = $rootEl;
  }
})(this)


$(function () {
  var game = new TTT.Game();
  var COORDS_ARRAY =
    [[0,0], [0,1], [0,2], [1,0], [1,1], [1,2], [2,0], [2,1], [2,2]];
  var ui = new TTTUI(game, $('.wrapper'))
})

