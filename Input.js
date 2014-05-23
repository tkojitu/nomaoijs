function Input(config, viewport, context) {
  this.config = config;
  this.context = context;
  this.viewportWidth = viewport.width;
  this.viewportHeight = viewport.height;
  this.leftWhites = [];
  this.leftBlacks = [];
  this.rightBlacks = [];
  this.rightWhites = [];
  this.newPads();
}

Input.prototype.newPads = function() {
  this.newPadsLeftWhites();
  this.newPadsLeftBlacks();
  this.newPadsRightBlacks();
  this.newPadsRightWhites();
};

Input.prototype.newPadsLeftWhites = function() {
  var keys = this.config.getKeys()[0];
  var x = 0;
  var y = 0;
  var width = this.getPadWidth();
  var height = this.getPadHeight();
  for (var i = 0; i < keys.length; ++i) {
    this.leftWhites[i] = new Pad(x, y, width, height, keys[i]);
    y += height;
  }
};

Input.prototype.newPadsLeftBlacks = function() {
  var keys = this.config.getKeys()[1];
  var x = this.getPadWidth();
  var y = this.getPadHeight(0) / 2;
  var width = this.getPadWidth();
  var height = this.getPadHeight();
  for (var i = 0; i < keys.length; ++i) {
    this.leftBlacks[i] = new Pad(x, y, width, height, keys[i]);
    y += height;
  }
};

Input.prototype.newPadsRightBlacks = function() {
  var keys = this.config.getKeys()[2];
  var x = this.getPadWidth() * 3;
  var y = this.getPadHeight() / 2;
  var width = this.getPadWidth();
  var height = this.getPadHeight();
  for (var i = 0; i < keys.length; ++i) {
    this.rightBlacks[i] = new Pad(x, y, width, height, keys[i]);
    y += height;
  }
};

Input.prototype.newPadsRightWhites = function() {
  var keys = this.config.getKeys()[3];
  var x = this.getPadWidth() * 4;
  var y = 0;
  var width = this.getPadWidth();
  var height = this.getPadHeight();
  for (var i = 0; i < keys.length; ++i) {
    this.rightWhites[i] = new Pad(x, y, width, height, keys[i]);
    y += height;
  }
};

Input.prototype.getPadWidth = function() {
  return this.viewportWidth / 5;
};

Input.prototype.getPadHeight = function() {
  return this.viewportHeight / 10;
};

Input.prototype.draw = function(context) {
  this.drawPadsLeftWhites(context);
  this.drawPadsLeftBlacks(context);
  this.drawPadsRightBlacks(context);
  this.drawPadsRightWhites(context);
};

Input.prototype.drawPadsLeftWhites = function(context) {
  this.drawPads(context,this.leftWhites);
};

Input.prototype.drawPadsLeftBlacks = function(context) {
  this.drawPads(context, this.leftBlacks);
};

Input.prototype.drawPadsRightBlacks = function(context) {
  this.drawPads(context, this.rightBlacks);
};

Input.prototype.drawPadsRightWhites = function(context) {
  this.drawPads(context, this.rightWhites);
};

Input.prototype.drawPads = function(context, pads) {
  for (var i = 0; i < pads.length; ++i) {
    pads[i].draw(context);
  }
};

Input.prototype.onTouchStart = function(event) {
  for (var i = 0; i < event.changedTouches.length; ++i) {
    var found = this.findTouchedPadAll(event.changedTouches[i]);
    if (found === null) {
      continue;
    }
    if (found.circuit !== null) {
      continue;
    }
    found.circuit = new Circuit(this.config, this.context);
    found.circuit.play(found.noteNumber);
    found.identifier = event.changedTouches[i].identifier;
  }
  event.preventDefault();
};

Input.prototype.findTouchedPadAll = function(touch) {
  var found = this.findTouchedPad(touch, this.leftWhites);
  if (found !== null) {
    return found;
  }
  found = this.findTouchedPad(touch, this.leftBlacks);
  if (found !== null) {
    return found;
  }
  found = this.findTouchedPad(touch, this.rightWhites);
  if (found !== null) {
    return found;
  }
  found = this.findTouchedPad(touch, this.rightBlacks);
  return found;
};

Input.prototype.findTouchedPad = function(touch, pads) {
  for (var i = 0; i < pads.length; ++i) {
    if (pads[i].touched(touch.pageX, touch.pageY)) {
      return pads[i];
    }
  }
  return null;
};

Input.prototype.onTouchEnd = function(event) {
  for (var i = 0; i < event.changedTouches.length; ++i) {
    var found = this.findPlayingPadAll(event.changedTouches[i]);
    if (found === null) {
      continue;
    }
    found.circuit.stop();
    found.circuit = null;
    found.identifier = null;
  }
  event.preventDefault();
};

Input.prototype.findPlayingPadAll = function(touch) {
  var found = this.findPlayingPad(touch, this.leftWhites);
  if (found !== null) {
    return found;
  }
  found = this.findPlayingPad(touch, this.leftBlacks);
  if (found !== null) {
    return found;
  }
  found = this.findPlayingPad(touch, this.rightBlacks);
  if (found !== null) {
    return found;
  }
  found = this.findPlayingPad(touch, this.rightWhites);
  if (found !== null) {
    return found;
  }
  return null;
};

Input.prototype.findPlayingPad = function(touch, pads) {
  for (var i = 0; i < pads.length; ++i) {
    if (pads[i].identifier == touch.identifier) {
      return pads[i];
    }
  }
  return null;
};

