(function() {
  var gInput;

  function onLoad() {
    resizeViewport();
    var config = new Config();
    var context = new webkitAudioContext();
    var gain = context.createGain();
    gInput = new Input(config, getViewport(), context, gain);
    addEventListeners();
    gInput.draw(getViewport().getContext("2d"));
  }

  function resizeViewport() {
    var viewport = getViewport();
    viewport.width = window.innerWidth - 20;
    viewport.height = window.innerHeight - 20;
  }

  function getViewport() {
    return document.getElementById("viewport");
  }

  function addEventListeners() {
    window.addEventListener("touchstart", function(e) {gInput.onTouchStart(e);}, false);
    window.addEventListener("touchend", function(e) {gInput.onTouchEnd(e);}, false);
  }

  window.addEventListener("load", onLoad);
})();
