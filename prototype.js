// //ES5 syntax
// const Animal = function (options) {
//   this.name = options.name;
//   this.color = options.color;

//   // this.voice = function () {
//   //   console.log('Base voice from', this.name);
//   // };
// };
// //create methods from prototype
// Animal.prototype.voice = function () {
//   console.log('Base voice from', this.name);
// };
// // console.log(Animal.prototype);

// const dog = new Animal({ name: 'Stiv', color: 'White' });

// //Наследование
// const Cat = function (options) {
//   Animal.apply(this, arguments);
//   this.hastail = options.hasTail;
//   this.type = 'cat';
// };
// //передать voice в дочерний класс
// Cat.prototype = Object.create(Animal.prototype);
// Cat.prototype.constructor = Cat;
// //переопределние протатипа
// Animal.prototype.voice = function () {
//   console.log('This sound goes from', this.name);
// };
// //Переопределение метода в дочернем классе
// Cat.prototype.voice = function () {
//   Animal.prototype.voice.apply(this, arguments);
//   console.log(this.name + 'says mya');
// };

// const cat = new Cat({ name: 'Murzik', color: '#000', hasTail: true });
// console.log(cat);
// cat.voice();

//ES6 syntax
class Animal {
  constructor(options) {
    this.name = options.name;
    this.color = options.color;
  }

  voice() {
    console.log('Base voice from', this.name);
  }
}

class Cat extends Animal {
  constructor(options) {
    super(options);
    this.hasTail = options.hasTail;
    this.type = 'cat';
  }
  //переписывание наследуемых методов
  voice() {
    super.voice();
    console.log(this.name + 'says mya');
  }
}

const dog = new Animal({ name: 'Rex', color: 'White' });
const cat = new Cat({ name: 'Murzik', color: 'White', hasTail: true });

// EXAMPLES
//1
//добавляем в прототип объекта метод print
Object.prototype.print = function () {
  console.log('I am obj', this);
};

cat.print();
//2
Array.prototype.myMap = function () {
  console.log('Array to map', this);
  return this.map.apply(this, arguments);
};

// console.log([1, 2, 3, 4].myMap((x) => x ** 2));
//3
String.prototype.toTeg = function (tegName) {
  return `<${tegName}>${this}</${tegName}>`;
};

// console.log('eminim'.toTeg('eme'));

//4
Number.prototype.toBigInt = function () {
  return BigInt(this);
};

const number = 42;
console.log(number.toBigInt());
