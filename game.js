;(function() {
  var Game = function(canvasId) {
    var canvas = document.getElementById(canvasId);
    //draws to the canvas
    var screen = canvas.getContext('2d');
    //stores the width and height of the canvas
    var gameSize = { x: canvas.width, y: canvas.height };


    var self = this;
    //function the runs all the main game logic
    var tick = function() {
      self.update();
      self.draw(screen, gameSize);
      requestAnimationFrame(tick);
    };

    tick();
  };

  Game.prototype = {
    update: function() {

    },

    draw: function(screen, gameSize) {
      screen.fillRect(30, 30, 40, 40);
    }

  };

  var Player = function(game, gameSize) {
    this.game = game;
    this.size = { x: 15, y:15 };
    this.center = { x: gameSize.x / 2, y: gameSize.y - this.size.x };
  };

  

  window.onload = function() {
    new Game("screen");
  };
})();
