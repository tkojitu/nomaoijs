(function() {
  var gInput;

  function onLoad() {
    resizeViewport();
    var config = new Config();
    var context = new webkitAudioContext();
    var gain = context.createGain();
    var resource = {
      viewport: getViewport(),
      config: config,
      context: context,
      gain: gain
    };
    gInput = new Input(resource);
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

  window.addEventListener("load", onLoad);
})();
