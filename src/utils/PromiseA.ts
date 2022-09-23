export default class PromiseA {
  // 状态描述 pending resolved rejected
  status = 'pending';
  // 结果
  value: any = undefined;
  // 保存成功回调
  onResolvedCallbacks: any = [];
  // 保存失败回调
  onRejectedCallbacks: any = [];
  constructor(executor: any) {
    // 托管构造函数的this指向
    // const _this = this;
    // 修改状态为成功
    const resolve = (params: any) => {
      // 判断当前态是否为pending，只有pending时可更该状态
      if (this.status === 'pending') {
        // 保存结果
        this.value = params;
        // 设置状态
        this.status = 'resolved';
        // 遍历执行成功回调函数
        this.onResolvedCallbacks.forEach((fn: (args: string[]) => void) => {
          fn(this.value);
        });
      }
    };
    // 修改状态为失败
    const reject = (params: any) => {
      // 判断当前态是否为pending，只有pending时可更该状态
      if (this.status === 'pending') {
        this.value = params;
        this.status = 'rejected';
        this.onRejectedCallbacks.forEach((fn: (args: any) => void) => {
          fn(this.value);
        });
      }
    };
    // 让入参函数立即执行
    try {
      executor(resolve, reject);
    } catch (e) {
      reject(e);
    }
  }
  static resolve(val: any) {
    // 直接抛出一个成功状态的Promise
    return new PromiseA((resolve: any, reject: any) => {
      resolve(val);
    });
  }
  static reject(val: any) {
    if (val && typeof val.then === 'function') {
      return val;
    }
    return 1;
  }
  static all(arr: Array<PromiseA>) {
    //获取到所有的promise，都执行then，把结果放到数组，一起返回
    const resultArr: Array<any> = [];
    const result = new PromiseA((resolve: (args: any) => void, reject: (args: any) => void) => {
      arr.forEach((item) => {
        item.then((val: unknown) => {
          resultArr.push(val);
          if (resultArr.length === arr.length) {
            resolve(resultArr);
          }
        });
      });
    });
    return result;
  }
  // 只要有一个状态改变返回的Promise状态也立马改变
  static race(promises: Array<PromiseA>) {
    // return一个Promise
    return new PromiseA((resolve: (args: any) => void, reject: (args: any) => void) => {
      // 遍历执行promises
      for (let i = 0; i < promises.length; i++) {
        // then只要接收到状态改变，直接抛出
        promises[i].then(resolve, reject);
      }
    });
  }
  /**
   * then原型方法
   * 永远返回一个新的promise
   * @param onFulFilled 成功的回调函数
   * @param onRejected 失败的回调函数
   * @returns 一个新的PromiseA
   */
  then(onFulFilled: any, onRejected?: any) {
    // 判断参数不为函数时变成普通函数，成功-直接返回接收值 失败-抛出错误
    onFulFilled = typeof onFulFilled === 'function' ? onFulFilled : (value: any) => value;
    onRejected =
      typeof onRejected === 'function'
        ? onRejected
        : (err: any) => {
            throw err;
          };
    // 创建一个新的Promise实例
    const PromiseB = new PromiseA((res: any, rej: any) => {
      // 等待态判断，此时异步代码还未走完，回调入数组队列
      if (this.status === 'pending') {
        // 将成功回调push入成功队列
        this.onResolvedCallbacks.push(() => {
          // 使用queueMicrotask实现微任务
          queueMicrotask(() => {
            try {
              const val = onFulFilled(this.value);
              // 处理返回值
              resolvePromise(PromiseB, val, res, rej);
            } catch (error) {
              rej(error);
            }
          });
        });
        // 将失败回调push入失败队列
        this.onRejectedCallbacks.push(() => {
          queueMicrotask(() => {
            try {
              const val = onRejected(this.value);
              resolvePromise(PromiseB, val, res, rej);
            } catch (error) {
              rej(error);
            }
          });
        });
      }
      if (this.status === 'resolved') {
        queueMicrotask(() => {
          try {
            const val = onFulFilled(this.value);
            resolvePromise(PromiseB, val, res, rej);
          } catch (error) {
            rej(error);
          }
        });
      }
      if (this.status === 'rejected') {
        queueMicrotask(() => {
          try {
            const val = onRejected(this.value);
            resolvePromise(PromiseB, val, res, rej);
          } catch (error) {
            rej(error);
          }
        });
      }
    });
    return PromiseB;
  }
  catch(errFn: any) {
    // 直接执行then方法，onFulfilled为null，传入onRejected
    return this.then(null, errFn);
  }
  finally() {
    return '没写';
  }
}
/**
 *解析then返回值与新Promise对象
 * @param promiseB 返回新的Promise
 * @param v 上一个then返回的值
 * @param resolved
 * @param rejected
 */
function resolvePromise(
  promiseB: PromiseA,
  v: any,
  resolved: (args: any) => void,
  rejected: (args: any) => void
) {
  // 定义状态-防止多次调用
  let called: boolean;
  // 解决循环引用报错
  if (promiseB === v) {
    rejected(new TypeError('避免Promise循环引用'));
  }
  if (v !== null && (typeof v === 'object' || typeof v === 'function')) {
    try {
      const then = v.then;
      if (typeof then === 'function') {
        then.call(
          v,
          (x: any) => {
            if (called) return;
            called = true;
            resolvePromise(promiseB, x, resolved, rejected);
          },
          (r: any) => {
            if (called) return;
            called = true;
            rejected(r);
          }
        );
      } else {
        resolved(v);
      }
    } catch (error) {
      rejected(error);
    }
  } else {
    resolved(v);
  }
}
