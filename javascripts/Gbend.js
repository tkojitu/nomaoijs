function Gbend() {
  this.listeners = [];
  var that = this;
  window.addEventListener("devicemotion", function(e) {that.onDeviceMotion(e);}, false);
}

Gbend.prototype.addListener = function(listener) {
  this.listeners.push(listener);
};

Gbend.prototype.removeListener = function(listener) {
  for (var i = 0; i < this.listeners.length; ++i) {
    if (this.listeners[i] === listener) {
      this.listeners.splice(i, 1);
      return listener;
    }
  }
  return null;
};

Gbend.prototype.onDeviceMotion = function(event) {
  event.preventDefault();
  var acc = event.accelerationIncludingGravity;
  var velocity = Math.sqrt(acc.x * acc.x + acc.y * acc.y + acc.z * acc.z);
  this.notifyVelocity(velocity);
};

Gbend.prototype.notifyVelocity = function(velocity) {
  for (var i = 0; i < this.listeners.length; ++i) {
    this.listeners[i].onVelocityChanged(velocity);
  }
};
