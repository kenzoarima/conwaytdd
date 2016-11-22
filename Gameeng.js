function Gameeng() {
  this.board = [];
}

/**
 * Initializes the game board to a 32 x 32 square board.
 * @return {Array} The copy of the game board after initializing.
 */
Gameeng.prototype.init = function() {
  var tempboard = [];
  for (var i = 0; i < 32; i++) {
    tempboard[i] = [];
    for (var j = 0; j < 32; j++) {
      tempboard[i][j] = 0;
    }
  }
  return tempboard;
};

/**
 * Populate the game board with an array of live cells.
 * @param  {Array} aliveArr A 2 dimensional array.
 * @return {Array}          The copy of the game board after adding in the live cells.
 */
Gameeng.prototype.populate = function(aliveArr) {
  var tempboard = this.board;
  aliveArr.forEach(function(cell) {
    tempboard[cell[0]][cell[1]] = 1;
  });
  return tempboard;
};

/**
 * Checks if cell is alive.
 * @param  {Number} pos_x 
 * @param  {Number} pos_y 
 * @return {Boolean}       If alive, true, else, false.
 */
Gameeng.prototype.cellIsAlive = function(pos_x, pos_y) {
  return this.board[pos_x] && this.board[pos_x][pos_y];
};

/**
 * Count the number of neighbors of the cell.
 * @param  {Number} pos_x 
 * @param  {Number} pos_y 
 * @return {Number}       Number of neighbors.
 */
Gameeng.prototype.countNeighbors = function(pos_x, pos_y) {
  var neighborCount = 0;
  var top = false, bottom = false, left = false, right = false;

  // Checks if the cell we are looking at is at the edge of the board
  if (pos_x === 0) left = true;
  else if (pos_x === 31) right = true;
  
  if (pos_y === 0) top = true;
  else if (pos_y === 31) bottom = true;
  
  if (!top) { 
    if (!left && this.cellIsAlive(pos_x-1, pos_y-1)) neighborCount++;
    if (this.cellIsAlive(pos_x, pos_y-1)) neighborCount++;
    if (!right && this.cellIsAlive(pos_x+1, pos_y-1)) neighborCount++;
  }
  if (!left && this.cellIsAlive(pos_x-1, pos_y)) neighborCount++;
  if (!right && this.cellIsAlive(pos_x+1, pos_y)) neighborCount++;
  if (!bottom) {
    if (!left && this.cellIsAlive(pos_x-1, pos_y+1)) neighborCount++;
    if (this.cellIsAlive(pos_x, pos_y+1)) neighborCount++;
    if (!right && this.cellIsAlive(pos_x+1, pos_y+1)) neighborCount++;
  }

  return neighborCount;
};

/**
 * Set the life status of the cell depending on the number of neighbors.
 * @param  {Number} neighborCount 
 * @return {Boolean}               Life status of cell.
 */
Gameeng.prototype.cellSetLife = function(neighborCount) {
  if (neighborCount === 2 || neighborCount === 3) {
    return true;
  } else {
    return false;
  }
};

/**
 * Update function for the gameboard's cells.
 * @return {Array} The copy of the gameboard.
 */
Gameeng.prototype.update = function() {
  var tempboard = this.board;
  for (var i = 0; i < 32; i++) {
    for (var j = 0; j < 32; j++) {
      tempboard[i][j] = this.cellSetLife( this.countNeighbors(i, j) ) ? 1:0;
    }
  }
  return tempboard;
};
module.exports = Gameeng;