import Circuit from "./Circuit.js";
import Config from "./Config.js";
import Container from "./Container.js";
import Input from "./Input.js";
import Pad from "./Pad.js";

function onLoad() {
  var container = new Container();
  container.define(
  	"viewport",
    function(c) {
      return document.getElementById("viewport");
    });
  container.define(
  	"config",
    function(c) {
      return new Config();
    });
  container.define(
  	"context",
    function(c) {
      return new AudioContext();
    });
  container.define(
    "gain",
    function(c) {
      var gain = c.getInstance("context").createGain();
      gain.connect(c.getInstance("context").destination);
      return gain;
    });
  container.define(
  	"input",
    function(c) {
      return new Input(
      	c.getInstance("viewport"),
        c.getInstance("config"),
        c.getInstance("circuitFactory"),
        c.getInstance("padFactory"),
        c.getInstance("gbend"));
    });
  container.define(
  	"circuitFactory",
    function(c) {
      return function(noteNumber) {
        return new Circuit(
        	c.getInstance("config"),
          c.getInstance("context"),
          c.getInstance("gain"),
          noteNumber);
        };
    });
  container.define(
  	"padFactory",
    function(c) {
      return function(x, y, width, height, noteNumber) {
        return new Pad(x, y, width, height, noteNumber);
      };
    });
  container.define(
  	"gbend",
    function(c) {
      return new Gbend();
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

