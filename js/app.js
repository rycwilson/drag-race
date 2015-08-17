$(function() {

  var game = new Game();
  game.attachListeners();

});

function Game () {
  this.tree = new ChristmasTree();
  this.track = new RaceTrack();
  this.racer = new Racer();
  this.$raceTime = null;
  this.$startTime = null;
  this.message("Start your engine!", "white");
}

Game.prototype.message = function (mesg, color) {
  var $mesgBoard = $('#mesg-board');
  var $mesg = $('#mesg');
  $mesgBoard.css('background-color', color);
  $mesg.text(mesg);
};

Game.prototype.reset = function () {
  delete this.tree;
  delete this.track;
  delete this.racer;
  this.tree = new ChristmasTree();
  this.track = new RaceTrack();
  this.racer = new Racer();
  this.startTime = null;
  this.raceTime = null;
  $('#timer-board').css('visibility', 'hidden');
  this.message("Start your engine!", "white");
};

Game.prototype.attachListeners = function() {
  var _this = this;
  $(document).keydown(function (event) {
    if (event.keyCode === 39 && _this.racer.engine === "on") {
      _this.racer.advance();
      console.log('rear: ', _this.racer.locationRear());
      console.log('front: ', _this.racer.locationFront());
      // enter the stage area and start the countdown
      if (_this.racer.locationRear() === _this.track.stage()) {
        _this.message("Get ready!", "#F5F519");
        _this.tree.startCountdown(_this);
      }
      // don't cross the start line before the green light
      else if (_this.racer.locationFront() > _this.track.start() &&
          _this.tree.state === "stage") {
        _this.message("Disqualified!", "red");
        _this.tree.disqualify(_this);
      }
      else if (_this.racer.locationFront() === _this.track.finish() + 1) {
        _this.raceTime = $.now() - _this.startTime;
        _this.message("Finish!", "white");
        $('#timer-board').css('visibility', 'visible');
        $('#timer').text(_this.raceTime * Math.pow(10, -3) + "s");
        _this.tree.finish();
        window.setTimeout(function () {_this.reset();}, 3000);
      }
    }
    else if (event.keyCode === 39) {
      _this.message("Type 's' to start engine!", "red");
    }
    else if (event.keyCode === 83) {
      _this.racer.engine = "on";
      _this.message("Move into position!", "white");
    }
  });
};

function RaceTrack () {
  this.$stage = document.getElementById("stage");
  this.$stage.style.left = "60px";
  this.$start = document.getElementById("start");
  this.$start.style.left = "145px";
  this.$finish = document.getElementById("finish");
  this.$finish.style.left = "720px";
}

RaceTrack.prototype.stage = function () {
  return parseInt(this.$stage.style.left, 10);
};

RaceTrack.prototype.start = function () {
  return parseInt(this.$start.style.left, 10);
};

RaceTrack.prototype.finish = function () {
  return parseInt(this.$finish.style.left, 10);
};

function Racer () {
  this.$racer = document.getElementById("racer");
  this.$racer.style.left = "0px";
  this.engine = "off";
}

Racer.prototype.advance = function () {
  this.$racer.style.left = this.locationRear() + 10 + "px";
};

Racer.prototype.locationRear = function () {
  return parseInt(this.$racer.style.left, 10);
};

Racer.prototype.locationFront = function () {
  return parseInt(this.$racer.style.left, 10) + this.$racer.offsetWidth;
};

function ChristmasTree () {
  this.$tree = document.getElementById('xmas_tree');
  this.state = "prestage";

  // timers for the lights
  this.preStageTimerOn = "";
  this.preStageTimerOff = "";
  this.stageTimerOn = "";
  this.stageTimerOff = "";
  this.start0TimerOn = "";
  this.start0TimerOff = "";
  this.start1TimerOn = "";
  this.start1TimerOff = "";
  this.start2TimerOn = "";
  this.start2TimerOff = "";
  this.goTimerOn = "";
  this.goTimerOff = "";
  this.disqTimerOn = "";
  this.disqTimerOff = "";
  // wait a few seconds before resetting the game
  this.disqTimer = "";

  this.$preStageLights = document.querySelectorAll('div[class^="prestage"]');
  this.preStageLightsOn();
  this.$stageLights = document.querySelectorAll('div[class^="stage"]');
  this.stageLightsOff();
  this.$startLights0 = document.querySelectorAll('div[class^="start_lights0"');
  this.startLights0off();
  this.$startLights1 = document.querySelectorAll('div[class^="start_lights1"');
  this.startLights1off();
  this.$startLights2 = document.querySelectorAll('div[class^="start_lights2"');
  this.startLights2off();
  this.$goLights = document.querySelectorAll('div[class^="go"]');
  this.goLightsOff();
  this.$disqLights = document.querySelectorAll('div[class^="disq"]');
  this.disqLightsOff();
}

ChristmasTree.prototype.preStageLightsOff = function () {
  for (var i = 0; i < this.$preStageLights.length; i++) {
    this.$preStageLights[i].setAttribute("class", "prestage_lights" + i + "_off");
  }
};

ChristmasTree.prototype.preStageLightsOn = function () {
  for (var i = 0; i < this.$preStageLights.length; i++) {
    this.$preStageLights[i].setAttribute("class", "prestage_lights" + i + "_on");
  }
  // below doesn't work, presumably because $preStageLights
  // is not really an array
  // this.$preStageLights.forEach(function (light, index) {
  //   light.setAttribute("class", "prestage_lights" + index + "_on");
  // });
};

ChristmasTree.prototype.stageLightsOff = function () {
  for (var i = 0; i < this.$stageLights.length; i++) {
    this.$stageLights[i].setAttribute("class", "stage_lights" + i + "_off");
  }
};

ChristmasTree.prototype.stageLightsOn = function () {
  for (var i = 0; i < this.$stageLights.length; i++) {
    this.$stageLights[i].setAttribute("class", "stage_lights" + i + "_on");
  }
};

ChristmasTree.prototype.startLights0off = function () {
  for (var i = 0; i < this.$startLights0.length; i++) {
    this.$startLights0[i].setAttribute("class", "start_lights0_" + i + "_off");
  }
};

ChristmasTree.prototype.startLights0on = function () {
  for (var i = 0; i < this.$startLights0.length; i++) {
    this.$startLights0[i].setAttribute("class", "start_lights0_" + i + "_on");
  }
};

ChristmasTree.prototype.startLights1off = function () {
  for (var i = 0; i < this.$startLights1.length; i++) {
    this.$startLights1[i].setAttribute("class", "start_lights1_" + i + "_off");
  }
};

ChristmasTree.prototype.startLights1on = function () {
  for (var i = 0; i < this.$startLights1.length; i++) {
    this.$startLights1[i].setAttribute("class", "start_lights1_" + i + "_on");
  }
};

ChristmasTree.prototype.startLights2off = function () {
  for (var i = 0; i < this.$startLights2.length; i++) {
    this.$startLights2[i].setAttribute("class", "start_lights2_" + i + "_off");
  }
};

ChristmasTree.prototype.startLights2on = function () {
  for (var i = 0; i < this.$startLights2.length; i++) {
    this.$startLights2[i].setAttribute("class", "start_lights2_" + i + "_on");
  }
};

ChristmasTree.prototype.goLightsOff = function () {
  for (var i = 0; i < this.$goLights.length; i++) {
    this.$goLights[i].setAttribute("class", "go_lights" + i + "_off");
  }
};

ChristmasTree.prototype.goLightsOn = function () {
  for (var i = 0; i < this.$goLights.length; i++) {
    this.$goLights[i].setAttribute("class", "go_lights" + i + "_on");
  }
};

ChristmasTree.prototype.disqLightsOff = function () {
  for (var i = 0; i < this.$disqLights.length; i++) {
    this.$disqLights[i].setAttribute("class", "disq_lights" + i + "_off");
  }
};

ChristmasTree.prototype.disqLightsOn = function () {
  for (var i = 0; i < this.$disqLights.length; i++) {
    this.$disqLights[i].setAttribute("class", "disq_lights" + i + "_on");
  }
};

ChristmasTree.prototype.startCountdown = function (game) {
  this.state = "stage";
  var _this = this;
  // use anonymous callback function instead of passing _this.preStageLightsOn
  // to setTimeout ().  else, the calling object inside preStageLightsOn ()
  // will be the window and this ($preStageLights) will be undefined
  this.stageLightsOn();
  // schedule the prestage and stage lights to go off shortly after start
  this.preStageTimerOff = window.setTimeout(function() {_this.preStageLightsOff();}, 5000);
  this.stageTimerOff = window.setTimeout(function() {_this.stageLightsOff();}, 5000);
  this.start0TimerOn = window.setTimeout(function() {_this.startLights0on();}, 2000);
  this.start0TimerOff = window.setTimeout(function() {_this.startLights0off();}, 2500);
  this.start1TimerOn = window.setTimeout(function() {_this.startLights1on();}, 2500);
  this.start1TimerOff = window.setTimeout(function() {_this.startLights1off();}, 3000);
  this.start2TimerOn = window.setTimeout(function() {_this.startLights2on();}, 3000);
  this.start2TimerOff = window.setTimeout(function() {_this.startLights2off();}, 3500);
  this.goTimerOn = window.setTimeout(function() {
    _this.goLightsOn();
    _this.state = "race";
    game.startTime = $.now();
    game.message("GO!!!", "#65D665");
  }, 3500);
};

ChristmasTree.prototype.disqualify = function (game) {
  this.state = "disqualify";
  // clear any timers set to turn lights on
  clearTimeout(this.start0TimerOn);
  clearTimeout(this.start1TimerOn);
  clearTimeout(this.start2TimerOn);
  clearTimeout(this.goTimerOn);
  // adjust the lights
  this.disqLightsOn();
  this.preStageLightsOff();
  this.stageLightsOff();
  this.startLights0off();
  this.startLights1off();
  this.startLights2off();
  this.goLightsOff();
  this.disqTimer = window.setTimeout(function() {alert("Disqualified!");}, 2000);
  this.reset = window.setTimeout(function() {game.reset();}, 2500);
};

ChristmasTree.prototype.finish = function () {
  // flash all the lights a few times upon finish
  this.state = "finish";
  var _this = this;
  this.preStageLightsOn();
  this.stageLightsOn();
  this.startLights0on();
  this.startLights1on();
  this.startLights2on();
  this.disqLightsOn();
  this.preStageTimerOff = window.setTimeout(function() {_this.preStageLightsOff();}, 300);
  this.preStageTimerOn = window.setTimeout(function() {_this.preStageLightsOn();}, 600);
  this.preStageTimerOff = window.setTimeout(function() {_this.preStageLightsOff();}, 900);
  this.preStageTimerOn = window.setTimeout(function() {_this.preStageLightsOn();}, 1200);
  this.preStageTimerOff = window.setTimeout(function() {_this.preStageLightsOff();}, 1500);
  this.stageTimerOff = window.setTimeout(function() {_this.stageLightsOff();}, 300);
  this.stageTimerOn = window.setTimeout(function() {_this.stageLightsOn();}, 600);
  this.stageTimerOff = window.setTimeout(function() {_this.stageLightsOff();}, 900);
  this.stageTimerOn = window.setTimeout(function() {_this.stageLightsOn();}, 1200);
  this.stageTimerOff = window.setTimeout(function() {_this.stageLightsOff();}, 1500);
  this.start0TimerOff = window.setTimeout(function() {_this.startLights0off();}, 300);
  this.start0TimerOn = window.setTimeout(function() {_this.startLights0on();}, 600);
  this.start0TimerOff = window.setTimeout(function() {_this.startLights0off();}, 900);
  this.start0TimerOn = window.setTimeout(function() {_this.startLights0on();}, 1200);
  this.start0TimerOff = window.setTimeout(function() {_this.startLights0off();}, 1500);
  this.start1TimerOff = window.setTimeout(function() {_this.startLights1off();}, 300);
  this.start1TimerOn = window.setTimeout(function() {_this.startLights1on();}, 600);
  this.start1TimerOff = window.setTimeout(function() {_this.startLights1off();}, 900);
  this.start1TimerOn = window.setTimeout(function() {_this.startLights1on();}, 1200);
  this.start1TimerOff = window.setTimeout(function() {_this.startLights1off();}, 1500);
  this.start2TimerOff = window.setTimeout(function() {_this.startLights2off();}, 300);
  this.start2TimerOn = window.setTimeout(function() {_this.startLights2on();}, 600);
  this.start2TimerOff = window.setTimeout(function() {_this.startLights2off();}, 900);
  this.start2TimerOn = window.setTimeout(function() {_this.startLights2on();}, 1200);
  this.start2TimerOff = window.setTimeout(function() {_this.startLights2off();}, 1500);
  this.goTimerOff = window.setTimeout(function() {_this.goLightsOff();}, 300);
  this.goTimerOn = window.setTimeout(function() {_this.goLightsOn();}, 600);
  this.goTimerOff = window.setTimeout(function() {_this.goLightsOff();}, 900);
  this.goTimerOn = window.setTimeout(function() {_this.goLightsOn();}, 1200);
  this.goTimerOff = window.setTimeout(function() {_this.goLightsOff();}, 1500);
  this.disqTimerOff = window.setTimeout(function() {_this.disqLightsOff();}, 300);
  this.disqTimerOn = window.setTimeout(function() {_this.disqLightsOn();}, 600);
  this.disqTimerOff = window.setTimeout(function() {_this.disqLightsOff();}, 900);
  this.disqTimerOn = window.setTimeout(function() {_this.disqLightsOn();}, 1200);
  this.disqTimerOff = window.setTimeout(function() {_this.disqLightsOff();}, 1500);
};

