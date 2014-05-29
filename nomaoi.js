(function() {
  function onLoad() {
    var container = {
      services: [],
      instances: [],

      define: function(name, fn) {
        this.services[name] = fn;
      },

      getInstance: function(name) {
        if (this.instances[name]) {
          return this.instances[name];
        }
        var fn = this.services[name];
        this.instances[name] = fn(this);
        return this.instances[name];
      }
    };
    container.define("viewport",
                     function(c) {
                       return document.getElementById("viewport");
                     });
    container.define("config",
                     function(c) {
                       return new Config();
                     });
    container.define("context",
                     function(c) {
                       return new webkitAudioContext();
                     });
    container.define("gain",
                     function(c) {
                       var gain = c.getInstance("context").createGain();
                       gain.connect(c.getInstance("context").destination);
                       return gain;
                     });
    container.define("input",
                     function(c) {
                       return new Input(c.getInstance("viewport"),
                                        c.getInstance("config"),
                                        c.getInstance("circuitFactory"),
                                        c.getInstance("padFactory"));
                     });
    container.define("circuitFactory",
                     function(c) {
                       return function(noteNumber) {
                         return new Circuit(c.getInstance("config"),
                                            c.getInstance("context"),
                                            c.getInstance("gain"),
                                            noteNumber);
                       };
                     });
    container.define("padFactory",
                     function(c) {
                       return function(x, y, width, height, noteNumber) {
                         return new Pad(x, y, width, height, noteNumber);
                       };
                     });
    resizeViewport(container.getInstance("viewport"));
    var input = container.getInstance("input");
    input.draw(container.getInstance("viewport").getContext("2d"));
  }

  function resizeViewport(viewport) {
    viewport.width = window.innerWidth - 20;
    viewport.height = window.innerHeight - 20;
  }

  window.addEventListener("load", onLoad);
})();
