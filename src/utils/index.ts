/**
 * 支持过期的localstorage
 */
var obj = {
  off: '',
};
Object.defineProperty(obj, 'off', {
  enumerable: true,
  set(v) {
    console.log('localStorage改变了');
  },
});
/**
 * 自定义超时的localstorage
 */
export function initLocalStorage() {
  localStorage.setItem = function (key, value, time = 1000) {
    const expiresTime = Date.now() + time * 1000;
    const payload = {
      __data: value,
      __expiresTime: expiresTime,
    };
    obj.off = 'key';
    Storage.prototype.setItem.call(localStorage, key, JSON.stringify(payload));
  };
  localStorage.getItem = function (key) {
    const value = Storage.prototype.getItem.call(localStorage, key);
    if (typeof value === 'string') {
      const jsonVal = JSON.parse(value);
      if (jsonVal.__expiresTime) {
        if (jsonVal.__expiresTime >= Date.now()) {
          return JSON.stringify(jsonVal.__data);
        } else {
          return null;
        }
      }
    }
    return value;
  };
}

export function add(a: number, b: number): number {
  return a + b;
}
