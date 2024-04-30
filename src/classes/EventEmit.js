export default class EventEmitter {
  static globalPool = {};

  constructor() {
    this.callbackPool = {};
  }

  on(name, callback, isGlobal = false) {
    let pool = this.callbackPool;
    if (!pool[name] && !isGlobal) {
      pool[name] = [];
      pool[name].push(callback);
    }

    if (isGlobal && !EventEmitter.globalPool[name]) {
      EventEmitter.globalPool[name] = [];
      EventEmitter.globalPool[name].push(callback);
    }
  }

  emit(name, ...args) {
    const pool = this.callbackPool;
    if (!pool[name] && !EventEmitter.globalPool[name]) {
      console.warn(`can't find callback called ${name}`);
      return;
    }
    pool[name] &&
      pool[name].forEach((callback) => {
        callback.call(this, ...args);
      });

    EventEmitter.globalPool[name] &&
      EventEmitter.globalPool[name].forEach((callback) => {
        callback.call(this, ...args);
      });
  }
}
