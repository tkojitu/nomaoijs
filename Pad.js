function Pad(x, y, width, height, noteNumber) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.noteNumber = noteNumber;
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