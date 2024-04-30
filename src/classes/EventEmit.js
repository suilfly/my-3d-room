export default class EventEmitter {
  constructor() {
    this.callbackPool = {};
  }

  on(name, callback) {
    let pool = this.callbackPool;

    if (!pool[name]) {
      pool[name] = [];
    }
    pool[name].push(callback);
  }

  emit(name, args) {
    const pool = this.callbackPool;
    if (!pool[name]) {
      console.warn(`can't find callback called ${name}`);
      return;
    }
    pool[name].forEach((callback) => {
      callback.apply(this, args);
    });
  }
}
