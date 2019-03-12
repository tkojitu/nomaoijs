export default class {
	constructor(x, y, width, height, noteNumber) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.noteNumber = noteNumber;
		this.circuit = null;
		this.identifier = null;
	}

	draw(context) {
		if (this.noteNumber < 0) {
			return;
		}
		context.strokeRect(this.x, this.y, this.width, this.height);
	}

	touched(x, y) {
		if (this.noteNumber < 0) {
			return false;
		}
		return this.x < x && x < this.x + this.width &&
			this.y < y && y < this.y + this.height;
	}

	play(identifier) {
		if (!this.circuit) {
			return;
		}
		this.circuit.play();
		this.identifier = identifier;
	}

	stop() {
		if (!this.circuit) {
			return;
		}
		this.circuit.stop();
		this.identifier = null;
	}
}
