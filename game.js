;(function() {
  var Game = function(canvasId) {
    var canvas = document.getElementById(canvasId);
    //draws to the canvas
    var screen = canvas.getContext('2d');
    //stores the width and height of the canvas
    var gameSize = { x: canvas.width, y: canvas.height };

    this.bodies = [new Player(this, gameSize)]

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
      for (var i = 0; i < this.bodies.length; i++) {
        this.bodies[i].update());
      };
    },

    draw: function(screen, gameSize) {
      screen.clearRect(0, 0, gameSize.x, gameSize.y)
      for (var i = 0; i < this.bodies.length; i++) {
        drawRect(screen, this.bodies[i]);
      }
    }

  };

  var Player = function(game, gameSize) {
    this.game = game;
    this.size = { x: 15, y:15 };
    this.center = { x: gameSize.x / 2, y: gameSize.y - this.size.x };
    this.keyboarder = new Keyboarder();
  };

  Player.prototype = {
    update: function() {
      if (this.keyboarder.isDown(this.keyboarder.KEYS.LEFT))
        this.center.x -= 2;
    } else if (this.keyboarder.isDown(this.keyboarder.KEYS.LEFT))
        this.center.x += 2;
    }
  };

  //function that draws the bullets and the invaders
  var drawRect = function(screen, body) {
    screen.fillRect(body.center.x - body.size.x / 2,
                    body.center.y - body.size.y / 2,
                    body.size.x, body.size.y);
  };

  //module to handle keyboard input
  var keyboarder = function() {
    var keyState = {};

    window.onkeydown = function(e) {
      keyState[e.keyCode] = true;
    };

    window.onkeyup = function(e) {
      keyState[e.keyCode] = false;
    };
  };

  this.isDown = function(keyCode) {
    return keyState[keyCode] === true;
  };

  this.KEYS = { LEFT: 37, RIGHT: 39, SPACE: 32 }

  window.onload = function() {
    new Game("screen");
  };
})();
