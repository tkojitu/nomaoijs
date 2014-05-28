function Pad(x, y, width, height, noteNumber) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.noteNumber = noteNumber;
  this.identifier = null;
  this.circuit = null;
}

Pad.prototype.draw = function(context) {
  if (this.noteNumber < 0) {
    return;
  }
  context.strokeRect(this.x, this.y, this.width, this.height);
};

Pad.prototype.touched = function(x, y) {
  if (this.noteNumber < 0) {
    return false;
  }
  return this.x < x && x < this.x + this.width &&
    this.y < y && y < this.y + this.height;
};

Pad.prototype.play = function(config, context, gain, identifier) {
  if (this.circuit !== null) {
    return;
  }
  this.circuit = new Circuit(config, context, gain);
  this.circuit.play(this.noteNumber);
  this.identifier = identifier;
};

Pad.prototype.stop = function() {
  this.circuit.stop();
  this.circuit = null;
  this.identifier = null;
};
