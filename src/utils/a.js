class Logger {
  constructor() {}
  printName(name = 'there') {
    console.log(this.print());
  }
  set print(text) {
    console.log(text);
  }
  get print() {
    return 'get print';
  }
}
 
function selfish (target) {
  const cache = new WeakMap();
  const handler = {
    set (target, key) {
      const value = Reflect.get(target, key);
      // console.log(`get ${key}`,target, value);
      if (typeof value !== 'function') {
        return value;
      }
      if (!cache.has(value)) {
        cache.set(value, value.bind(target));
      }
      return cache.get(value);
    }
  };
  const proxy = new Proxy(target, handler);
  return proxy;
}
const logger = selfish(new Logger());
logger.printName('world');
