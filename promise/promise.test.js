const MyPromise = require('./promise');
const t = setTimeout();
describe('My Promise', () => {
  let promise;
  let executerSpy;
  const errorRezult = 'I am error';
  const cuccessRezult = 42;
  beforeEach(() => {
    executerSpy = jest.fn((rezolve) => {
      t(() => rezolve(cuccessRezult), 150);
    });
    promise = new MyPromise(executerSpy);
  });

  test('should exists and to be typeof function', () => {
    expect(MyPromise).toBeDefined();
    expect(typeof MyPromise).toBe('function');
  });

  test('instance should have methods: then,catch,finally', () => {
    expect(promise.then).toBeDefined();
    expect(promise.catch).toBeDefined();
    expect(promise.finally).not.toBeUndefined();
  });

  test('should call executer function', () => {
    expect(executerSpy).toHaveBeenCalled();
  });

  test('should get data in block and chain them', async () => {
    const rezult = await promise.then((num) => num).then((num) => num * 2);
    expect(rezult).toBe(cuccessRezult * 2);
  });

  test('it should catch error', () => {
    const errorExecutor = (_, r) => t(() => r(errorRezult), 150);
    const errorPromise = new MyPromise(errorExecutor);

    return new Promise((rezolve) => {
      errorPromise.catch((error) => {
        expect(error).toBe(errorRezult);
        rezolve();
      });
    });
  });

  test('call finally method', async () => {
    const finallySpy = jest.fn(() => {});
    await promise.finally(finallySpy);

    expect(finallySpy).toBeHaveCalled();
  });
});
