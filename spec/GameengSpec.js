describe("TDD for Conway's Game of Life", function() {
  var Gameeng = require('../Gameeng');
  var game;
  
  beforeEach(function() {
    game = new Gameeng();
    game.init();
  });

  it("initializes to a 64 x 64 square array", function() {
    expect(game.board.length).toEqual(64);
    expect(game.board[0].length).toEqual(64);
  });

  it("can take in a 2d array to initialize the living cells", function() {
    game.populate([
      [0,0], [0,1], [0,2], [1,1]
    ]);
    expect(game.board[0][1]).toEqual(1);

    it("and cell[1,1] is alive", function() {
      expect(game.cellIsAlive(1, 1)).toBeTruthy();
    });

    it("and cell[1,1] has 4 neighbors", function() {
      expect(game.countNeighbors(1, 1)).toEqual(4);
    });
  });

  xit("more tests", function() {
    game.populate([
      [0,0], [0,1], [0,2], [1,1]
    ]);
  });

});