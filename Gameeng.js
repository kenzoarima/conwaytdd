function Gameeng() {
  this.board = [];
}
Gameeng.prototype.init = function() {
  for (var i = 0; i < 64; i++) {
    this.board[i] = [];
    for (var j = 0; j < 64; j++) {
      this.board[i][j] = 0;
    }
  }
};
Gameeng.prototype.populate = function(aliveArr) {
  aliveArr.forEach(function(cell) {
    this[cell[0]][cell[1]] = 1;
  }, this.board);
};
Gameeng.prototype.cellIsAlive = function(pos_x, pos_y) {
  return this.board[pos_x] && this.board[pos_x][pos_y];
};
Gameeng.prototype.countNeighbors = function(pos_x, pos_y) {
  var neighborCount = 0;
  var top, bottom, left, right = false;

  // Checks if the cell we are looking at is at the edge of the board
  if (pos_x === 0) top = true;
  else if (pos_x === 63) bottom = true;
  
  if (pos_y === 0) left = true;
  else if (pos_y === 63) right = true;
  
  if (!top) { 
    if (!left && cellIsAlive(pos_x-1, pos_y-1)) neighborCount++;
    if (cellIsAlive(pos_x, pos_y-1)) neighborCount++;
    if (!right && cellIsAlive(pos_x+1, pos_y-1)) neighborCount++;
  }
  if (!left && cellIsAlive(pos_x-1, pos_y)) neighborCount++;
  if (!right && cellIsAlive(pos_x+1, pos_y)) neighborCount++;
  if (!bottom) {
    if (cellIsAlive(pos_x-1, pos_y+1)) neighborCount++;
    if (cellIsAlive(pos_x, pos_y+1)) neighborCount++;
    if (cellIsAlive(pos_x+1, pos_y+1)) neighborCount++;
  }

  return neighborCount;
};
module.exports = Gameeng;