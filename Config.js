function Config() {
  this.keys = null;
}

Config.prototype.getType = function() {
  return "square";
};

Config.prototype.getKeys = function() {
  if (this.keys != null) {
    return this.keys;
  }
  var keys = [
    ["C4", "D4", "E4", "F4", "G4", "A4", "B4"],
    ["C#4", "D#4", "", "F#4", "G#4", "A#4"],
    ["C#5", "D#5", "", "F#5", "G#5", "A#5"],
    ["C5", "D5", "E5", "F5", "G5", "A5", "B5"]
  ];
  return this.keys = this.parse(keys);
};

Config.prototype.parse = function(keys) {
  var results = [];
  for (var i = 0; i < keys.length; ++i) {
    results[i] = [];
    for (var j = 0; j < keys[i].length; ++j) {
      results[i][j] = this.parseNote(keys[i][j]);
    }
  }
  return results;
};

Config.prototype.parseNote = function(noteName) {
  if (noteName.length == 0) {
    return -1;
  }
  var match = noteName.match(/^([ABCDEFG])(#?)(-?\d+)/);
  var offset = this.getBaseNoteOffset(match[1]);
  if (offset < 0) {
    alert("Illegal note name: " + noteName);
    return -1;
  }
  offset += (match[2] == "#") ? 1 : 0;
  var octave = this.toMidiOctaveOffset(parseInt(match[3]));
  return offset + octave;
};

Config.prototype.getBaseNoteOffset = function(str) {
  switch (str) {
  case "C":
    return 0;
  case "D":
    return 2;
  case "E":
    return 4;
  case "F":
    return 5;
  case "G":
    return 7;
  case "A":
    return 9;
  case "B":
    return 11;
  default:
    return -1;
  }
};

Config.prototype.toMidiOctaveOffset = function(octave) {
  return (octave + 1) * 12;
};
