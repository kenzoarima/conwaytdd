var Gameeng = require('Gameeng');

/**
 * Manual toggle to play/stop game.
 */
var playGame = false;

/**
 * Draws the game board on the DOM
 */
var gameboardDOM = document.getElementsByClassName("gameboard")[0];
gameboardDOM.innerHTML = "";
for (var i = 0; i < 32; i++) {
  for (var j = 0; j < 32; j++) {
    gameboardDOM.innerHTML += "<div id='sq_"+ i +"_"+ j +"'></div>";
  }
}

/**
 * Draws the updated gameboard on the DOM.
 */
var drawUpdated = function() {
  for (var i = 0; i < 32; i++) {
    for (var j = 0; j < 32; j++) {
      if ( game.cellIsAlive(i, j) ) {
        document.querySelector("#sq_"+ i +"_"+ j).classList.add("alive");
      } else {
        document.querySelector("#sq_"+ i +"_"+ j).classList.remove("alive");
      }
    }
  }
};

/**
 * And with everything set, let's play!
 */
var game = new Gameeng();
game.board = game.init();

game.board = game.populate([
  [0,0], [0,1], [0,2], [1,1]
]);

setInterval(function() {
  if ( playGame ) {
    drawUpdated();
    game.board = game.update();
  }
}, 1000);