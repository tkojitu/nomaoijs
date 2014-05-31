function Input(viewport, config, circuitFactory, padFactory, gbend) {
  this.viewportWidth = viewport.width;
  this.viewportHeight = viewport.height;
  this.leftWhites = [];
  this.leftBlacks = [];
  this.rightBlacks = [];
  this.rightWhites = [];
  this.addEventListeners();
  this.newPads(config, circuitFactory, padFactory, gbend);
}

Input.prototype.addEventListeners = function() {
  var that = this;
  window.addEventListener("touchstart",
                          function(e) {
                            that.onTouchStart(e);
                          },
                          false);
  window.addEventListener("touchend",
                          function(e) {
                            that.onTouchEnd(e);
                          },
                          false);
}

Input.prototype.newPads = function(config, circuitFactory, padFactory, gbend) {
  var resource = {
    config: config,
    circuitFactory: circuitFactory,
    padFactory: padFactory,
    gbend: gbend,
    configKeys: null
  };
  this.newPadsLeftWhites(resource);
  this.newPadsLeftBlacks(resource);
  this.newPadsRightBlacks(resource);
  this.newPadsRightWhites(resource);
};

Input.prototype.newPadsLeftWhites = function(resource) {
  resource.configKeys = resource.config.getKeys()[0];
  var x = 0;
  var y = 0;
  this.newPadsImpl(resource, x, y, this.leftWhites);
};

Input.prototype.newPadsLeftBlacks = function(resource) {
  resource.configKeys = resource.config.getKeys()[1];
  var x = this.getPadWidth();
  var y = this.getPadHeight(0) / 2;
  this.newPadsImpl(resource, x, y, this.leftBlacks);
};

Input.prototype.newPadsRightBlacks = function(resource) {
  resource.configKeys = resource.config.getKeys()[2];
  var x = this.getPadWidth() * 3;
  var y = this.getPadHeight() / 2;
  this.newPadsImpl(resource, x, y, this.rightBlacks);
};

Input.prototype.newPadsRightWhites = function(resource) {
  resource.configKeys = resource.config.getKeys()[3];
  var x = this.getPadWidth() * 4;
  var y = 0;
  this.newPadsImpl(resource,x, y, this.rightWhites);
};

Input.prototype.newPadsImpl = function(resource, x, y, thisKeys) {
  var width = this.getPadWidth();
  var height = this.getPadHeight();
  for (var i = 0; i < resource.configKeys.length; ++i) {
    var circuit = resource.circuitFactory(resource.configKeys[i]);
    thisKeys[i] = resource.padFactory(x, y, width, height, resource.configKeys[i]);
    thisKeys[i].circuit = circuit;
    resource.gbend.addListener(circuit);
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
    if (!found) {
      continue;
    }
    found.play(event.changedTouches[i].identifier);
  }
  event.preventDefault();
};

Input.prototype.findTouchedPadAll = function(touch) {
  var found = this.findTouchedPad(touch, this.leftWhites);
  if (found) {
    return found;
  }
  found = this.findTouchedPad(touch, this.leftBlacks);
  if (found) {
    return found;
  }
  found = this.findTouchedPad(touch, this.rightWhites);
  if (found) {
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
    if (!found) {
      continue;
    }
    found.stop();
  }
  event.preventDefault();
};

Input.prototype.findPlayingPadAll = function(touch) {
  var found = this.findPlayingPad(touch, this.leftWhites);
  if (found) {
    return found;
  }
  found = this.findPlayingPad(touch, this.leftBlacks);
  if (found) {
    return found;
  }
  found = this.findPlayingPad(touch, this.rightBlacks);
  if (found) {
    return found;
  }
  found = this.findPlayingPad(touch, this.rightWhites);
  if (found) {
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
