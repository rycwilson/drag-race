// Think of the game as a series of state changes, or a state machine
// e.g. pre-staged, staged, false start, etc
// Rules for moving between individual states?
// The loop function is the central place for making these decisions
//
// If you can't tell what the program does just by looking at functions,
// probably an indication that it's not structured well
//
// What does bind() do?  It's an object-oriented trick.  Tells the function it's
// attached to to use the this argument as its object
// call() and apply() do something similar
//
// Example:
// var student = {
// name: "ryan"
// };
// var f = function () {
//   console.log(this.first);
// };
// f(); => undefined
// f.call(student); => ryan
// var g = f.bind(student);
// g.first => ryan
//
// Remember: functions are objects.  See Function.prototype.bind
//



(function() {
  var ChristmasTree = function(game) {
    // this class manages the xmas tree
    // we need to keep a reference to the game
    // to communicate with it about where the lights are
    this.game = game;
    // get a reference to the pre stage lights html element
    this.$preStageLights = document.getElementById('pre-stage');

    this.$stageLights = document.getElementById('stage');

    this.$falseStartLights = document.getElementById('false-start-lights');

    this.currentStartingLights = 0;
    // reset the christmas tree every time it's initialized
    this.reset();
  };

  ChristmasTree.prototype.turnOn = function($which) {
    $which.className += " on";
  },

  ChristmasTree.prototype.reset = function() {
    // append the css on class to the pre stage lights
    // so that they show up as yellow
    this.turnOn(this.$preStageLights);
  };

  ChristmasTree.prototype.stage = function() {
    this.turnOn(this.$stageLights);
    this.lightSwitchTimer = setInterval(this.cycle.bind(this), 500);
  };

  ChristmasTree.prototype.cycle = function() {
    this.turnOn(document.querySelectorAll('.start.lights')[this.currentStartingLights]);

    if (this.currentStartingLights === 3) {
      this.stopCycle();
      this.game.start();
    }
    this.currentStartingLights++;
  };

  ChristmasTree.prototype.falseStart = function() {
    this.turnOn(this.$falseStartLights);
    this.stopCycle();
  };

  ChristmasTree.prototype.stopCycle = function() {
    clearInterval(this.lightSwitchTimer);
  };

  var Dragster          = function() {
    // grab the car element
    this.$el = document.getElementById('dragster');
    // set the starting position of the dragster
    this.$el.style.left = "0px";
    // this keeps track of whether it's running
    this.isRunning = false;
  };

  Dragster.prototype.start = function() {
    this.isRunning = true;
  };

  Dragster.prototype.advance = function() {
    // if the engine is running
    if (this.isRunning) {
      // this should move the car across the screen 1px at a time
      this.$el.style.left = parseInt(this.$el.style.left, 10) + 10 + "px";
    }
  };

  Dragster.prototype.isStaged = function() {
    return parseInt(this.$el.style.left,10) >= this.$el.offsetWidth + 10;
  };

  Dragster.prototype.crossedStage = function() {
    return parseInt(this.$el.style.left,10) > this.$el.offsetWidth + 20;
  };

  Dragster.prototype.crossedFinishLine = function() {
    return parseInt(this.$el.style.left,10) > document.getElementById('finish').offsetLeft;
  };

  var Game              = function() {
    // this class manages game state
    // initialize a christmas tree
    this.tree = new ChristmasTree(this);
    // initialize the player dragster
    this.dragster = new Dragster();

    setInterval(this.loop.bind(this), 1);

    this.attachListeners();
  };

  Game.prototype.loop = function() {
    // check the game states and react accordingly
    // this is basically a state machine
    // 1. pre-staged
    // 2. staged
    if (this.dragster.isStaged() && !this.staged) {
      this.stage();
    }

    //  a. dragster false start
    if (this.staged && !this.started && this.dragster.crossedStage() && !this.falseStarted) {
      this.falseStart();
    }
    // 3. started
    //  a. dragster crossed finish line
    if (this.started && !this.gameOver && this.dragster.crossedFinishLine()) {
      this.endGame();
    }
    // 4. finished
  };

  Game.prototype.stage = function() {
    this.staged  = true;
    this.tree.stage();
  };

  Game.prototype.falseStart = function() {
    this.falseStarted = true;
    this.tree.falseStart();
  };

  Game.prototype.start = function() {
    this.started = true;
  };

  Game.prototype.endGame = function() {
    this.gameOver = true;
    document.getElementById('racetrack').className += " game-over";
  };

  Game.prototype.attachListeners = function() {
    // listen for user to press keys
    window.addEventListener('keyup', function(event) {
      if (event.keyCode === 39) {
        // if the user presses the right arrow key
        // advance the dragster
        this.dragster.advance();
      } else if (event.keyCode === 13) {
        // if the user presses the enter key
        // start the dragster
        this.dragster.start();
      }
    }.bind(this));
  };

  new Game();
})();