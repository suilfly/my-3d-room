export default class EventEmitter {
  constructor(namespace) {
    this.callbackPool = {};
    this.namespace = namespace || 'normal';
  }

  on(name, callback) {
    let pool = null;
    if (!this.callbackPool[this.namespace]) {
      this.callbackPool[this.namespace] = {};
    }
    pool = this.callbackPool[this.namespace];
    if (!pool[name]) {
      pool[name] = [];
    }
    pool[name].push(callback);
  }

  emit(name, args) {
    const pool = this.callbackPool[this.namespace];
    if (!pool[name]) {
      console.warn(`can't find callback called ${name}`);
      return;
    }
    pool[name].forEach((callback) => {
      callback.apply(this, args);
    });
  }
}
