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
    if (!left && this.cellIsAlive(pos_x-1, pos_y-1)) neighborCount++;
    if (this.cellIsAlive(pos_x, pos_y-1)) neighborCount++;
    if (!right && this.cellIsAlive(pos_x+1, pos_y-1)) neighborCount++;
  }
  if (!left && this.cellIsAlive(pos_x-1, pos_y)) neighborCount++;
  if (!right && this.cellIsAlive(pos_x+1, pos_y)) neighborCount++;
  if (!bottom) {
    if (this.cellIsAlive(pos_x-1, pos_y+1)) neighborCount++;
    if (this.cellIsAlive(pos_x, pos_y+1)) neighborCount++;
    if (this.cellIsAlive(pos_x+1, pos_y+1)) neighborCount++;
  }

  return neighborCount;
};
Gameeng.prototype.cellSetLife = function(neighborCount) {
  if (neighborCount === 2 || neighborCount === 3) {
    return true;
  } else {
    return false;
  }
};
Gameeng.prototype.update = function() {
  var result_board = [];
  for (var i = 0; i < 64; i++) {
    result_board[i] = [];
    for (var j = 0; j < 64; j++) {
      result_board[i][j] = this.cellSetLife( this.countNeighbors(i, j) ) ? 1:0;
    }
  }
  this.board = result_board;
};
module.exports = Gameeng;