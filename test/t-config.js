function testParse() {
  var input = [
    ["C4", "D4", "E4", "F4", "G4", "A4", "B4"],
    [   "C#4", "D#4", "", "F#4", "G#4", "A#4"],
    [   "C#5", "D#5", "", "F#5", "G#5", "A#5"],
    ["C5", "D5", "E5", "F5", "G5", "A5", "B5"]
  ];
  var expected = [
    [60, 62, 64, 65, 67, 69, 71],
    [  61, 63, -1, 66, 68, 70],
    [  73, 75, -1, 78, 80, 82],
    [72, 74, 76, 77, 79, 81, 83]
  ];
  str = "";
  var config = new Config();
  var results = config.parse(input);
  for (var i = 0; i < results.length; ++i) {
    for (var j = 0; j < results[i].length; ++j) {
      if (results[i][j] != expected[i][j]) {
        str = "!!! " + input[i][j] + "!!!";
        break;
      }
    }
    if (str == "") {
      str = "OK!";
    }
  }
  document.getElementById("output").innerHTML = str;
}

window.addEventListener("load", testParse, false);
