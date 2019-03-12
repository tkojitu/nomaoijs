export default class {
	constructor() {
		this.listeners = [];
		var that = this;
		window.addEventListener("devicemotion", function(e) {that.onDeviceMotion(e);}, false);
	}

	addListener(listener) {
		this.listeners.push(listener);
	}

	removeListener(listener) {
		for (var i = 0; i < this.listeners.length; ++i) {
			if (this.listeners[i] === listener) {
				this.listeners.splice(i, 1);
				return listener;
			}
		}
		return null;
	}

	onDeviceMotion(event) {
		event.preventDefault();
		var acc = event.accelerationIncludingGravity;
		var velocity = Math.sqrt(acc.x * acc.x + acc.y * acc.y + acc.z * acc.z);
		this.notifyVelocity(velocity);
	}

	notifyVelocity(velocity) {
		for (var i = 0; i < this.listeners.length; ++i) {
			this.listeners[i].onVelocityChanged(velocity);
		}
	}
}
