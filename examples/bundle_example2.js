/*
Questions
1 - var keyword with constructors?
-> Actually we're declaring multiple variables and separating by comma
-> matter of preference

2 - Why not attach listeners to Dragster?
-> Game is a global object responsible for state of game
-> Dragster responds to user actions in the game
-> Events bubble up, eventually to the Window object
-> for this game, we care about key presses anywhere

3 - Make sense to call reset() in ChristmasTree constructor?
-> Yes, just thinking ahead.

4 - var self = this (See AirBnB style guide!!)
-> inner function doesn't know value of this from outer function
-> re: below, the callback function doesn't know that this references
the game object, not the window
example: (see snippet in Dev Tools)
-> necessary for fucntions bound to Window object, i.e. event listeners
-> or, anonymous functions (?)

5 - var g = new Game?
-> get rid of g - it's irrelevant
-> YAGNI - You ain't gonna need it
*/

(function() {

  var ChristmasTree = function() {
    // this class manages the xmas tree
    // get a reference to the pre stage lights html element
    this.$preStageLights = document.getElementById('pre-stage');
    // reset the christmas tree every time it's initialized
    this.reset();
  },
  RaceTrack         = function() {
    // this class manages the race track
  },
  Dragster          = function() {
    // grab the car element
    this.$el = document.getElementById('dragster');
    // set the starting position of the dragster
    this.$el.style.left = "0px";
  },
  Game              = function() {
    // this class manages game state
    // initialize a christmas tree
    this.tree = new ChristmasTree();
    // initialize the race track
    this.track = new RaceTrack();
    // initialize the player dragster
    this.dragster = new Dragster();

    this.attachListeners();
  };

  ChristmasTree.prototype.reset = function() {
    // append the css on class to the pre stage lights
    // so that they show up as yellow
    this.$preStageLights.className += " on";
  };

  Game.prototype.attachListeners = function() {
    var self = this;
    // listen for user input, specifically
    // for the user pressing the right arrow key
    window.addEventListener('keyup', function(event) {
      if (event.keyCode === 39) {
        self.dragster.advance();
      }
    });
  };

  Dragster.prototype.advance = function() {
    // this should move the car across the screen 1px at a time
    this.$el.style.left = parseInt(this.$el.style.left, 10) + 1 + "px";
  };

  var g = new Game();
})();