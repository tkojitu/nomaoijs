export default class {
  constructor() {
    this.services = [];
    this.instances = [];
  }

  define(name, fn) {
    this.services[name] = fn;
  }

  getInstance(name) {
    if (this.instances[name]) {
      return this.instances[name];
    }
    var fn = this.services[name];
    this.instances[name] = fn(this);
    return this.instances[name];
  }
}

