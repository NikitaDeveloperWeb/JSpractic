function noop() {}

class MyPromise {
  constructor(executor) {
    this.queue = [];
    this.errorHandler = noop;
    this.finallyHandler = noop;
    try {
      executor.call(null, this.onRezolve.bind(this), this.onReject.bind(this));
    } catch (error) {
      this.errorHandler(error);
    } finally {
      this.finallyHandler();
    }
  }

  onRezolve(data) {
    this.queue.forEach((callback) => {
      data = callback(data);
    });

    this.finallyHandler();
  }
  onReject(error) {
    this.errorHandler(error);
    this.finallyHandler();
  }

  then(fn) {
    this.queue.push(fn);
    return this;
  }
  catch(fn) {
    this.errorHandler = fn;
    return this;
  }
  finally(fn) {
    this.finallyHandler = fn;
    return this;
  }
}

// const promise = new Promise((rez, rej) => {
//   setTimeout(() => {
//     rez('NgRx');
//   }, 150);
// });
// //обычный промис
// promise
//   .then((course) => {
//     console.log(course.toUpperCase());
//   })
//   .catch((err) => console.log(err))
//   .finally(() => {
//     console.log('finaly');
//   });

const promise = new MyPromise((rez, rej) => {
  setTimeout(() => {
    rez('NgRx');
  }, 150);
});
//обычный промис
promise
  .then((course) => {
    console.log(course.toUpperCase());
  })
  .catch((err) => console.log(err))
  .finally(() => {
    console.log('finaly');
  });

module.exports = MyPromise;
